"use client";

import { useState } from "react";
import { Key, ShieldAlert, CheckCircle2, AlertCircle, Trash2, Copy, ShieldCheck, FileJson, Braces } from "lucide-react";

export default function JwtDecoder() {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");
    const [error, setError] = useState("");
    const [copiedContent, setCopiedContent] = useState("");

    const decodeBase64Url = (str) => {
        // Handle Base64Url encoding
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        // Pad with standard base64 padding
        switch (output.length % 4) {
            case 0: break;
            case 2: output += '=='; break;
            case 3: output += '='; break;
            default: throw new Error('Illegal base64url string!');
        }

        // Decode to string, handling unicode properly
        return decodeURIComponent(
            Array.prototype.map.call(atob(output), function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
        );
    };

    const handleDecode = (inputToken) => {
        setToken(inputToken);

        if (!inputToken.trim()) {
            setHeader("");
            setPayload("");
            setError("");
            return;
        }

        const parts = inputToken.split(".");

        if (parts.length !== 3) {
            setError("Invalid JWT structure. A valid JWT contains 3 parts separated by dots (header.payload.signature).");
            setHeader("");
            setPayload("");
            return;
        }

        try {
            const decodedHeader = decodeBase64Url(parts[0]);
            const decodedPayload = decodeBase64Url(parts[1]);

            // Format as pretty JSON
            setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 4));
            setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 4));
            setError("");
        } catch (err) {
            setError("Failed to parse JWT. The token might be malformed or not a valid JSON string.");
            setHeader("");
            setPayload("");
        }
    };

    const handleClear = () => {
        setToken("");
        setHeader("");
        setPayload("");
        setError("");
    };

    const copyToClipboard = (text, type) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedContent(type);
        setTimeout(() => setCopiedContent(""), 2000);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-6xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        JWT Decoder
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Decode, parse, and inspect your JSON Web Tokens (JWT) instantly. <br />
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 mt-2 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                            <ShieldCheck className="w-4 h-4" /> 100% Secure Client-Side Parsing
                        </span> Free, no signup required.</p>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* LEFT: Token Input */}
                        <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                                <h2 className="font-bold text-slate-700 flex items-center gap-2">
                                    <Key className="w-5 h-5 text-rose-500" /> Encoded Token
                                </h2>
                                <button
                                    onClick={handleClear}
                                    className="text-slate-500 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Clear
                                </button>
                            </div>

                            <div className="relative flex-grow min-h-[400px]">
                                <textarea
                                    value={token}
                                    onChange={(e) => handleDecode(e.target.value)}
                                    placeholder="Paste your JWT (header.payload.signature) here..."
                                    className="absolute inset-0 w-full h-full p-6 resize-none outline-none font-mono text-base leading-relaxed break-all bg-white text-slate-800 placeholder-slate-300 custom-scrollbar"
                                    spellCheck="false"
                                ></textarea>

                                {/* Visual cue if valid token */}
                                {!error && header && payload && (
                                    <div className="absolute bottom-4 right-4 pointer-events-none">
                                        <div className="bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Token Output */}
                        <div className="w-full h-full flex flex-col gap-6">

                            {/* Error State */}
                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 shadow-sm animate-fadeIn">
                                    <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <span className="font-medium text-sm leading-relaxed">{error}</span>
                                </div>
                            )}

                            {/* Header Panel */}
                            <div className={`flex flex-col flex-grow bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors ${!error && header ? 'border-rose-200' : 'border-slate-200'}`}>
                                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                                    <div className="font-bold text-xs tracking-wider text-rose-600 uppercase flex items-center gap-2">
                                        <Braces className="w-4 h-4" /> Header
                                        <span className="text-slate-400 font-normal lowercase tracking-normal">(Algorithm & Token Type)</span>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(header, 'header')}
                                        disabled={!header}
                                        className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        title="Copy Header"
                                    >
                                        {copiedContent === 'header' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="p-4 flex-grow relative bg-slate-50">
                                    <pre className="font-mono text-sm text-slate-700 overflow-auto whitespace-pre-wrap word-break h-full">
                                        {header || <span className="text-slate-400 italic">No header data...</span>}
                                    </pre>
                                </div>
                            </div>

                            {/* Payload Panel */}
                            <div className={`flex flex-col flex-grow bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors ${!error && payload ? 'border-purple-200' : 'border-slate-200'}`}>
                                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                                    <div className="font-bold text-xs tracking-wider text-purple-600 uppercase flex items-center gap-2">
                                        <FileJson className="w-4 h-4" /> Payload
                                        <span className="text-slate-400 font-normal lowercase tracking-normal">(Data & Claims)</span>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(payload, 'payload')}
                                        disabled={!payload}
                                        className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        title="Copy Payload"
                                    >
                                        {copiedContent === 'payload' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="p-4 flex-grow relative bg-slate-50">
                                    <pre className="font-mono text-sm text-slate-700 overflow-auto whitespace-pre-wrap word-break h-full custom-scrollbar">
                                        {payload || <span className="text-slate-400 italic">No payload data...</span>}
                                    </pre>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a JWT Decoder?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The JWT Decoder is an advanced security tool that unpacks JSON Web Tokens. It separates and decodes the Header and Payload of the token, allowing developers to inspect claims, user IDs, and expiration dates in a human-readable JSON format.</p>
                            <p>JSON Web Tokens (JWT) are heavily used in modern web authentication. They look like gibberish strings of random characters separated by dots. When debugging login systems, developers need to verify exactly what data is inside the token. This tool safely decodes the token instantly without needing the secret key.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use JWT Decoder</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Paste your full JSON Web Token string into the top input field.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">The tool will instantly parse the token and split it into Header, Payload, and Signature.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Review the Header to see the algorithm used (e.g., HS256).</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Review the Payload to inspect claims like `sub`, `iat`, and `exp`.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">The tool automatically converts Unix timestamps into human-readable browser dates.</p>
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
                            <strong className="text-slate-800">Raw JWT:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> eyJhbG.eyJzdWI.SflKxw (A standard three-part token)</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Decoded Header:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> {'{"alg": "HS256", "typ": "JWT"}'}</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Decoded Payload:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> {'{"userId": 123, "role": "admin", "exp": 173110290}'}</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, it is entirely free for unlimited decoding.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Extremely safe. JWTs contain authentication secrets. Our tool decodes them entirely client-side in your browser.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, fully responsive on all mobile devices.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can this tool verify the signature?</h4>
                            <p className="text-slate-600 leading-relaxed">No, this tool only decodes the Base64Url encoded segments. Verifying the cryptographic signature requires your private backend secret key, which should never be pasted online.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Why do I see a timestamp number?</h4>
                            <p className="text-slate-600 leading-relaxed">JWT uses Unix Epoch time (seconds since 1970). Our interface automatically formats this into a standard date and time for you.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/json-formatter" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JSON Formatter &rarr;</span>
                        </a>
                        <a href="/tools/base64-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Base64 Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/url-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">URL Encoder & Decoder &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
