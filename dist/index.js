"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_html_parser_1 = require("node-html-parser");
const axios = require('axios').default;
const getAptString = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(url);
        const resultsHTML = getSearchResults(response.data)['childNodes'];
        let idsToCheck = [];
        resultsHTML.forEach(result => {
            if (result.hasOwnProperty('rowAttrs') && !result['rowAttrs'].includes('data-repost-of')) {
                console.log("yes");
                let rowAttrs = result['rowAttrs'].split(" ");
                console.log(rowAttrs);
                if (rowAttrs.length < 2) {
                    //this grabs id from data-pid tag
                    let id = rowAttrs[1].substring(10, rowAttrs[1].length);
                    console.log(id);
                    idsToCheck.push(id);
                }
            }
        });
        checkForNewResults(idsToCheck);
        //if(result doesn't have 'data-repost-of' html tag && )
    }
    catch (err) {
        console.log(err);
    }
});
const getSearchResults = (string) => {
    const root = (0, node_html_parser_1.parse)(string);
    const res = root.querySelector('#search-results');
    return res;
};
//see if there are any new search results
const checkForNewResults = (idsToCheck) => {
    //first, make a set of existing result id's from db
    //const existingResults = ref(db, 'apartments');
    //then, check ea id in param string for existence in the set u just made
    //   if one is new, add to db
};
getAptString('https://losangeles.craigslist.org/search/apa?query=west+hollywood&max_price=5000&min_bedrooms=3&max_bedrooms=3&availabilityMode=0&sale_date=all+dates');
//# sourceMappingURL=index.js.map