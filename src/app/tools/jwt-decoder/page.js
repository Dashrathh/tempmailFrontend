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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Decode, parse, and inspect your JSON Web Tokens (JWT) instantly. <br />
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 mt-2 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                            <ShieldCheck className="w-4 h-4" /> 100% Secure Client-Side Parsing
                        </span>
                    </p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a JSON Web Token (JWT)?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        JSON Web Token (JWT) is an open industry standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.
                    </p>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                        They are most commonly used for <strong className="text-slate-800">Authorization</strong> and information exchange in modern web and mobile applications (specifically in Single Page Applications - SPAs).
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">The 3 Parts of a JWT</h3>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4 mb-8">
                        <p className="text-sm text-slate-600 mb-4">A JWT string looks like an encrypted, long string of characters separated by dots (<code>.</code>). The structure is: <code>header.payload.signature</code></p>

                        <dl className="space-y-4 text-sm">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <dt className="font-bold text-rose-600 mb-1">1. Header</dt>
                                <dd className="text-slate-600 leading-relaxed">The header typically consists of two parts: the type of the token (which is JWT), and the signing algorithm being used (such as HMAC SHA256 or RSA). It is then Base64Url encoded to form the first part of the token string.</dd>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <dt className="font-bold text-purple-600 mb-1">2. Payload</dt>
                                <dd className="text-slate-600 leading-relaxed">The payload contains the "claims". Claims are statements about an entity (typically, the user) and additional data (like user ID, email, role, or token expiration time). This is also Base64Url encoded.</dd>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <dt className="font-bold text-blue-600 mb-1">3. Signature</dt>
                                <dd className="text-slate-600 leading-relaxed">To create the signature part you have to take the encoded header, the encoded payload, a secret code (known only to the server), the algorithm specified in the header, and sign that. The signature is used to verify the message wasn't changed along the way.</dd>
                            </div>
                        </dl>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800 flex items-center gap-2">Is it safe to paste my JWT online to decode?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes, <strong className="text-emerald-600">if the tool is 100% Client-Side</strong> like ours. Our JWT Decoder parses the token entirely within your web browser using JavaScript. The token is never sent over the network to any backend server. Your sensitive tokens remain strictly on your local device.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Is decoding a JWT the same as decrypting it?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No! This is a very common misconception. The Header and Payload of a standard JWT are <em>Base64Url encoded</em>, not encrypted. This means anyone who gets hold of a JWT string can easily read the Payload data (like user email, ID) just by decoding it.
                            </p>
                            <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-800 font-medium">
                                <strong>Security Rule:</strong> Never put secret, sensitive data (like passwords or credit card numbers) inside a JWT payload unless the token is explicitly encrypted (JWE).
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Can this tool "Verify" the signature of the token?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Our tool strictly focuses on <em>Decoding</em> the visible payload and header for inspection purposes. We do not verify the signature because doing so requires the server's private <code>secret_key</code>, which you should never paste into any online tool for security reasons.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
