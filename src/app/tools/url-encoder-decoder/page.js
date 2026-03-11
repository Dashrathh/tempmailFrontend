"use client";

import { useState } from "react";
import { Link2, Trash2, Copy, CheckCircle2, ArrowRightLeft, ShieldCheck, AlertCircle } from "lucide-react";

export default function UrlEncoderDecoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("encode"); // 'encode' or 'decode'
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
                // encodeURIComponent is standard for URL query parameters
                setOutput(encodeURIComponent(text));
            } else {
                setOutput(decodeURIComponent(text));
            }
        } catch (err) {
            setError(currentMode === "decode" ? "Malformed URI sequence. Unable to decode." : err.message);
            setOutput("");
        }
    };

    const toggleMode = () => {
        const newMode = mode === "encode" ? "decode" : "encode";
        setMode(newMode);
        // If there's an output, swap it to input for a seamless workflow
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

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        URL Encoder & Decoder
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Instantly format URLs by encoding special characters or decode them back to readable text. Runs 100% locally in your browser. Free, no signup required.</p>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-8">

                        {/* Mode Toggle Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                            <div className="flex bg-slate-100 p-1.5 rounded-xl">
                                <button
                                    onClick={() => {
                                        setMode("encode");
                                        processText(input, "encode");
                                    }}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${mode === "encode" ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Encode URL
                                </button>
                                <button
                                    onClick={() => {
                                        setMode("decode");
                                        processText(input, "decode");
                                    }}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${mode === "decode" ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Decode URL
                                </button>
                            </div>

                            <button
                                onClick={toggleMode}
                                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300"
                                title="Swap modes and text"
                            >
                                <ArrowRightLeft className="w-4 h-4" /> Swap
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3 animate-fadeIn">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="font-medium text-sm">{error}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                            {/* Input Box */}
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 border-b-0 rounded-t-2xl">
                                    <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                                        <Link2 className={`w-4 h-4 ${mode === 'encode' ? 'text-blue-500' : 'text-purple-500'}`} />
                                        {mode === 'encode' ? 'String to Encode' : 'URL to Decode'}
                                    </label>
                                    <button onClick={handleClear} className="text-slate-400 hover:text-red-500 transition-colors" title="Clear Text">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <textarea
                                    value={input}
                                    onChange={(e) => processText(e.target.value, mode)}
                                    placeholder={mode === 'encode' ? "e.g., https://example.com/search?q=hello world" : "e.g., https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"}
                                    className="w-full h-64 p-5 resize-none border border-slate-200 rounded-b-2xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-mono text-base bg-white text-slate-800 placeholder-slate-400 custom-scrollbar"
                                    spellCheck="false"
                                ></textarea>
                            </div>

                            {/* Center Arrow Icon (Desktop) */}
                            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 shadow-sm">
                                <ArrowRightLeft className="w-5 h-5" />
                            </div>

                            {/* Output Box */}
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
                                <div className="relative h-64">
                                    <textarea
                                        value={output}
                                        readOnly
                                        placeholder={error ? "Fix the errors to see the result..." : "The resulting text will appear here..."}
                                        className="w-full h-full p-5 resize-none border border-slate-200 rounded-b-2xl outline-none font-mono text-base bg-slate-50 text-slate-800 placeholder-slate-400 custom-scrollbar cursor-text"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a URL Encoder & Decoder?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The URL Encoder & Decoder is a developer utility that converts special characters in a string into format suitable for transmitting over the internet, and vice versa. It safely escapes unsafe ASCII characters using percent-encoding.</p>
                            <p>URLs can only be sent over the Internet using the ASCII character-set. If a URL contains spaces or special characters like `?`, `&`, or `=`, it can break the web request or cause server errors. This tool instantly formats your strings to ensure safe data transmission in web queries and APIs.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use URL Encoder & Decoder</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Select your operation: 'Encode' or 'Decode' using the toggle buttons.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Paste or type your URL or text string into the input box.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">The tool will instantly process the string in real-time.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">View the result in the output box.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Copy' button to copy the formatted string to your clipboard.</p>
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
                            <strong className="text-slate-800">Encoding a Space:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Hello World becomes Hello%20World</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Encoding Query Params:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> https://example.com/?q=hello&test becomes https%3A%2F%2Fexample.com%2F%3Fq%3Dhello%26test</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Decoding:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Email%20Address becomes Email Address</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, it is 100% free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes. The encoding and decoding happens purely in JavaScript on your device.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, the interface is optimized for mobile screens.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">What does encodeURI vs encodeURIComponent mean?</h4>
                            <p className="text-slate-600 leading-relaxed">Our encoder uses `encodeURIComponent` to properly encode characters like `&` and `=` which are strictly necessary for secure HTML form and API data transmission.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Why is a space converted to %20?</h4>
                            <p className="text-slate-600 leading-relaxed">%20 is the hexadecimal representation of a space character in the ASCII standard.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/base64-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Base64 Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/ip-lookup" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">IP Lookup &rarr;</span>
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
