const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors({ origin: "*" }));

// Serve static images from the public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Proxy API route to fetch PageRank
app.get("/api/rank", async (req, res) => {
    const site = req.query.url?.trim();
    if (!site) return res.status(400).json({ error: "No website provided!" });

    try {
        const response = await axios.get(
            `https://openpagerank.com/api/v1.0/getPageRank?domains[]=${site}`,
            { headers: { "API-OPR": "kw4wgkkow0skk4ccc8ko4kso4g0oggokokkswgws" } }
        );

        if (response.data && response.data.response?.length > 0) {
            return res.json(response.data);
        } else {
            return res.status(404).json({ error: "No data found for this website." });
        }
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch data", details: error.response?.data || error.message });
    }
});

// Serve index.html correctly
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
