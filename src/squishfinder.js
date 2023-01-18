import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const BASE_URL = 'https://squishmallowsquad.fandom.com'
const MASTER_LIST_URL = `${BASE_URL}/wiki/Master_List`;
const MASTER_LIST = [];

async function updateMasterList() {
    const response = await fetch(MASTER_LIST_URL);
    const html = parse(await response.text());
    const container = findContainer();

    if (!container) throw new Error(`Error! Container was not found for Squishmallow Master List on ${MASTER_LIST_URL}`);
    
    const children = container.childNodes;

    // get the indexes of all the headers 'A', 'B', 'C'...
    const alphabetIndexes = [];
    for (let i = 0; i < children.length; i++) {
        if (children[i].rawTagName === 'h2') {
            alphabetIndexes.push(i);
        }
    }

    // add all squishmallows under all indexes to one massive array
    for (let i = 0; i < alphabetIndexes.length; i++) {
        const htmlIndex = alphabetIndexes[i]+2;

        if (i >= 26) continue;


        const list = children[htmlIndex];
        for(let child of list.childNodes) {
            child = child.childNodes[0];
            if (!child) continue;

            const attributes = child.rawAttrs;
            if (attributes.includes('(page does not exist)')) continue;

            const hrefIndex = attributes.indexOf('href="')+6;
            const titleIndex = attributes.indexOf('title="')+7;
            MASTER_LIST.push({
                name: attributes.substring(titleIndex, attributes.indexOf('"', titleIndex+1)),
                link: BASE_URL + attributes.substring(hrefIndex, attributes.indexOf('"', hrefIndex+1))
            });
        }
    }

    function findContainer() {
        for (let div of html.getElementsByTagName("div")) {
            if (div.classList.contains('mw-parser-output')) {
                return div;
            }
        }
        return null;
    }
}

updateMasterList();
