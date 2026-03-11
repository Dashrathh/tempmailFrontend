"use client";

import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { Copy, RefreshCw, Type, List, Check } from "lucide-react";
import { nouns, verbs, adjectives, allWords } from "@/data/words";

export default function RandomWordGenerator() {
    const [wordCount, setWordCount] = useState(5);
    const [wordType, setWordType] = useState("all");
    const [generatedWords, setGeneratedWords] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateWords = useCallback(() => {
        setIsGenerating(true);
        setTimeout(() => {
            let sourceArray = [];
            switch (wordType) {
                case "noun":
                    sourceArray = nouns;
                    break;
                case "verb":
                    sourceArray = verbs;
                    break;
                case "adjective":
                    sourceArray = adjectives;
                    break;
                default:
                    sourceArray = allWords;
                    break;
            }

            const newWords = [];
            const count = Math.min(Math.max(1, wordCount), 50); // Limit 1 to 50
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * sourceArray.length);
                newWords.push(sourceArray[randomIndex]);
            }
            setGeneratedWords(newWords);
            setIsCopied(false);
            setIsGenerating(false);
        }, 300); // Artificial delay for smooth UX
    }, [wordCount, wordType]);

    // Generate initially
    useEffect(() => {
        generateWords();
    }, [generateWords]);

    const copyToClipboard = () => {
        if (!generatedWords.length) return;
        const textToCopy = generatedWords.join(", ");
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans mt-10">
            <Head>
                <title>Random Word Generator - Catchphrase, Nouns, Verbs</title>
            </Head>

            <div className="max-w-4xl mx-auto space-y-10">
                {/* Header section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-fuchsia-100 rounded-2xl mb-2">
                        <Type className="h-8 w-8 text-fuchsia-600" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Random Word Generator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Generate instant random words for brainstorming, writing prompts, Pictionary, Catchphrase, and games. Free, no signup required.</p>
                </div>

                {/* Generator Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="grid lg:grid-cols-3 gap-0">
                        {/* Left Control Panel */}
                        <div className="p-6 sm:p-8 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
                            <div className="space-y-6">
                                {/* Number of Words slider */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="wordCount" className="text-sm font-bold text-slate-700">
                                            Number of Words
                                        </label>
                                        <span className="bg-fuchsia-100 text-fuchsia-700 py-1 px-3 rounded-full text-xs font-bold">
                                            {wordCount}
                                        </span>
                                    </div>
                                    <input
                                        id="wordCount"
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={wordCount}
                                        onChange={(e) => setWordCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 font-medium">
                                        <span>1</span>
                                        <span>50</span>
                                    </div>
                                </div>

                                {/* Word Type */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">
                                        Part of Speech
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        {['all', 'noun', 'verb', 'adjective'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setWordType(type)}
                                                className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border text-left ${
                                                    wordType === type
                                                        ? 'bg-fuchsia-600 border-fuchsia-600 text-white shadow-md shadow-fuchsia-200'
                                                        : 'bg-white border-slate-200 text-slate-600 hover:border-fuchsia-300 hover:bg-fuchsia-50'
                                                }`}
                                            >
                                                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <button
                                    onClick={generateWords}
                                    disabled={isGenerating}
                                    className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
                                >
                                    <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                                    Generate Words
                                </button>
                            </div>
                        </div>

                        {/* Right Display Area */}
                        <div className="p-6 sm:p-8 lg:col-span-2 flex flex-col h-full min-h-[400px]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                    <List className="w-5 h-5 text-fuchsia-500" />
                                    Your Random Words
                                </h3>
                                
                                <button
                                    onClick={copyToClipboard}
                                    disabled={generatedWords.length === 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 
                                        ${isCopied 
                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {isCopied ? 'Copied!' : 'Copy List'}
                                </button>
                            </div>

                            <div className={`flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative ${
                                wordCount === 1 
                                    ? "flex items-center justify-center p-8 min-h-[350px] overflow-hidden" 
                                    : "p-6 sm:p-8 flex flex-wrap gap-3 items-start content-start overflow-y-auto max-h-[500px]"
                            }`}>
                                {isGenerating ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm z-10 rounded-2xl">
                                        <RefreshCw className="w-10 h-10 text-fuchsia-500 animate-spin" />
                                    </div>
                                ) : null}
                                
                                {generatedWords.map((word, index) => (
                                    <div 
                                        key={index}
                                        className={
                                            wordCount === 1
                                                ? "text-5xl sm:text-7xl md:text-[5rem] font-black text-slate-900 capitalize tracking-tight text-center leading-none"
                                                : "bg-white px-4 py-2 rounded-xl text-lg sm:text-xl font-bold text-slate-700 shadow-sm border border-slate-100 capitalize hover:-translate-y-1 transition-transform cursor-pointer hover:border-fuchsia-300 hover:text-fuchsia-600"
                                        }
                                        onClick={() => {
                                            if (wordCount !== 1) navigator.clipboard.writeText(word);
                                        }}
                                        title={wordCount === 1 ? "" : "Click to copy word"}
                                    >
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full text-left">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Random Word Generator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The Random Word Generator is a highly versatile tool that outputs random nouns, verbs, and adjectives from a curated dictionary database. It features a unique 'Game Mode' designed specifically for group game nights.</p>
                            <p>Whether you are a writer suffering from a creative block, a teacher looking for vocabulary words, or friends playing Pictionary or Charades, trying to think of random words manually is inherently biased. This tool provides instant, truly randomized words spanning various complexities.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Random Word Generator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Select exactly how many random words you want to generate (using the slider).</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Generate Words' button.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Review your list of randomly selected words.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Enable 'Game Mode' by setting the word count to exactly 1. This makes the word gigantic for everyone in the room to read.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Click 'Copy Words' if you need to paste them into a document or chat.</p>
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
                                <span className="text-slate-600"> Unlimited word generation without hidden fees.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">No Signup:</strong>
                                <span className="text-slate-600"> Use the tool instantly without creating an account.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">Works in Browser:</strong>
                                <span className="text-slate-600"> Fully client-side script natively in your web browser.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">No Data Stored:</strong>
                                <span className="text-slate-600"> Your words are not saved, logged, or recorded.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <strong className="text-slate-800">Mobile Friendly:</strong>
                                <span className="text-slate-600"> Perfect responsive design for parties and games.</span>
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
                            <strong className="text-slate-800">Pictionary & Charades:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Generate a single noun and pass the phone around so players can draw or act.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Creative Writing Prompts:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Generate 5 random verbs and nouns, and force yourself to write a short story.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Brainstorming:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Generating random adjectives to conceptualize a new startup brand name.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, generate thousands of words for free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. The dictionary is loaded into your browser and no external requests are tracked.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes! 'Game Mode' was specifically built so you can read the word clearly on a small mobile screen during a party.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does your dictionary include offensive words?</h4>
                            <p className="text-slate-600 leading-relaxed">No. We have carefully curated the dictionary to be 100% PG and family-friendly, perfect for schools and children's games.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can I choose just Adjectives?</h4>
                            <p className="text-slate-600 leading-relaxed">Currently the tool pulls from a mixed database of nouns, verbs, and adjectives to provide maximum unpredictability.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/word-counter" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Word Counter &rarr;</span>
                        </a>
                        <a href="/tools/lorem-ipsum-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Lorem Ipsum Generator &rarr;</span>
                        </a>
                        <a href="/tools/uuid-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">UUID Generator &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </main>
    );
}
