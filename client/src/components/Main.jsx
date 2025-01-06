import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Main() {
    const [url, setUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSummarize = async () => {
        if (!url.trim()) {
            setError("Please enter a valid article URL.");
            return;
        }

        setLoading(true);
        setError("");
        setSummary("");

        try {
            const response = await fetch("http://localhost:8000/summerizer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ link: url }),
            });

            const data = await response.json();

            if (response.ok) {
                setSummary(data.summary || "No summary available for this article.");
            } else {
                setError(data.error || "Failed to fetch summary. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while fetching the summary.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopySummary = () => {
        navigator.clipboard.writeText(summary);
        toast.success("Summary copied to clipboard!");
    };

    return (
        <section className="max-w-7xl mx-auto p-6">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="text-center mb-8">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        AI
                    </span>{" "}
                    Article{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Summarizer
                    </span>
                    .
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Summarize your article with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        AI
                    </span>
                </p>
            </div>

            <div className="w-full max-w-md mx-auto bg-gradient-to-r from-sky-100 via-white to-emerald-100 shadow-lg rounded-lg p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Enter the article URL to summarize:
                </h2>
                <div className="relative group">
                    <input
                        id="article-url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-grow bg-white text-gray-700 text-sm border border-gray-300 rounded-l-md pl-10 pr-4 py-3 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hover:shadow-md"
                        placeholder="https://example.com/article"
                        aria-label="Article URL Input"
                    />
                    <button
                        onClick={handleSummarize}
                        disabled={loading}
                        className="ml-2 bg-emerald-600 text-white text-sm rounded-md px-4 py-3 transition-all duration-200 shadow-md hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 active:bg-emerald-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Summarizing..." : "Summarize"}
                    </button>
                </div>
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>

            {summary && (
                <div className="mt-8 w-full max-w-3xl mx-auto bg-gradient-to-r from-green-100 via-white to-blue-100 p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        📝 Summary
                    </h2>
                    <p className="text-gray-800 text-lg leading-relaxed bg-white p-6 rounded-md shadow-inner border border-gray-200">
                        {summary}
                    </p>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleCopySummary}
                            className="inline-flex items-center bg-emerald-600 text-white text-sm px-5 py-2 rounded-lg shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 active:bg-emerald-800"
                        >
                            📋 Copy Summary
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Main;
