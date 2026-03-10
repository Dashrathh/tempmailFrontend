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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Instantly format URLs by encoding special characters or decode them back to readable text. Runs 100% locally in your browser.
                    </p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is URL Encoding (Percent-Encoding)?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        URL encoding is a mechanism for translating characters that have special meaning in a URL into a universally accepted and safe format.
                        Web addresses (URLs) can only be sent over the Internet using the US-ASCII character set. If a URL contains characters outside the ASCII set (like spaces, emojis, or foreign symbols), or characters that act as structural delimiters (like <code>?</code>, <code>&</code>, or <code>=</code>), they must be converted.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Common Encoded Characters</h3>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4 mb-8 overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-100/50 text-slate-700">
                                <tr>
                                    <th className="px-4 py-3 font-bold rounded-tl-lg">Character</th>
                                    <th className="px-4 py-3 font-bold">Meaning in URL</th>
                                    <th className="px-4 py-3 font-bold rounded-tr-lg">Encoded Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                <tr>
                                    <td className="px-4 py-3 font-mono text-lg bg-white"> (space)</td>
                                    <td className="px-4 py-3 bg-white">Used to separate words</td>
                                    <td className="px-4 py-3 font-mono font-bold text-blue-600 bg-white">%20</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-mono text-lg">!</td>
                                    <td className="px-4 py-3">Exclamation point</td>
                                    <td className="px-4 py-3 font-mono font-bold text-blue-600">%21</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-mono text-lg bg-white">#</td>
                                    <td className="px-4 py-3 bg-white">Indicates a fragment / anchor</td>
                                    <td className="px-4 py-3 font-mono font-bold text-blue-600 bg-white">%23</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-mono text-lg">&amp;</td>
                                    <td className="px-4 py-3">Separates query parameters</td>
                                    <td className="px-4 py-3 font-mono font-bold text-blue-600">%26</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-mono text-lg bg-white">?</td>
                                    <td className="px-4 py-3 bg-white">Separates URL path from query parameters</td>
                                    <td className="px-4 py-3 font-mono font-bold text-blue-600 bg-white">%3F</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Why use a URL Decoder?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Reading UTM Tags:</strong> Marketers often deal with massive messy links filled with tracking tags. Decoding makes the <code>utm_source</code> and <code>utm_campaign</code> parameters human-readable again.</li>
                        <li><strong className="text-slate-800">Debugging APIs:</strong> Developers analyzing network requests need to look at the raw data being sent to GET endpoints.</li>
                        <li><strong className="text-slate-800">Security Analysis:</strong> Security researchers decode payloads to see if attackers are trying to hide Cross-Site Scripting (XSS) or SQL Injection attacks behind percent-encoded strings.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Does this tool use encodeURI or encodeURIComponent?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Our tool strictly uses <code>encodeURIComponent</code> (and its decoding equivalent) behind the scenes. This is the safest, most comprehensive method because it encodes <em>all</em> special characters, ensuring your query strings are entirely valid and won't break web servers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Is my data sent to any server?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No. The encoding and decoding processes happen instantly using your browser's native JavaScript engine. Your links and text are completely private.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
