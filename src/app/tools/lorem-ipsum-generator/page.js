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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Generate customizable placeholder text for your designs, mockups, and layouts. Fast, free, and beautiful. Free, no signup required.</p>

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
                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Lorem Ipsum Generator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The Lorem Ipsum Generator creates custom lengths of pseudo-Latin filler text. Originally utilized by the printing press in the 1500s, it allows designers and developers to populate mockups with realistic-looking text blocks.</p>
                            <p>When demonstrating a website UI or a graphic design layout, using real text can distract stakeholders, and typing 'test test test' looks unprofessional and ruins typographic flow. This tool instantly provides aesthetic placeholder paragraphs to simulate a final product's appearance perfectly.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Lorem Ipsum Generator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Select what you want to generate: Paragraphs, Words, or Bytes.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Enter the exact amount/number required in the input field.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Generate' button to render the text.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Review the generated text in the display box.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Copy' button to copy it instantly and paste it into your Figma or HTML.</p>
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
                            <strong className="text-slate-800">Paragraphs:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Generate 3 detailed paragraphs for a blog post mockup layout.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Words:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Generate exactly 15 words to test a realistic headline space.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Bytes:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Generate 200 bytes of text to test database input length constraints.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, generate as much placeholder text as you need for free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes. Processing is handled locally on your browser.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, you can easily use it on iOS and Android devices.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does the text mean anything?</h4>
                            <p className="text-slate-600 leading-relaxed">Not anymore. While it is rooted in classical Latin literature by Cicero, the modern Lorem Ipsum text is intentionally scrambled to be meaningless.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Why not use English words?</h4>
                            <p className="text-slate-600 leading-relaxed">Using readable English can distract reviewers from focusing on the visual layout and design structure, which is the primary purpose of placeholder text.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/word-counter" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Word Counter &rarr;</span>
                        </a>
                        <a href="/tools/url-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">URL Encoder & Decoder &rarr;</span>
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
