const youtubesearchapi = require("youtube-search-api");
const express = require("express");
const dotenv = require("dotenv");
const SerpApi = require("google-search-results-nodejs");
let search = new SerpApi.GoogleSearch();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
});

app.get("/api/v1", (req, res) => {
    res.send("API is running...");
});

// Youtube link receveing an array of keywords
app.get("/api/v1/youtube", async (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.status(400).json({ message: "Please provide a search query" });
    }
    const keywords = q.split("+");
    console.log(keywords);
    const results = await youtubesearchapi.GetListByKeyword(keywords);
    res.json("https://www.youtube.com/watch?v=" + results.items[0].id).status(
        200
    );
});

// Google search link receiving an array of keywords
app.get("/api/v1/google", async (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.status(400).json({ message: "Please provide a search query" });
    }
    const keywords = q.split("+").join(" ");
    search.json(
        {
            api_key: process.env.SERAPI_KEY,
            q: keywords,
            num: 5,
        },
        (data) => {
            const linksArray = [];
            data.organic_results.forEach((result) => {
                linksArray.push(result.link);
            });
            res.json(linksArray).status(200);
        }
    );    
});

// wildcard for all other routes
app.get("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Listen from port and allow access from all IPs
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
