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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Convert links, plain text, or emails into highly scannable QR codes. Customize colors, sizes, and download instantly without limits.
                    </p>

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
                <article className="max-w-3xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How to create the perfect QR Code</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        QR Codes (Quick Response Codes) have become an essential bridge between the physical and digital worlds. Whether you are printing flyers, building a digital menu for a restaurant, or sharing a simple Wi-Fi password, generating a high-quality QR code makes it effortless for smartphone users to connect with your content.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Best Practices for Custom QR Codes</h3>
                    <div className="grid sm:grid-cols-2 gap-6 mb-8 mt-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl h-fit">
                                <Palette className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Ensure High Contrast</h4>
                                <p className="text-sm text-slate-600 mt-1">Always use a dark foreground color on a light background. Low contrast QR codes often fail to scan under different lighting conditions.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-emerald-50 rounded-xl h-fit">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Use High Error Correction</h4>
                                <p className="text-sm text-slate-600 mt-1">If your code might get scratched or you plan to add a logo later, use the 'H' (High) Error Correction Level which tolerates up to 30% damage.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-purple-50 rounded-xl h-fit">
                                <Smartphone className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Testing is Mandatory</h4>
                                <p className="text-sm text-slate-600 mt-1">Always scan your downloaded QR code with a standard smartphone camera before mass-printing it on marketing materials.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 bg-orange-50 rounded-xl h-fit">
                                <Type className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">Keep Links Short</h4>
                                <p className="text-sm text-slate-600 mt-1">Long text and complex URLs create denser QR codes which are harder for older smartphone cameras to instantly read.</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Do these QR codes expire?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No, they never expire. The QR codes generated by our tool are static. They directly encode your destination URL or text within the image itself without relying on intermediary tracking servers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Are they free to use commercially?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes. You have 100% free commercial rights. You can use these downloaded QR codes on business cards, billboards, product packaging, and more without owing us any royalties.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
