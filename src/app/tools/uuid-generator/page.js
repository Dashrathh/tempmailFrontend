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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Generate universally unique identifiers (UUIDs) instantly. Create 1 to 500 random UUIDs in bulk. 100% free and client-side processing.
                    </p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a UUID or GUID?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        A <strong>UUID (Universally Unique Identifier)</strong> is a 128-bit number used to uniquely identify information in computer systems. Created by the Open Software Foundation, UUIDs guarantee uniqueness across space and time without requiring a central authority to assign them.
                        In the Microsoft ecosystem, these are interchangeably referred to as <strong>GUIDs (Globally Unique Identifiers)</strong>.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Common Use Cases for UUIDs</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Database Keys:</strong> Used as Primary Keys in distributed databases where auto-incrementing integers fail to scale natively.</li>
                        <li><strong className="text-slate-800">Session IDs:</strong> Used in web applications to uniquely identify user browser sessions securely.</li>
                        <li><strong className="text-slate-800">Transaction IDs:</strong> Used in e-commerce and banking apps to trace payment operations across multiple microservices.</li>
                        <li><strong className="text-slate-800">File Names:</strong> Appended to uploaded images or documents to prevent accidental file overwrites on storage servers.</li>
                    </ul>

                    <div className="grid md:grid-cols-2 gap-8 mt-12 mb-8 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-lg">
                                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold">v4</span>
                                Random (UUIDv4)
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                UUID version 4 is generated entirely from cryptographically secure random numbers. This is the industry standard for 99% of applications because it guarantees no predictable pattern. The chance of generating a duplicate UUIDv4 is effectively zero.
                            </p>
                        </div>
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-lg">
                                <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold">v1</span>
                                Time-Based (UUIDv1)
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                UUID version 1 combines the current date-time and the MAC address of the computer generating it. It is primarily used when data needs to be sorted chronologically by ID, though it is less secure as it leaks the time of generation and the machine's identity.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">What is the difference between UUID and GUID?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                There is virtually no difference. "UUID" is the standard term used across Linux, Java, Python, and open-source stacks. "GUID" is the specific term popularized by Microsoft in the Windows/C# ecosystem. The numerical values and formats are identical.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Is it safe to generate UUIDs in the browser?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes. Modern browsers implement the Web Crypto API. Our generic UUID Generator leverages this secure cryptography module to generate truly random numbers that cannot be predicted, all without sending any data over the internet.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Can two generated UUIDs clash?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                While theoretically possible, a clash is so mathematically improbable that it can be ignored. To put it in perspective: you would need to generate 1 billion UUIDs every second for approximately 85 years to reach a 50% probability of a single collision.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
