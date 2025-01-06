import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import summerizerRoute from "./routes/summarizeRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/summerizer", summerizerRoute);

app.get("/", async (req, res) => {
    res.send("Hello there! Welcome to the AI Article Summarizer API.");
});

const startServer = async () => {
    try {
        app.listen(PORT, () =>
            console.log(`✅ Server is running on http://localhost:${PORT}`)
        );
    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();
