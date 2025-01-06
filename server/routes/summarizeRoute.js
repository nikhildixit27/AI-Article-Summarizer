import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Hello from Hugging Face Summarizer API!");
});

router.route("/").post(async (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({
            error: "Article URL is required.",
        });
    }

    const modelApiKey = process.env.RAPID_API_KEY;
    const modelApiHost = process.env.RAPID_API_HOST;

    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
        link
    )}&lang=en&engine=2`;

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": modelApiKey,
            "x-rapidapi-host": modelApiHost,
        },
    };

    try {
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            throw new Error(
                `External API Error: ${response.statusText} (Status Code: ${response.status})`
            );
        }

        const result = await response.json();
        res.status(200).json({
            summary: result.summary,
        });
    } catch (error) {
        console.error("Error while fetching summary:", error.message);

        res.status(500).json({
            error: "Failed to fetch the article summary. Please try again later.",
        });
    }
});

export default router;
