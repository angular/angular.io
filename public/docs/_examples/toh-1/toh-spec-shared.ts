/// <reference path="../_protractor/e2e.d.ts" />
'use strict';

export type WPromise<T> = webdriver.promise.Promise<T>;

const expectedH1 = 'Tour of Heroes';
const expectedTitle = `Angular 2 ${expectedH1}`;

export class Hero {
    id: number;
    name: string;

    // Factory methods

    // Get hero from s formatted as '<id> <name>'.
    static fromString(s: string): Hero {
        return {
            id: +s.substr(0, s.indexOf(' ')),
            name: s.substr(s.indexOf(' ') + 1),
        };
    }

    // Get hero id and name from the given detail element.
    static async fromDetail(detail: protractor.ElementFinder): Promise<Hero> {
        // Get hero id from the first <div>
        let _id = await detail.all(by.css('div')).first().getText();
        // Get name from the h2
        let _name = await detail.element(by.css('h2')).getText();
        return {
            id: +_id.substr(_id.indexOf(' ') + 1),
            name: _name.substr(0, _name.indexOf(' '))
        };
    }
}

export function expectHeading(hLevel: number, expectedText: string): void {
    let hTag = `h${hLevel}`;
    let hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
};

export const nameSuffix = 'X';
export function addToHeroName(text: string): WPromise<void> {
    let input = element(by.css('input'));
    return sendKeys(input, text);
}

export function itHasProperTitleAndHeadings() {
    it(`has title '${expectedTitle}'`, () => {
        expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
        expectHeading(1, expectedH1);
    });
}
