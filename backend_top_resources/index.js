const fetch = require("node-fetch");
const youtubesearchapi = require("youtube-search-api");
const cheerio = require("cheerio");
const pretty = require("pretty");



// Youtube
const getTopYoutubeLink = async (keywords) => {
    const results = await youtubesearchapi.GetListByKeyword(keywords);
    return "https://www.youtube.com/watch?v=" + results.items[0].id;
}

// Udemy
const getTopUdemyCourse = async (keywords) => {
    cleanKeywords = keywords.join("+");
    const url = "https://www.udemy.com/courses/search/?src=ukw&q=react";
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const course = $(".udlite-heading-md")
}



const keywords = ["how", "to", "traverse", "a", "tree", "in", "c++"];
getTopYoutubeLink(keywords).then((link) => {
    console.log(link);
}); 
getTopUdemyCourse(keywords).then((link) => {
    console.log(link);
});
