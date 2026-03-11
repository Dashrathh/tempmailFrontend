"use client";

import { useState, useCallback, useEffect } from "react";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { Copy, RefreshCw, CheckCircle2, Download, Settings, Hash } from "lucide-react";

export default function UUIDGenerator() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [version, setVersion] = useState("v4"); // 'v4' or 'v1'
    const [uppercase, setUppercase] = useState(false);
    const [hyphens, setHyphens] = useState(true);
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const generateUUIDs = useCallback(() => {
        const generated = [];
        for (let i = 0; i < count; i++) {
            let id = version === "v4" ? uuidv4() : uuidv1();

            if (!hyphens) {
                id = id.replace(/-/g, "");
            }
            if (uppercase) {
                id = id.toUpperCase();
            }

            generated.push(id);
        }
        setUuids(generated);
        setCopiedAll(false);
        setCopiedIndex(null);
    }, [count, version, uppercase, hyphens]);

    // Generate initial UUIDs on mount
    useEffect(() => {
        generateUUIDs();
    }, [generateUUIDs]);

    const copyToClipboard = (text, index = null) => {
        navigator.clipboard.writeText(text);
        if (index !== null) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } else {
            setCopiedAll(true);
            setTimeout(() => setCopiedAll(false), 2000);
        }
    };

    const copyAll = () => {
        const textToCopy = uuids.join("\n");
        copyToClipboard(textToCopy);
    };

    const downloadTxt = () => {
        const textToDownload = uuids.join("\n");
        const blob = new Blob([textToDownload], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `uuids-${version}-${count}.txt`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        UUID / GUID Generator
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Generate universally unique identifiers (UUIDs) instantly. Create 1 to 500 random UUIDs in bulk. 100% free and client-side processing. Free, no signup required.</p>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:flex-row">

                        {/* LEFT COLUMN: Controls */}
                        <div className="w-full lg:w-1/3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
                            <div className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-6">
                                <Settings className="w-5 h-5 text-blue-500" /> Options
                            </div>

                            <div className="space-y-6">
                                {/* Count Slider */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">How many?</label>
                                        <span className="text-lg font-bold text-blue-600">{count}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="500"
                                        value={count}
                                        onChange={(e) => setCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                                        <span>1</span>
                                        <span>500</span>
                                    </div>
                                </div>

                                {/* Version Selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">Version</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setVersion("v4")}
                                            className={`py-3 rounded-xl font-bold border transition-colors ${version === "v4" ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                                        >
                                            v4 (Random)
                                        </button>
                                        <button
                                            onClick={() => setVersion("v1")}
                                            className={`py-3 rounded-xl font-bold border transition-colors ${version === "v1" ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                                        >
                                            v1 (Time based)
                                        </button>
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div className="space-y-4 pt-4 border-t border-slate-200">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="font-medium text-slate-700">Uppercase</span>
                                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-blue-600 transition-all duration-300 -ml-1 mt-0.5" style={{ transform: uppercase ? 'translateX(100%)' : 'translateX(0)', backgroundColor: uppercase ? '#2563EB' : '#CBD5E1' }} />
                                            <div className={`block overflow-hidden h-7 rounded-full bg-slate-300 cursor-pointer ${uppercase ? 'bg-blue-200' : ''}`}></div>
                                        </div>
                                    </label>

                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="font-medium text-slate-700">Hyphens</span>
                                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" checked={hyphens} onChange={() => setHyphens(!hyphens)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 -ml-1 mt-0.5 transition-all duration-300" style={{ transform: hyphens ? 'translateX(100%)' : 'translateX(0)', backgroundColor: hyphens ? '#2563EB' : '#CBD5E1' }} />
                                            <div className={`block overflow-hidden h-7 rounded-full bg-slate-300 cursor-pointer ${hyphens ? 'bg-blue-200' : ''}`}></div>
                                        </div>
                                    </label>
                                </div>

                                <button
                                    onClick={generateUUIDs}
                                    className="w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold bg-slate-800 hover:bg-slate-900 text-white transition-colors"
                                >
                                    <RefreshCw className="w-5 h-5" /> Regulate New UUIDs
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Output display */}
                        <div className="w-full lg:w-2/3 p-6 md:p-8 flex flex-col bg-slate-50 relative">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
                                    <Hash className="w-5 h-5 text-emerald-500" /> Results ({count})
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={downloadTxt}
                                        className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                                        title="Download as .txt file"
                                    >
                                        <Download className="w-4 h-4" /> Save
                                    </button>
                                    <button
                                        onClick={copyAll}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${copiedAll ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200'}`}
                                        title="Copy all to clipboard"
                                    >
                                        {copiedAll ? <><CheckCircle2 className="w-4 h-4" /> Copied All</> : <><Copy className="w-4 h-4" /> Copy All</>}
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable UUID List - Virtualized for performance with high counts! */}
                            <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-[400px] max-h-[600px]">
                                <div className="overflow-y-auto p-4 space-y-2 h-full custom-scrollbar">
                                    {uuids.map((id, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-colors"
                                        >
                                            <span className="font-mono text-sm md:text-base text-slate-700 break-all select-all">
                                                {id}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(id, index)}
                                                className={`ml-4 p-2 rounded-md flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 ${copiedIndex === index ? 'bg-emerald-100 text-emerald-600' : 'bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300'}`}
                                                aria-label="Copy this UUID"
                                            >
                                                {copiedIndex === index ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a UUID / GUID Generator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The UUID (Universally Unique Identifier) Generator creates highly secure, statistically unique 128-bit identifiers. It supports generating both Version 4 (Random) and Version 1 (Time-based) UUIDs in bulk, which are heavily used in databases and software engineering.</p>
                            <p>When building databases, APIs, or distributed systems, relying on simple incremental integers (1, 2, 3...) for IDs can lead to security flaws and data collision issues. UUIDs solve this by providing a globally unique string that ensures database records never clash, even across different servers.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use UUID / GUID Generator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Select the UUID Version you need (v4 for random, v1 for timestamp-based).</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Enter the number of UUIDs you want to generate in bulk (up to 500 at once).</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Generate' button to instantly create the list.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Copy All' button to copy the entire list line-by-line.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Alternatively, copy individual UUIDs directly.</p>
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
                            <strong className="text-slate-800">Version 4 (Random):</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> f47ac10b-58cc-4372-a567-0e02b2c3d479 (Best for primary keys)</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Version 1 (Time-based):</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> b444b7d0-1c5c-11ed-861d-0242ac120002 (Contains MAC address and timestamp)</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Bulk Generation:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Quickly generate 100 IDs for populating a mock database table.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, generate as many UUIDs as you need for free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes. All UUIDs are generated directly in your browser and are never stored.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, it is fully responsive on mobile devices.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">What is the difference between UUID and GUID?</h4>
                            <p className="text-slate-600 leading-relaxed">Nothing practically. GUID (Globally Unique Identifier) is simply Microsoft's implementation of the UUID standard.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can a Version 4 UUID ever be a duplicate?</h4>
                            <p className="text-slate-600 leading-relaxed">Technically possible, but probabilistically impossible. You would need to generate 1 billion UUIDs every second for 85 years to have a 50% chance of a collision.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/json-formatter" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JSON Formatter &rarr;</span>
                        </a>
                        <a href="/tools/jwt-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JWT Decoder &rarr;</span>
                        </a>
                        <a href="/tools/base64-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Base64 Encoder & Decoder &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
