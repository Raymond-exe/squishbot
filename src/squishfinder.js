import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const BASE_URL = 'https://squishmallowsquad.fandom.com'
const MASTER_LIST_URL = `${BASE_URL}/wiki/Master_List`;
export const MASTER_LIST = [];

export async function updateMasterList() {
    const old_count = MASTER_LIST.length;
    const response = await fetch(MASTER_LIST_URL);
    const html = parse(await response.text());
    const container = findContainer(html);

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
            MASTER_LIST.push({
                name: child.getAttribute('title'),
                link: BASE_URL + child.getAttribute('href')
            });
        }
    }

    console.log(`Squishmallow Master List updated with ${MASTER_LIST.length} entries (${MASTER_LIST.length-old_count} added).`);
}

export async function getSquishmallowInfo(squish) {
    const URL = squish.link ? squish.link : squish;
    const response = await fetch(URL.startsWith(BASE_URL) ? URL : BASE_URL + URL);
    const html = parse(await response.text());
    
    const title = html.getElementById('firstHeading').rawText.trim();
    const container = findContainer(html);

    const aside = container.getElementsByTagName('aside')[0];
    const img = aside.getElementsByTagName('img')[0].getAttribute('src');
    
    const map = new Map();
    
    map.set('title', title);
    map.set('link', URL);
    map.set('img', img);


    let currentKey = 'subtext';
    for (let child of container.childNodes) {
        if (!child || !child.childNodes || !child.childNodes[0]) continue;
        if (child.childNodes[0].classList?.contains('mw-headline')) {
            currentKey = child.childNodes[0].rawText;
            continue;
        }
        const content = child.rawText.trim();
        if (currentKey && content && !content.includes('\t\t')) {
            map.set(currentKey, content);
            currentKey = '';
        }
    }

    console.log(map);
}

function findContainer(html) {
    for (let div of html.getElementsByTagName("div")) {
        if (div.classList.contains('mw-parser-output')) {
            return div;
        }
    }
    return null;
}

updateMasterList().then(async () => {
    const random = MASTER_LIST[Math.floor(Math.random() * MASTER_LIST.length)];
    await getSquishmallowInfo(random);
});
