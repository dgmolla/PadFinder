import {parse} from 'node-html-parser';
import {db, ref, get, set} from './firebase';

const axios = require('axios').default;

const getAptString = async (url:string) => {
    try {
        const response = await axios.get(url) 
        const resultsHTML = getSearchResultsHTML(response.data)['childNodes'];
        
        const resultsToCheck = [];
        
        resultsHTML.forEach( result => {

            if(result.nodeType === 1 && !result['rawAttrs'].includes('data-repost-of')) {
                let rawAttrs:string[] = result['rawAttrs'].split(" ");
                let id:string = result['rawAttrs'].split(" ")[1].substring(10, rawAttrs[1].length - 1);

                let resultLink = result['childNodes'][1]['rawAttrs'].split(" ")[0].substring(6);
                resultsToCheck.push( [id, resultLink.substring(0, resultLink.length - 1) ] );
            }
        })

        const newResults = checkForNewResults(resultsToCheck);


    } catch (err) {
        console.log(err)
    }
}

const getSearchResultsHTML = (string:string) => {
    const root = parse(string);
    const res = root.querySelector('#search-results');
    
    return res;
}

//are any of the search results ones we haven't seen before?
const checkForNewResults = async (resultsToCheck) => {
    try {
        //first, make a set of seen result id's from db
        const seenIDs = await get(ref(db, 'apartments'));
        const seenIDsSet = new Set(seenIDs.val());

        //then, remove id's we've seen before
        resultsToCheck.filter( result => {
            !seenIDsSet.has(result[0]);
        })

        //remaining ids in array are new, add them to db and return them
        Promise.all(
            resultsToCheck.map(async id => {
                await set(ref(db, 'apartments/' + id), id);
                console.log(id);
            })
        )

        return resultsToCheck;

    } catch (error) {
        console.log(error);
        return [];
    }
}

getAptString('https://losangeles.craigslist.org/search/apa?query=west+hollywood&max_price=4600&min_bedrooms=3&max_bedrooms=3&availabilityMode=0&sale_date=all+dates');