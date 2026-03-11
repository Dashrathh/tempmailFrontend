"use client";

import { useState } from "react";
import { Copy, Trash2, CheckCircle2, AlertCircle, FileJson, AlignLeft, Shrink, Upload } from "lucide-react";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, valid, invalid

    const validateAndFormat = (spaces = 4) => {
        if (!input.trim()) {
            setError("Please enter some JSON data to format.");
            setStatus("idle");
            setOutput("");
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, spaces);
            setOutput(formatted);
            setError(null);
            setStatus("valid");
        } catch (err) {
            setError(err.message);
            setStatus("invalid");
        }
    };

    const handleFormat = () => validateAndFormat(4);

    const handleMinify = () => validateAndFormat(0);

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError(null);
        setStatus("idle");
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setInput(event.target.result);
            // reset states
            setOutput("");
            setError(null);
            setStatus("idle");
        };
        reader.readAsText(file);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-7xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        JSON Formatter & Validator
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Clean, format, and validate your JSON data instantly. Works 100% in your browser without sending any data to our servers. Free, no signup required.</p>

                    {/* Status Bar */}
                    <div className="w-full mb-6">
                        {status === "valid" && (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3 font-medium">
                                <CheckCircle2 className="w-6 h-6" /> JSON is Valid
                            </div>
                        )}
                        {status === "invalid" && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start flex-col sm:flex-row gap-3 font-medium">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-6 h-6 flex-shrink-0" /> <span className="font-bold">Invalid JSON:</span>
                                </div>
                                <span className="font-mono text-sm break-all">{error}</span>
                            </div>
                        )}
                        {status === "idle" && error && (
                            <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl flex items-center gap-3 font-medium">
                                <AlertCircle className="w-6 h-6" /> {error}
                            </div>
                        )}
                    </div>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col pt-2">

                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-2">
                                <label className="cursor-pointer bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                                    <Upload className="w-4 h-4" /> Upload File
                                    <input
                                        type="file"
                                        accept=".json,application/json,text/plain"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                </label>
                                <button
                                    onClick={handleClear}
                                    className="bg-white border border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Clear
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleFormat}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
                                >
                                    <AlignLeft className="w-4 h-4" /> Format / Beautify
                                </button>
                                <button
                                    onClick={handleMinify}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
                                >
                                    <Shrink className="w-4 h-4" /> Minify
                                </button>
                            </div>
                        </div>

                        {/* Editor Area (Split Grid) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[500px]">

                            {/* Input Area */}
                            <div className="flex flex-col relative w-full h-[400px] lg:h-auto">
                                <div className="absolute top-0 right-0 p-3 pointer-events-none">
                                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">Input</span>
                                </div>
                                <textarea
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        if (status !== "idle") setStatus("idle");
                                    }}
                                    placeholder="Paste your raw JSON data here..."
                                    className="w-full h-full p-6 pt-10 resize-none outline-none font-mono text-sm bg-white text-slate-700 placeholder-slate-400 custom-scrollbar"
                                    spellCheck="false"
                                ></textarea>
                            </div>

                            {/* Output Area */}
                            <div className="flex flex-col bg-slate-50 relative w-full h-[400px] lg:h-auto">
                                <div className="absolute top-0 right-0 p-3 flex gap-2 z-10">
                                    <span className="bg-white border border-slate-200 text-blue-600 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">Output</span>
                                </div>

                                {output && (
                                    <div className="absolute bottom-4 right-4 z-10">
                                        <button
                                            onClick={copyToClipboard}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-all ${copied ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-900 text-white'}`}
                                        >
                                            {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy JSON</>}
                                        </button>
                                    </div>
                                )}

                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder="Formatted JSON will appear here..."
                                    className="w-full h-full p-6 pt-10 resize-none outline-none font-mono text-sm bg-slate-50 text-slate-800 placeholder-slate-300 custom-scrollbar"
                                    spellCheck="false"
                                ></textarea>
                            </div>

                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a JSON Formatter & Validator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>A JSON Formatter & Validator is an essential developer tool that takes raw, minified, or disorganized JSON data and converts it into a clean, human-readable, beautifully indented format. It also acts as a strict validator to catch syntax errors.</p>
                            <p>When working with APIs or configuration files, JSON strings are usually minified into a single massive line of text to save bandwidth. Reading or debugging this is impossible for humans. Our tool instantly pretty-prints the JSON and highlights exactly where any syntax errors (like a missing comma) exist.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use JSON Formatter & Validator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Paste your raw, messy, or minified JSON string into the input area.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Format JSON' button to beautify the code.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Click 'Minify JSON' to compress it back into a single line for production use.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">If there is a syntax error, a red error box will display explaining the issue.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Use the 'Copy' or 'Download' buttons to save your processed JSON.</p>
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
                            <strong className="text-slate-800">Minified JSON:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> {"name":"John","age":30,"city":"New York"}</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Formatted JSON:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Automatically adds line breaks and 2-space indents for readable hierarchy.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Error Detection:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Catching a trailing comma {"test": 123,} and flagging it as invalid.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, the JSON formater is completely free to use.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. We know JSONs often contain API keys or secure data, so processing is handled entirely client-side without API calls.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, but for large JSON files, a desktop monitor provides a better viewing experience.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">How many spaces does it indent?</h4>
                            <p className="text-slate-600 leading-relaxed">The tool currently formats your code with standard 2-space indentation.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can it handle huge JSON files?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, modern browsers can process megabytes of JSON data locally in just a few milliseconds.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/jwt-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JWT Decoder &rarr;</span>
                        </a>
                        <a href="/tools/base64-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Base64 Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/uuid-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">UUID Generator &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
