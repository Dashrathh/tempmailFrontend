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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Instantly analyze your text. Count words, characters, sentences, check keyword density, and estimate reading time. 100% private. Free, no signup required.</p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Word & Character Counter?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The Word Counter is an advanced, real-time text analysis tool that counts words, characters, sentences, and paragraphs instantly as you type. It also calculates estimated reading time and speaking time, making it an indispensable utility for writers, students, and professionals.</p>
                            <p>Most social media platforms (like Twitter), academic essays, and SEO meta descriptions have strict character or word limits. Counting manually is impossible. This tool provides instant metrics without needing to open a heavy word processor, helping you optimize your content perfectly.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Word & Character Counter</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Click inside the large text area.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Start typing your text, or paste your existing content from your clipboard.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Watch the top metrics update in real-time as you type, tracking words, characters, and sentences.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Check the bottom panel to see the estimated reading time and speaking time.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Use the 'Clear' button to reset the board when you're finished.</p>
                        </li>
                        </ul>
                    </section>

                    <section className="mb-12 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Features</h2>
                        <ul className="grid md:grid-cols-2 gap-6">

                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">100% Free:</strong>
                                <span className="text-slate-600"> Unlimited use without any hidden fees or premium locks.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">No Signup:</strong>
                                <span className="text-slate-600"> Instantly start using the utility without registering an account.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">Works in Browser:</strong>
                                <span className="text-slate-600"> Fully client-side processing natively in your web browser.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">No Data Stored:</strong>
                                <span className="text-slate-600"> Your inputs are not saved, logged, or recorded on any server.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">Mobile Friendly:</strong>
                                <span className="text-slate-600"> Perfect responsive design for smartphones and tablets.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">Instant Results:</strong>
                                <span className="text-slate-600"> Lightning fast execution with zero loading screens.</span>
                            </div>
                        </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Examples</h2>
                        <div className="space-y-4">

                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Social Media Limits:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Check if your tweet fits inside the 280-character limit.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">SEO Optimization:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Ensure your meta description is right around 150-160 characters.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Essay Assignments:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Verify that your academic paper meets the strict 500-word minimum requirement.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, the word counter is completely free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">100% safe. The text analysis happens entirely client-side in your browser. Nothing is sent to our servers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, you can easily paste text from mobile apps.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does the character count include spaces?</h4>
                            <p className="text-slate-600 leading-relaxed">The tool shows total characters, and typically most limits (like Twitter) count spaces as characters too.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">How is reading time calculated?</h4>
                            <p className="text-slate-600 leading-relaxed">Reading time is estimated based on the average adult reading speed of about 200 words per minute.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/lorem-ipsum-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Lorem Ipsum Generator &rarr;</span>
                        </a>
                        <a href="/tools/base64-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Base64 Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/random-word-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Random Word Generator &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
