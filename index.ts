import {parse} from 'node-html-parser';
import {db, ref, get} from './firebase';

const axios = require('axios').default;

const getAptString = async (url:string) => {
    try {
        const response = await axios.get(url) 
        const resultsHTML = getSearchResults(response.data)['childNodes'];
        
        let idsToCheck:string[] = [];
        
        resultsHTML.forEach( result => {

            if(result.nodeType === 1 && !result['rawAttrs'].includes('data-repost-of')) {
                let rawAttrs:string[] = result['rawAttrs'].split(" ");

                if(rawAttrs.length < 3) {
                    let id:string = rawAttrs[1].substring(10, rawAttrs[1].length - 1);

                    idsToCheck.push(id);
                }
            }
        })

        checkForNewResults(idsToCheck);

    } catch (err) {
        console.log(err)
    }
}

const getSearchResults = (string:string) => {
    const root = parse(string);
    const res = root.querySelector('#search-results');
    
    return res;
}

//see if there are any new search results
const checkForNewResults = async (idsToCheck:string[]) => {
    try {
        
        //first, make a set of existing result id's from db
        const existingResults = await get(ref(db, 'apartments'));
        const existingResultsSet = new Set(existingResults.val());

        console.log(existingResultsSet);

        //then, check ea id in param string for existence in the set u just made
        idsToCheck.filter( id => {
            !existingResultsSet.has(id);
        })

        //remaining ids in array are new, so they should be added to db
        


    } catch (error) {
        console.log(error);
    }
}

getAptString('https://losangeles.craigslist.org/search/apa?query=west+hollywood&max_price=5000&min_bedrooms=3&max_bedrooms=3&availabilityMode=0&sale_date=all+dates');