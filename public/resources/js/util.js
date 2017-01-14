// This will be nicer once we switch to Ng2. For now, define a singleton.

var NgIoUtil = (function () {

    function NgIoUtil() { }

    NgIoUtil.isDoc = function ($location, lang) {
        var loc = $location.absUrl();
        return loc.indexOf('/docs/' + lang + '/') >= 0;
    };

    // The following util functions are adapted from _utils-fn.jade.
    // Note that basename(), etc doesn't quite follow
    // https://nodejs.org/api/path.html
    // but it suits our purpose for now.

    NgIoUtil.adjustTsExamplePathForDart = function (_path) {
        /* Convert a TS example path into a Dart example path. E.g.,
         *
         * - app/main.ts -> web/main.dart
         * - displaying-data/ts/app/app.component.2.ts -> displaying-data/dart/lib/app_component.dart
         *
         * Notice that the '.2' is dropped from the name.
         */
        if (!_path) return _path;
        var path = _path.trim();
        var folder = NgIoUtil.folderName(path);
        var ext = NgIoUtil.extname(path);
        var baseNameNoExt = NgIoUtil.basename(path, ext);
        var inWebFolder = baseNameNoExt.match(/^(main|index)(\.\d)?$/);

        // Adjust the folder path, e.g., '/ts/' -> '/dart/'
        folder = folder
            .replace(/(^|\/)ts($|\/)/, '$1dart$2')
            .replace(/(^|\/)app($|\/)/, inWebFolder ? '$1web$2' : '$1lib$2');

        // Special case not handled above: e.g., index.html -> web/index.html
        if (baseNameNoExt.match(/^(index|styles)(\.\d)?$/) && !folder.match(/web$/))
            folder = (folder ? folder + '/' : '') + 'web';

        // In file name, replace special characters with underscore
        baseNameNoExt = baseNameNoExt.replace(/[\-\.]/g, '_');

        // Adjust the file extension
        if (ext == '.ts') ext = '.dart';
        return (folder ? folder + '/' : '') + baseNameNoExt + ext;
    };

    NgIoUtil.extname = function (path) {
        var i = path.lastIndexOf('.');
        return i > 0 ? path.substr(i) : '';
    };

    NgIoUtil.basename = function (path, optExt) {
        var i = path.lastIndexOf('/');
        var name = i > 0 ? path.substr(i + 1) : path;
        if (optExt) name = name.substr(0, name.length - optExt.length);
        return name;
    };

    NgIoUtil.folderName = function (path) {
        var i = path.lastIndexOf('/');
        return i > 0 ? path.substr(0, i) : '';
    };

    NgIoUtil._exampleName = ''; // example name is unique to a page; e.g., toh-1

    NgIoUtil.setExampleName = function (name) {
        // Adjust name for known cases where chapter name is not the example name.
        var matches = name.match(/(toh-)pt(\d+)/);
        if (matches) name = matches[1] + matches[2];
        NgIoUtil._exampleName = name;
    }

    NgIoUtil.getExampleName = function ($location) {
        if (!NgIoUtil._exampleName) {
            // TODO: use $location.path() instead(?). It seems to be empty.
            var loc = $location.absUrl();
            // E.g., https://example.com/docs/dart/latest/guide/displaying-data.html
            var matches = loc.match(/.*\/([\w\-]+)(\.html)?/);
            if (matches) NgIoUtil.setExampleName(matches[1]); // cache name
        }
        return NgIoUtil._exampleName;
    };

    return NgIoUtil;
} ());
