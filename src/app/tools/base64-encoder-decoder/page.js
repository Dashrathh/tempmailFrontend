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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Instantly encode text to Base64 or decode Base64 strings back to readable text. Upload files to encode them too. 100% client-side. Free, no signup required.</p>

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
                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Base64 Encoder & Decoder?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The Base64 Encoder & Decoder is a developer utility used to convert regular human-readable text into a secure Base64 format, or to reverse a Base64 string back into readable text.</p>
                            <p>When transferring binary data, complex tokens, or images over text-based protocols (like JSON, XML, or Email), formatting can break and cause corruption. Converting that data into standard Base64 ensures it survives transport across the internet intact. This tool allows developers to quickly manually inspect or build Base64 strings.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Base64 Encoder & Decoder</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Choose 'Encode' or 'Decode' using the toggle options at the top.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Paste your text or Base64 string into the input box.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">The tool mathematically converts your string in real-time.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Review the result in the output box.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Click 'Copy' to immediately add the result to your clipboard.</p>
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
                            <strong className="text-slate-800">Encoding:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Hello World becomes SGVsbG8gV29ybGQ=</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Decoding:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> QWRtaW4= translates back into Admin</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Verifying Data:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Checking a Base64 string from a database payload to see what text it represents.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, encode and decode all you want for free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, the Base64 conversion relies entirely on standard JavaScript API functions right on your device. No data is sent out.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, it adapts flawlessly to mobile screens.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is Base64 a form of encryption?</h4>
                            <p className="text-slate-600 leading-relaxed">No! Base64 is only an 'encoding' scheme designed to protect data format during transit, not a security encryption. Anyone can decode it.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Why do some Base64 strings end in equals signs (=)?</h4>
                            <p className="text-slate-600 leading-relaxed">The `=` character is used as padding to ensure the final string is a multiple of 4 bytes, adhering to the Base64 specification.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/url-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">URL Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/jwt-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JWT Decoder &rarr;</span>
                        </a>
                        <a href="/tools/json-formatter" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JSON Formatter &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}
