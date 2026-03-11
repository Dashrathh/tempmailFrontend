"use client";

import { useState, useRef } from "react";
import { Link2, ShieldCheck, Download, Type, Smartphone, Palette } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
    const [text, setText] = useState("https://tempmail.sbs");
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [level, setLevel] = useState("L"); // L, M, Q, H

    // We will use an invisible canvas to handle the download of the SVG as a PNG
    const svgRef = useRef(null);

    const downloadQRCode = () => {
        const svgElement = svgRef.current.querySelector("svg");
        if (!svgElement) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const xml = new XMLSerializer().serializeToString(svgElement);
        const svg64 = btoa(unescape(encodeURIComponent(xml)));
        const image64 = "data:image/svg+xml;base64," + svg64;

        const img = new Image();
        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = "qr-code.png";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = image64;
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        QR Code Generator
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Convert links, plain text, or emails into highly scannable QR codes. Customize colors, sizes, and download instantly without limits. Free, no signup required.</p>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:flex-row">

                        {/* LEFT COLUMN: Controls */}
                        <div className="flex-1 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
                            <div className="space-y-8">

                                {/* Text Input */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                        <Link2 className="w-4 h-4 text-blue-500" />
                                        URL or Text
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Enter website URL, text message, or email address..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 resize-none font-medium"
                                    />
                                </div>

                                {/* Customization Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Foreground Color */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                            <Palette className="w-4 h-4 text-purple-500" />
                                            QR Color
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={fgColor}
                                                onChange={(e) => setFgColor(e.target.value)}
                                                className="w-12 h-12 rounded cursor-pointer border-0 bg-transparent p-0"
                                            />
                                            <span className="text-sm text-slate-500 font-mono uppercase">{fgColor}</span>
                                        </div>
                                    </div>

                                    {/* Background Color */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                            <Palette className="w-4 h-4 text-slate-400" />
                                            Background
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={bgColor}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className="w-12 h-12 rounded cursor-pointer border-0 bg-transparent p-0"
                                            />
                                            <span className="text-sm text-slate-500 font-mono uppercase">{bgColor}</span>
                                        </div>
                                    </div>

                                    {/* Error Correction Level */}
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            Error Correction
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {['L', 'M', 'Q', 'H'].map((lvl) => (
                                                <button
                                                    key={lvl}
                                                    onClick={() => setLevel(lvl)}
                                                    className={`py-2 rounded-lg text-sm font-bold border transition-colors ${level === lvl ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    {lvl}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Size Slider */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Image Size</label>
                                        <span className="text-lg font-bold text-blue-600">{size}x{size} px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="128"
                                        max="512"
                                        step="8"
                                        value={size}
                                        onChange={(e) => setSize(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Preview & Download */}
                        <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center bg-white relative">
                            {/* Decorative background grid pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#slate-100_1px,transparent_1px),linear-gradient(to_bottom,#slate-100_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none"></div>

                            <div className="z-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mt-4 sm:mt-0" ref={svgRef}>
                                <QRCodeSVG
                                    value={text || "https://tempmail.sbs"}
                                    size={size > 300 ? 300 : size} // Cap at 300 visually to fit UI, but download size is maintained
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    level={level}
                                    includeMargin={true}
                                />
                            </div>

                            <p className="text-sm text-slate-400 mt-6 text-center max-w-xs font-medium">
                                Frame will adjust scanning efficiency automatically.
                            </p>

                            <button
                                onClick={downloadQRCode}
                                className="mt-8 flex items-center gap-2 py-4 px-8 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full max-w-sm justify-center text-lg z-10"
                            >
                                <Download className="w-5 h-5" /> Download PNG
                            </button>
                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a QR Code Generator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>A QR Code Generator is a dynamic visual tool that converts any text, URL, email address, or phone number into a scannable 2D barcode (Quick Response code). You can customize the look and feel, and download the final code instantly.</p>
                            <p>Typing out long URLs from a physical poster or a computer screen to a mobile phone is frustrating. A QR code bridges the gap between the physical and digital worlds, allowing smartphone users to simply point their camera and instantly open your link, saving time and preventing typos.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use QR Code Generator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Enter your desired text, website URL, or email address into the input field.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Watch the QR code generate automatically in real-time.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Customize the background color and the foreground color to match your brand.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Use the 'Padding' slider to adjust the quiet zone around the QR code.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Download' button to save the QR code as a high-quality PNG image.</p>
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
                            <strong className="text-slate-800">Website Links:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> https://tempmail.sbs &rarr; Scans directly to the website.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Contact Info:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> admin@tempmail.sbs &rarr; Scans to open the default email app.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">WiFi Passwords:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Convert plain text WiFi credentials into a scannable format for guests.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, our QR code generator is completely free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, the code is generated locally in your browser. Your links are not tracked.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, you can generate and download QR codes directly to your phone.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Do these QR codes expire?</h4>
                            <p className="text-slate-600 leading-relaxed">No! The generated QR codes are static and will work permanently as long as the destination URL remains active.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can I use these for commercial purposes?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. You can print them on business cards, menus, or promotional flyers without any attribution.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/url-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">URL Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/uuid-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">UUID Generator &rarr;</span>
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
