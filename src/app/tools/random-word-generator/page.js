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
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Generate instant random words for brainstorming, writing prompts, Pictionary, Catchphrase, and games.
                    </p>
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

                {/* Info / SEO Section */}
                <div className="grid lg:grid-cols-2 gap-6 mt-16">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                            <span className="text-2xl">🎮</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Perfect for Party Games</h2>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Need random words for party games? Whether you're playing <strong>Pictionary</strong>, <strong>Catchphrase</strong>, <strong>Charades</strong>, or <strong>Mad Libs</strong>, our tool is your best companion. No more carrying messy cards!
                        </p>
                        <h3 className="font-semibold text-slate-800 mt-4">How to use for Pictionary:</h3>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 marker:text-blue-500">
                            <li>Set the generator to <strong>1 word</strong> to enter "Game Mode" (it will display the word extra large).</li>
                            <li>Choose <strong>Nouns</strong> for easier drawing, or <strong>All Types</strong> for a challenge.</li>
                            <li>Click "Generate" when the timer starts for the drawing player!</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 hover:border-emerald-200 transition-colors">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-2">
                            <span className="text-2xl">✍️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">For Writers & Developers</h2>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            Overcome writer's block by using random nouns and adjectives as writing prompts. Sometimes, combining two completely random words is all it takes to spark your next big creative idea.
                        </p>
                        <h3 className="font-semibold text-slate-800 mt-4">Other Utility Uses:</h3>
                        <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 marker:text-emerald-500">
                            <li><strong>Vocabulary Practice:</strong> Generate adjectives and verify their meaning to improve English fluency.</li>
                            <li><strong>Developers:</strong> Generate random dummy text or mock database content instantly without external API calls.</li>
                            <li><strong>Naming:</strong> Combine 2-3 random words to name your next project, band, or business.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl mt-12 shadow-2xl text-center space-y-6">
                    <h2 className="text-3xl font-extrabold mb-4">Why Use Our Random Word Generator?</h2>
                    <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed text-lg">
                        Unlike other tools, our Random Word Generator processes everything directly in your browser using a curated dictionary of highly-optimized words. This means <strong>zero loading times</strong>, absolute privacy, and the ability to generate thousands of combinations instantly. Whether you need a random noun to draw, a random verb to act out, or a completely random Catchphrase word for family game night, we have you fully covered.
                    </p>
                </div>
            </div>
        </main>
    );
}
