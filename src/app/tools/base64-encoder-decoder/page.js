"use client";

import { useState } from "react";
import { Binary, Trash2, Copy, CheckCircle2, ArrowRightLeft, ShieldCheck, AlertCircle, Upload } from "lucide-react";

export default function Base64EncoderDecoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("encode");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const processText = (text, currentMode) => {
        setInput(text);
        setError("");

        if (!text.trim()) {
            setOutput("");
            return;
        }

        try {
            if (currentMode === "encode") {
                // Handle Unicode properly
                const encoded = btoa(unescape(encodeURIComponent(text)));
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(text.trim())));
                setOutput(decoded);
            }
        } catch (err) {
            setError(currentMode === "decode" ? "Invalid Base64 string. Check your input and try again." : err.message);
            setOutput("");
        }
    };

    const toggleMode = () => {
        const newMode = mode === "encode" ? "decode" : "encode";
        setMode(newMode);
        if (output && !error) {
            processText(output, newMode);
        } else {
            processText(input, newMode);
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError("");
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
        if (mode === "encode") {
            reader.onload = () => {
                const base64 = reader.result.split(",")[1];
                setInput(`[File: ${file.name}]`);
                setOutput(base64);
                setError("");
            };
            reader.readAsDataURL(file);
        } else {
            reader.onload = () => {
                processText(reader.result, "decode");
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Base64 Encoder & Decoder
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Instantly encode text to Base64 or decode Base64 strings back to readable text. Upload files to encode them too. 100% client-side.
                    </p>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-8">

                        {/* Mode Toggle */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                            <div className="flex bg-slate-100 p-1.5 rounded-xl">
                                <button
                                    onClick={() => { setMode("encode"); processText(input, "encode"); }}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${mode === "encode" ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Encode
                                </button>
                                <button
                                    onClick={() => { setMode("decode"); processText(input, "decode"); }}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${mode === "decode" ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Decode
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
                                    <Upload className="w-4 h-4" /> Upload File
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </label>
                                <button
                                    onClick={toggleMode}
                                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300"
                                >
                                    <ArrowRightLeft className="w-4 h-4" /> Swap
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="font-medium text-sm">{error}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* Input */}
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 border-b-0 rounded-t-2xl">
                                    <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                        <Binary className={`w-4 h-4 ${mode === 'encode' ? 'text-blue-500' : 'text-purple-500'}`} />
                                        {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                                    </label>
                                    <button onClick={handleClear} className="text-slate-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <textarea
                                    value={input}
                                    onChange={(e) => processText(e.target.value, mode)}
                                    placeholder={mode === 'encode' ? "Type or paste your text here..." : "Paste your Base64 string here..."}
                                    className="w-full h-64 p-5 resize-none border border-slate-200 rounded-b-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-mono text-sm bg-white text-slate-800 placeholder-slate-400"
                                    spellCheck="false"
                                ></textarea>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 shadow-sm">
                                <ArrowRightLeft className="w-5 h-5" />
                            </div>

                            {/* Output */}
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 border-b-0 rounded-t-2xl">
                                    <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Result
                                    </label>
                                    <button
                                        onClick={copyToClipboard}
                                        disabled={!output}
                                        className={`transition-colors flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md ${!output ? 'text-slate-300 cursor-not-allowed' : copied ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
                                    >
                                        {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                                    </button>
                                </div>
                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder="Result will appear here..."
                                    className="w-full h-64 p-5 resize-none border border-slate-200 rounded-b-2xl outline-none font-mono text-sm bg-slate-50 text-slate-800 placeholder-slate-400 cursor-text"
                                ></textarea>
                            </div>
                        </div>

                        {/* Stats */}
                        {output && (
                            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500">
                                <span>Input: <strong className="text-slate-700">{input.length}</strong> chars</span>
                                <span>Output: <strong className="text-slate-700">{output.length}</strong> chars</span>
                                {mode === "encode" && <span>Size increase: <strong className="text-slate-700">~{Math.round((output.length / Math.max(input.length, 1)) * 100 - 100)}%</strong></span>}
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO Content */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Base64 Encoding?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string format using a set of 64 printable characters (A–Z, a–z, 0–9, +, /). It's widely used in web development, email systems (MIME), data URIs, and API authentication (like Basic Auth headers).
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Common Use Cases</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Email Attachments (MIME):</strong> Email protocols like SMTP only support ASCII text. Base64 encodes binary attachments (images, PDFs) so they can travel through email safely.</li>
                        <li><strong className="text-slate-800">Data URIs:</strong> Embed small images directly in HTML/CSS using <code>data:image/png;base64,...</code> instead of external file references.</li>
                        <li><strong className="text-slate-800">API Authentication:</strong> HTTP Basic Auth encodes <code>username:password</code> in Base64 before sending in the Authorization header.</li>
                        <li><strong className="text-slate-800">JWT Tokens:</strong> JSON Web Tokens use Base64Url encoding for the header and payload sections.</li>
                        <li><strong className="text-slate-800">Storing Binary in JSON/XML:</strong> Since JSON doesn't support binary data, Base64 lets you embed images or files inside JSON payloads.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Is Base64 encryption?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No. Base64 is an <strong>encoding</strong> scheme, not encryption. Anyone can decode a Base64 string instantly — it provides zero security. It's designed for data transport, not data protection.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Why does Base64 increase file size?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Base64 represents 3 bytes of binary data as 4 ASCII characters, resulting in approximately a 33% increase in size. This is the tradeoff for being able to safely transmit binary data through text-only channels.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Is my data safe with this tool?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes. All encoding and decoding happens entirely in your browser using JavaScript's native <code>btoa()</code> and <code>atob()</code> functions. No data is sent to any server.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
