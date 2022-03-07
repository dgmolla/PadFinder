import {parse} from 'node-html-parser';
import {db, ref, get, set} from './firebase';
import {sendEmail} from './smtp';

const axios = require('axios').default;

const checkForNewResults = async (url : string) => {
    try {
        //GET request
        const response = await axios.get(url) 
        const resultsHTML = getSearchResultsHTML(response.data)['childNodes'];
        
        const resultsToCheck : string[][] = [];
        
        resultsHTML.forEach( result => {

            if(result.nodeType === 1 && !result['rawAttrs'].includes('data-repost-of')) {
                let rawAttrs:string[] = result['rawAttrs'].split(" ");
                let id:string = result['rawAttrs'].split(" ")[1].substring(10, rawAttrs[1].length - 1);

                let resultLink = result['childNodes'][1]['rawAttrs'].split(" ")[0].substring(6);
                resultsToCheck.push( [id, resultLink.substring(0, resultLink.length - 1) ] );
            }
        })

        let newResultLinks = "";
        const newResults = await validateResults(resultsToCheck);

        if (!newResults || newResults.length == 0 || !newResults[0]) {
            console.log("No new search results! We'll try again in a bit")
            return;

        } else {
            newResults.map( newResult => {
                newResultLinks += "<p>" + newResult[1] + "</p><br>";
            })
            
            sendEmail(newResultLinks);
            console.log("Looks like we found some new Pads! Check your email dude")
            return;
        }

    } catch (err) {
        console.log(err)
        return
    }
}

//parse html elements from search result page
const getSearchResultsHTML = (string : string) => {
    const root = parse(string);
    const res = root.querySelector('#search-results');
    
    return res;
}

//are any of the search results ones we haven't seen before?
const validateResults = async (resultsToCheck : string[][]) => {
    try {
        //first, make a set of seen result id's from db
        const seenIDsRef = await get(ref(db, 'apartments'));
        const seenIDs = await seenIDsRef.val();

        //then, remove id's we've seen before
        let newResults = resultsToCheck.filter( result => {
            return !seenIDs.hasOwnProperty(result[0]);
        })

        //remaining ids in array are new, add them to db and return them
        Promise.all(
            newResults.map(async result => {
                await set(ref(db, 'apartments/' + result[0]), result[0]);
        })
        )

        return newResults;

    } catch (error) {
        console.log(error);
        return [];
    }
}
const url : string = 'https://losangeles.craigslist.org/search/apa?query=west+hollywood&max_price=5000&min_bedrooms=3&max_bedrooms=3&availabilityMode=0&sale_date=all+dates';

setInterval(async () => await checkForNewResults(url), 1000 * 60 * 60 * 12);
