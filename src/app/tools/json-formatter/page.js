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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Clean, format, and validate your JSON data instantly. Works 100% in your browser without sending any data to our servers.
                    </p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is JSON?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It has become the de facto standard for transmitting data in web applications, typically between a web browser and a server via REST APIs or WebSockets.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Why use a JSON Formatter?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Readability:</strong> Raw JSON files or API responses often come minified (all in one line) to save bandwidth. Formatting (or "beautifying") adds proper indentation and line breaks, making it human-readable.</li>
                        <li><strong className="text-slate-800">Debugging:</strong> When APIs fail or configuration files break, a JSON Validator instantly detects syntax errors like missing trailing commas, unquoted keys, or mismatched brackets.</li>
                        <li><strong className="text-slate-800">Minification:</strong> If you are deploying an app and want to save network size, you can take formatted JSON and "minify" it to strip out all unnecessary whitespace before deployment.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Common JSON Syntax Rules</h3>
                    <div className="grid md:grid-cols-2 gap-8 mt-6 mb-8 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Do's
                            </h4>
                            <ul className="text-sm text-slate-600 space-y-2 mt-3 list-disc pl-4">
                                <li>Always enclose property names (keys) in <strong>double quotes</strong>. (e.g., <code>"name": "John"</code>)</li>
                                <li>Use curly braces <code>{`{}`}</code> to define objects.</li>
                                <li>Use square brackets <code>[]</code> to define arrays.</li>
                                <li>Values can be strings, numbers, booleans, null, arrays, or objects.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" /> Don'ts
                            </h4>
                            <ul className="text-sm text-slate-600 space-y-2 mt-3 list-disc pl-4">
                                <li>Do not use single quotes (<code>'</code>) for keys or strings.</li>
                                <li>Do not leave trailing commas after the last element in an array or object. This is the #1 cause of JSON syntax errors.</li>
                                <li>JSON does not support comments natively (like <code>//</code> or <code>/* */</code>).</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Is this JSON Formatter secure?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Absolutely. Unlike many online tools that send your data to their backend servers for processing, our JSON Formatter operates entirely inside your browser locally using JavaScript's native <code>JSON</code> object. Your proprietary configuration files and API keys never leave your machine.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Can I upload a .json file directly?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes. You can click the "Upload File" button in the toolbar to load any text or JSON file straight from your computer into the editor without having to open it in a text editor first.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
