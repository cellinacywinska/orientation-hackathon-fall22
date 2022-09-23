const fetch = require("node-fetch");
const youtubesearchapi = require("youtube-search-api");
const cheerio = require("cheerio");
const pretty = require("pretty");
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

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

// wildcard for all other routes
app.get("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// server listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
