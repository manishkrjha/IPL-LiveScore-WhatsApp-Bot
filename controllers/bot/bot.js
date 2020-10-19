const axios   = require('axios');
const cheerio = require('cheerio');

const getDataFromRemote = async () => {
    const URL = 'https://www.cricbuzz.com/cricket-match/live-scores';
    const response = await axios.get(URL);
    const data = response.data;
    return data;
}

const getScores = async () => {
    const html = await getDataFromRemote();
    const scores = [];
    const $ = cheerio.load(html);  
    $('a.cb-lv-scrs-well-live').each(function (_, element){
        const scoreContainer = $(element).children().children();
        const score = $(scoreContainer).text();
        scores.push(score);
    });
    

    if(scores.length == 0){
        return 'Oops! no matches are being played right now';
    }
    return scores[0];
}

let liveScore;

(async () => {
    var ans = await getScores();
    // console.log(`ans: ${ans}`);
    return ans;
})()
.then((val) => {
    liveScore = val;
    console.log(`LIVESCORE: ${liveScore}`);
    exports.liveScore = liveScore;
})
.catch((err) => {
    console.log(`Error :: ${err}`);
});



















