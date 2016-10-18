'use strict';

const assert = require('assert-plus');
const cheerio = require('cheerio');
const Encoder = require('node-html-encoder').Encoder;
const fs = require('fs-extra');
const path = require('canonical-path');

module.exports = function dabFactory(ngIoProjPath) {
    const encoder = new Encoder('entity');

    // Get the functionality we need from the dgeni package by the same name.
    const dartApiBuilderDgeniProjPath = 'tools/api-builder/dart-package';
    const dab = require(path.resolve(ngIoProjPath, dartApiBuilderDgeniProjPath)).module;

    const log = dab.logFactory[1]();
    const dartPkgConfigInfo = dab.dartPkgConfigInfo[1]();
    const preprocessDartDocData = dab.preprocessDartDocData[1](log, dartPkgConfigInfo);
    const loadDartDocDataProcessor = dab.loadDartDocDataProcessor[1](log, dartPkgConfigInfo, preprocessDartDocData);
    const apiListDataFileService = dab.apiListDataFileService[1](log, dartPkgConfigInfo);
    const Array_from = dab.arrayFromIterable[1];

    // Load API data, then create and save 'api-list.json'.
    function loadApiDataAndSaveToApiListFile() {
        const docs = [];
        loadDartDocDataProcessor.$process(docs);
        log.debug('Number of Dart API entries loaded:', docs.length);
        var libMap = apiListDataFileService.createDataAndSaveToFile(docs);
        for (let name in libMap) {
            log.debug('  ', name, 'has', libMap[name].length, 'top-level entries');
        }
        return docs;
    }

    // Create and save the container's '_data.json' file.
    function _createDirData(containerName, destDirPath, entries) {
        const entryNames = Array_from(entries.keys()).sort();
        const dataMap = Object.create(null);
        entryNames.map((n) => {
            const e = entries.get(n);
            assert.object(e, `entry named ${n}`);
            dataMap[path.basename(e.path, '.html')] = e;
        });
        const dataFilePath = path.resolve(destDirPath, '_data.json');
        fs.writeFile(dataFilePath, JSON.stringify(dataMap, null, 2));
        log.info(containerName, 'wrote', Object.keys(dataMap).length, 'entries to', dataFilePath);
    }

    function _insertExampleFragments(enclosedByName, eltId, $, div) {
        const fragDir = path.join(dartPkgConfigInfo.ngIoDartApiDocPath, '../../../_fragments/_api');
        const exList = div.find('p:contains("{@example")');
        exList.each((i, elt) => {
            const text = $(elt).text();
            log.debug(`Found example: ${enclosedByName} ${eltId}`, text);
            const matches = text.match(/{@example\s+([^\s]+)(\s+region=[\'\"]?(\w+)[\'\"]?)?\s*}/);
            if (!matches) {
                log.warn(enclosedByName, eltId, 'has an invalidly formed @example tag:', text);
                return true;
            }
            const exRelPath = matches[1];
            const region = matches[3];

            const dir = path.dirname(exRelPath)
            const extn = path.extname(exRelPath);
            const baseName = path.basename(exRelPath, extn);
            const fileNameNoExt = baseName + (region ? `-${region}` : '')
            const exFragPath = path.resolve(fragDir, dir, `${fileNameNoExt}${extn}.md`);
            if (!fs.existsSync(exFragPath)) {
                log.warn('Fragment not found:', exFragPath);
                return true;
            }
            $(elt).empty();
            const md = fs.readFileSync(exFragPath, 'utf8');
            const codeElt = _extractAndWrapInCodeTags(md);
            $(elt).html(codeElt);
            log.silly('Fragment code in html:', $(elt).html());
        });
    }

    function _extractAndWrapInCodeTags(md) {
        const lines = md.split('\n');
        // Drop first and last lines that are the code markdown tripple ticks (and last \n):
        lines.shift(); lines.pop(); lines.pop();
        const code = lines.map((line) => encoder.htmlEncode(line)).join('\n');
        // TS uses format="linenums"; removing that for now. 
        return `<code-example language="dart">${code}\n</code-example>`;
    }

    function _createEntryJadeFile(e, destDirPath) {
        const htmlPagePath = path.resolve(dartPkgConfigInfo.ngDartDocPath, e.path);
        if (!fs.existsSync(htmlPagePath)) {
            log.warn('Entry', e.name, ': expected to find file but didn\'t', htmlPagePath);
            return;
        }
        const html = fs.readFileSync(htmlPagePath, 'utf8');
        log.debug('Reading (and then deleting)', html.length, 'chars from', htmlPagePath);
        const $ = cheerio.load(html);
        const div = $('div.body.container');
        $('div.sidebar-offcanvas-left').remove();
        const baseNameNoExtn = path.basename(e.path, '.html');
        _insertExampleFragments(e.enclosedByQualifiedName, baseNameNoExtn, $, div);

        const outFileNoExtn = path.join(destDirPath, baseNameNoExtn);
        const depth = path.dirname(e.path).split('/').length;
        assert(depth === 1 || depth == 2, 'depth ' + depth);
        const jadeFilePath = path.resolve(outFileNoExtn + '.jade');
        const breadcrumbs = $('header > nav ol.breadcrumbs');
        fs.writeFileSync(jadeFilePath, apiEntryJadeTemplate(depth, breadcrumbs, div));
        // In case harp cached the .html version, remove it since it will be generated.
        try {
            fs.unlinkSync(path.resolve(outFileNoExtn + '.html'));
        } catch (err) {
            if (e.enclosedBy && e.enclosedBy.type === 'class' &&
                e.enclosedBy.name.toLowerCase() === e.name.toLowerCase()) {
                // Do nothing since this is a known bug with dartdoc:
                // https://github.com/dart-lang/dartdoc/issues/1196
            } else {
                console.error(err);
                console.error(`Output path: ${destDirPath}`);
                console.error(`Entity: ${e}`);
                console.error(err.stack);
                throw err;
            }
        }
        log.debug('  ', e.enclosedByQualifiedName, 'entry', e.name, 'wrote to ', jadeFilePath);
    }

    function _createJadeFiles(containerName, destDirPath, entries) {
        let numApiPagesWritten = 0;
        for (let name of entries.keys()) {
            _createEntryJadeFile(entries.get(name), destDirPath);
            numApiPagesWritten++
        }
        log.info(containerName, 'created', numApiPagesWritten, 'Jade entry files.');
        return numApiPagesWritten;
    }

    function createApiDataAndJadeFiles(docs) {
        let numApiPagesWritten = 0;
        let map = apiListDataFileService.containerToEntryMap;
        for (let name of map.keys()) {
            if (!name) continue; // skip package-level
            let destDirPath = path.resolve(dartPkgConfigInfo.ngIoDartApiDocPath, name);
            let entries;
            if (!fs.existsSync(destDirPath)) {
                log.error(`Dartdoc API folder not found:`, destDirPath);
            } else if ((entries = map.get(name)).size > 0) {
                _createDirData(name, destDirPath, entries);
                numApiPagesWritten += _createJadeFiles(name, destDirPath, entries);
            }
        }
        return numApiPagesWritten;
    }

    const _self = {
        Array_from: Array_from,
        apiEntryJadeTemplate: apiEntryJadeTemplate,
        apiListDataFileService: apiListDataFileService,
        loadApiDataAndSaveToApiListFile: loadApiDataAndSaveToApiListFile,
        createApiDataAndJadeFiles: createApiDataAndJadeFiles,
        dartPkgConfigInfo: dartPkgConfigInfo,
        loadDartDocDataProcessor: loadDartDocDataProcessor,
        log: log,
        preprocessDartDocData: preprocessDartDocData,
    };
    Object.freeze(_self);
    return _self;
};

function _indentedEltHtml($elt, i, filterFnOpt) {
    let lines = $elt.html().split('\n');
    if (filterFnOpt) lines = lines.filter(filterFnOpt);
    const indent = '                    '.substring(0,i);
    return lines.map((line) => `${indent}| ${line}`).join('\n');
}

function apiEntryJadeTemplate(baseHrefDepth, $breadcrumbs, $mainDiv) {
    const baseHref = path.join(...Array(baseHrefDepth).fill('..'));
    // TODO/investigate: for some reason $breadcrumbs.html() is missing the <ol></ol>. We add it back in the template below.
    const breadcrumbs = _indentedEltHtml($breadcrumbs, 6, (line) => !line.match(/^\s*$/));
    const mainDivHtml = _indentedEltHtml($mainDiv, 4);
    // WARNING: since the following is Jade, indentation is significant.
    const result = `
extends ${baseHref}/../../../_layout-dart-api

include ${baseHref}/../_util-fns

block var-def
  //- FIXME: a CSS expert needs to figure out why the header CSS needs to be patched for Dart.
  //- This enables the patch:
  - var fixHeroCss = 1;

block head-extra
  // generated Dart API page template: head-extra
  //- <base> is required because all the links in dartdoc generated pages are "pseudo-absolute"
  base(href="${baseHref}")
  link(rel='stylesheet' href='https://fonts.googleapis.com/css?family=Source+Code+Pro|Roboto:500,400italic,300,400' type='text/css')
  link(rel="stylesheet" href="static-assets/prettify.css")
  link(rel="stylesheet" href="static-assets/css/bootstrap.min.css")
  link(rel="stylesheet" href="static-assets/styles.css")

block breadcrumbs
  // generated Dart API page template: breadcrumbs
  nav.dropdown
    ol.breadcrumbs.gt-separated.hidden-xs
${breadcrumbs}

block main-content
  // generated Dart API page template: main-content: start
  div.dart-api-entry-main
${mainDivHtml}
  // generated Dart API page template: main-content: end
`;
        return result;
    }
