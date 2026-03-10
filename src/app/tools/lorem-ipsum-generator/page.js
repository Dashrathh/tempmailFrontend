"use client";

import { useState } from "react";
import { AlignLeft, Copy, CheckCircle2, RefreshCw } from "lucide-react";

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
    "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
    "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
    "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt",
    "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde", "omnis", "iste", "natus",
    "error", "voluptatem", "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam",
    "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "quasi", "architecto",
    "beatae", "vitae", "dicta", "explicabo", "nemo", "ipsam", "voluptas", "aspernatur", "aut",
    "odit", "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt",
    "neque", "porro", "quisquam", "dolorem", "adipisci", "numquam", "tempora", "incidunt",
    "magnam", "aliquam", "quaerat", "minima", "nostrum", "exercitationem", "ullam", "corporis",
    "suscipit", "laboriosam", "commodi", "consequatur", "autem", "vel", "eum", "iure",
    "repellendus", "temporibus", "quibusdam", "soluta", "nobis", "eligendi", "optio", "cumque",
    "nihil", "impedit", "quo", "minus", "maxime", "placeat", "facere", "possimus", "assumenda",
    "repellat", "mollitia", "animi", "recusandae", "provident", "similique", "sapiente",
    "dignissimos", "ducimus", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque",
    "corrupti", "quos", "quas", "molestias", "excepturi", "obcaecati", "cupiditate",
];

function randomWord() {
    return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(minWords = 6, maxWords = 14) {
    const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = Array.from({ length: count }, () => randomWord());
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
}

function generateParagraph(minSentences = 3, maxSentences = 7) {
    const count = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    return Array.from({ length: count }, () => generateSentence()).join(" ");
}

export default function LoremIpsumGenerator() {
    const [count, setCount] = useState(3);
    const [unit, setUnit] = useState("paragraphs"); // paragraphs, sentences, words
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ words: 0, chars: 0, paragraphs: 0 });

    const generate = () => {
        let result = "";

        if (unit === "paragraphs") {
            const paragraphs = Array.from({ length: count }, () => generateParagraph());
            if (startWithLorem) {
                paragraphs[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraphs[0];
            }
            result = paragraphs.join("\n\n");
        } else if (unit === "sentences") {
            const sentences = Array.from({ length: count }, () => generateSentence());
            if (startWithLorem) {
                sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
            }
            result = sentences.join(" ");
        } else {
            const words = Array.from({ length: count }, () => randomWord());
            if (startWithLorem && count >= 2) {
                words[0] = "lorem";
                words[1] = "ipsum";
            }
            result = words.join(" ");
        }

        setOutput(result);
        const wordCount = result.split(/\s+/).filter(Boolean).length;
        const charCount = result.length;
        const paraCount = result.split("\n\n").length;
        setStats({ words: wordCount, chars: charCount, paragraphs: paraCount });
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Auto-generate on first render
    useState(() => {
        generate();
    });

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-4xl w-full mx-auto space-y-12">

                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Lorem Ipsum Generator
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Generate customizable placeholder text for your designs, mockups, and layouts. Fast, free, and beautiful.
                    </p>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-8">

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold text-slate-600">Generate</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                                    className="w-20 px-3 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-center font-bold text-slate-700"
                                />
                                <select
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 outline-none text-sm font-semibold text-slate-700 bg-white"
                                >
                                    <option value="paragraphs">Paragraphs</option>
                                    <option value="sentences">Sentences</option>
                                    <option value="words">Words</option>
                                </select>
                            </div>

                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={startWithLorem}
                                    onChange={(e) => setStartWithLorem(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                Start with &quot;Lorem ipsum...&quot;
                            </label>

                            <button
                                onClick={generate}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all text-sm shadow-sm"
                            >
                                <RefreshCw className="w-4 h-4" /> Generate
                            </button>
                        </div>

                        {/* Output */}
                        <div className="relative">
                            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 border-b-0 rounded-t-2xl">
                                <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                    <AlignLeft className="w-4 h-4 text-blue-500" /> Generated Text
                                </label>
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!output}
                                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md transition-all ${!output ? 'text-slate-300' : copied ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                                >
                                    {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                                </button>
                            </div>
                            <div className="w-full min-h-[300px] max-h-[500px] overflow-auto p-6 border border-slate-200 rounded-b-2xl bg-white text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {output || "Click Generate to create placeholder text..."}
                            </div>
                        </div>

                        {/* Stats */}
                        {output && (
                            <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-500">
                                <span>Words: <strong className="text-slate-700">{stats.words.toLocaleString()}</strong></span>
                                <span>Characters: <strong className="text-slate-700">{stats.chars.toLocaleString()}</strong></span>
                                {unit === "paragraphs" && <span>Paragraphs: <strong className="text-slate-700">{stats.paragraphs}</strong></span>}
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO Content */}
                <article className="max-w-3xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Lorem Ipsum?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Lorem Ipsum is dummy text used in the printing and web design industry since the 1500s. It originated from a scrambled section of Cicero's <em>"De Finibus Bonorum et Malorum"</em> (45 BC). Designers use it as placeholder content to visualize how a layout will look with real text, without being distracted by readable content.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Why Use Lorem Ipsum?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Design Focus:</strong> Real text distracts reviewers from evaluating the design itself. Lorem Ipsum keeps the focus on layout, typography, and spacing.</li>
                        <li><strong className="text-slate-800">Realistic Text Flow:</strong> Unlike repeating "test test test", Lorem Ipsum has a natural distribution of letters and word lengths, simulating real content.</li>
                        <li><strong className="text-slate-800">Industry Standard:</strong> Used by Adobe, Figma, Canva, and virtually every design tool. Clients and developers are familiar with it.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Does Lorem Ipsum mean anything?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                The standard Lorem Ipsum passage is derived from Latin, but it's been scrambled so heavily that it doesn't form coherent Latin sentences. It's intentionally meaningless so it doesn't distract from the design.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">When should I NOT use Lorem Ipsum?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Avoid Lorem Ipsum in final production content, user-facing prototypes shown to stakeholders, or when content strategy is being evaluated. Use real or realistic content in those cases.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
