"use client";

import { useState, useEffect } from "react";
import { Type, AlignLeft, Clock, Mic, Activity, FileText, CheckCircle2, Trash2, Copy, AlertCircle, Hash } from "lucide-react";

export default function WordCounter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    // Stats state
    const [stats, setStats] = useState({
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0, // minutes
        speakingTime: 0, // minutes
        longestWord: "",
    });

    const [keywords, setKeywords] = useState([]);

    // Update stats whenever text changes
    useEffect(() => {
        const calculateStats = () => {
            if (!text.trim()) {
                setStats({
                    words: 0,
                    charsWithSpaces: 0,
                    charsNoSpaces: 0,
                    sentences: 0,
                    paragraphs: 0,
                    readingTime: 0,
                    speakingTime: 0,
                    longestWord: "-",
                });
                setKeywords([]);
                return;
            }

            const charsWithSpaces = text.length;
            const charsNoSpaces = text.replace(/\s/g, "").length;

            // Match words (alphanumeric sequences)
            const wordsArray = text.match(/\b\w+\b/g) || [];
            const wordsCount = wordsArray.length;

            const sentences = (text.match(/[\w][^\.!\?]*[\.!\?]+/g) || []).length;
            // Paragraphs: split by 2 or more newlines or just non-empty lines
            const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

            // Reading time: avg 238 words per minute
            const readingTime = Math.ceil(wordsCount / 238);
            // Speaking time: avg 130 words per minute
            const speakingTime = Math.ceil(wordsCount / 130);

            let longestWord = "";
            const wordMap = {};

            wordsArray.forEach((w) => {
                const lowerWord = w.toLowerCase();
                if (lowerWord.length > longestWord.length) {
                    longestWord = lowerWord;
                }

                // Ignore very common stop words for keyword density
                const stopWords = ["the", "and", "a", "an", "is", "in", "it", "of", "to", "that", "i", "you", "he", "she", "we", "they", "on", "for", "with", "as"];
                if (!stopWords.includes(lowerWord) && lowerWord.length > 2) {
                    wordMap[lowerWord] = (wordMap[lowerWord] || 0) + 1;
                }
            });

            // Calculate keyword density
            const densityArray = Object.keys(wordMap).map(word => ({
                word,
                count: wordMap[word],
                density: ((wordMap[word] / wordsCount) * 100).toFixed(1)
            })).sort((a, b) => b.count - a.count).slice(0, 10);

            setStats({
                words: wordsCount,
                charsWithSpaces,
                charsNoSpaces,
                sentences: sentences === 0 && wordsCount > 0 ? 1 : sentences,
                paragraphs,
                readingTime,
                speakingTime,
                longestWord: longestWord || "-"
            });
            setKeywords(densityArray);
        };

        calculateStats();
    }, [text]);

    const handleClear = () => {
        setText("");
    };

    const copyToClipboard = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getProgressColor = (current, max) => {
        const percentage = (current / max) * 100;
        if (percentage >= 100) return "bg-red-500";
        if (percentage >= 80) return "bg-amber-500";
        return "bg-blue-500";
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-7xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Word & Character Counter
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Instantly analyze your text. Count words, characters, sentences, check keyword density, and estimate reading time. 100% private.
                    </p>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left/Top: Editor & Limits */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* Editor Area */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                                <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-slate-200 bg-slate-50">
                                    <h2 className="font-bold text-slate-700 flex items-center gap-2">
                                        <Type className="w-5 h-5 text-blue-500" /> Text Input
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleClear}
                                            className="bg-white border border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" /> Clear
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border transition-all ${copied ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                                        </button>
                                    </div>
                                </div>
                                <div className="relative w-full h-[400px]">
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Type or paste your text here..."
                                        className="w-full h-full p-6 resize-none outline-none font-sans text-base leading-relaxed bg-white text-slate-800 placeholder-slate-400 custom-scrollbar"
                                        spellCheck="true"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Social Media Bounds */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-indigo-500" /> Platform Limits
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { name: "Twitter (X)", current: stats.charsWithSpaces, max: 280 },
                                        { name: "SMS", current: stats.charsWithSpaces, max: 160 },
                                        { name: "SEO Title", current: stats.charsWithSpaces, max: 60 },
                                        { name: "SEO Desc", current: stats.charsWithSpaces, max: 160 }
                                    ].map((platform, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-semibold text-slate-600">{platform.name}</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${platform.current > platform.max ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
                                                    {platform.current}/{platform.max}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(platform.current, platform.max)}`}
                                                    style={{ width: `${Math.min((platform.current / platform.max) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Key Stats & Density */}
                        <div className="flex flex-col gap-6">

                            {/* Main Metrics */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6">
                                <h3 className="font-bold text-slate-800 mb-4 text-center uppercase tracking-wider text-sm">Key Metrics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
                                        <div className="text-3xl font-black text-blue-700">{stats.words.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-blue-500 uppercase mt-1">Words</div>
                                    </div>
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                                        <div className="text-3xl font-black text-emerald-700">{stats.charsWithSpaces.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-emerald-500 uppercase mt-1">Characters</div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">
                                        <div className="text-3xl font-black text-purple-700">{stats.sentences.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-purple-500 uppercase mt-1">Sentences</div>
                                    </div>
                                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
                                        <div className="text-3xl font-black text-amber-700">{stats.paragraphs.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-amber-500 uppercase mt-1">Paragraphs</div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium flex items-center gap-1.5"><AlignLeft className="w-4 h-4" /> Characters (No spaces)</span>
                                        <span className="font-bold text-slate-800">{stats.charsNoSpaces.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium flex items-center gap-1.5"><Clock className="w-4 h-4" /> Reading Time</span>
                                        <span className="font-bold text-slate-800">~{stats.readingTime} min</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium flex items-center gap-1.5"><Mic className="w-4 h-4" /> Speaking Time</span>
                                        <span className="font-bold text-slate-800">~{stats.speakingTime} min</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium flex items-center gap-1.5"><FileText className="w-4 h-4" /> Longest Word</span>
                                        <span className="font-bold text-slate-800 truncate max-w-[100px]" title={stats.longestWord}>{stats.longestWord}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Keyword Density */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex-grow flex flex-col">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Hash className="w-5 h-5 text-rose-500" /> Keyword Density
                                </h3>
                                {keywords.length > 0 ? (
                                    <div className="space-y-3 overflow-y-auto custom-scrollbar flex-grow max-h-[200px] lg:max-h-full">
                                        {keywords.map((kw, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">{idx + 1}</span>
                                                    <span className="font-semibold text-slate-700 truncate max-w-[120px]" title={kw.word}>{kw.word}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-400 font-mono text-xs">{kw.count}x</span>
                                                    <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md text-xs">{kw.density}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-grow flex items-center justify-center flex-col text-slate-400 text-sm py-8 lg:py-0">
                                        <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                                        <span>Type more words to see density</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why use an Online Word Counter?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Whether you are a student writing an essay, a marketer drafting a social media post, or an SEO specialist optimizing a webpage, knowing your exact text metrics is critical. An online word and character counter provides instant feedback without needing to open heavy desktop applications like Microsoft Word. Plus, you get advanced insights like keyword density, reading time, and social media constraints in real-time.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Crucial Character Limits for 2024</h3>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4 mb-8">
                        <ul className="space-y-4 list-disc pl-5 text-sm text-slate-700 font-medium">
                            <li><strong className="text-blue-600">Twitter (X):</strong> 280 characters per standard tweet.</li>
                            <li><strong className="text-rose-600">Instagram:</strong> 2,200 characters for a caption, but only the first 125 characters are visible in the feed before the "See more" button.</li>
                            <li><strong className="text-amber-600">SEO Meta Title:</strong> Ideally keep it under 60 characters so it doesn't get cut off on Google Search results.</li>
                            <li><strong className="text-amber-600">SEO Meta Description:</strong> Best practice is around 155-160 characters to maximize visibility and click-through rates.</li>
                            <li><strong className="text-green-600">SMS Text Message:</strong> 160 characters per single standard SMS segment.</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">What is Keyword Density?</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Keyword density refers to the percentage of times a specific word or phrase appears on a webpage compared to the total number of words on that page. In the context of Search Engine Optimization (SEO), maintaining an optimal keyword density (usually around 1% to 2%) helps search engines like Google understand what your content is about without triggering "keyword stuffing" penalties. Our built-in analyzer automatically filters out common stop words (like "the", "and", "is") to give you actionable organic density data.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Does this tool save my text or essays?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No, absolutely not. We value your privacy. This text analyzer runs 100% locally in your web browser. Whatever you type or paste NEVER leaves your device or gets sent to our servers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">What is the difference between word count and character count?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                A <strong>word count</strong> totals the number of individual words separated by spaces. A <strong>character count</strong> totals every single letter, number, punctuation mark, and even the spaces between them. Some platforms strictly limit character counts, while assignments usually dictate word counts.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">How is Reading Time calculated?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                We calculate Estimated Reading Time based on the average human reading speed of approximately 238 words per minute. Estimated Speaking Time (useful for presentations and podcasts) is calculated at the slower pace of 130 words per minute.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
