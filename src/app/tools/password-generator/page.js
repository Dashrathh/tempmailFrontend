"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCw, CheckCircle2, ShieldAlert, ShieldCheck, Shield } from "lucide-react";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [customText, setCustomText] = useState("");
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState({ state: "Strong", color: "text-emerald-500" });

    const generatePassword = useCallback(() => {
        let charset = "";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        // Ensure at least one option is selected
        if (charset === "") {
            setIncludeLowercase(true);
            charset = "abcdefghijklmnopqrstuvwxyz";
        }

        let newPassword = "";
        let randomLen = Math.max(0, length - customText.length);

        if (randomLen > 0) {
            const array = new Uint32Array(randomLen);
            window.crypto.getRandomValues(array);

            for (let i = 0; i < randomLen; i++) {
                newPassword += charset[array[i] % charset.length];
            }
        }

        if (customText) {
            // Insert customText at a random position
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            const insertPos = array[0] % (randomLen + 1);
            newPassword = newPassword.slice(0, insertPos) + customText + newPassword.slice(insertPos);
        }

        setPassword(newPassword);
        setCopied(false);
        checkStrength(newPassword);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, customText]);

    const checkStrength = (pass) => {
        let score = 0;
        if (!pass) return;

        if (pass.length > 8) score += 1;
        if (pass.length > 12) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (score < 3) {
            setStrength({ state: "Weak", color: "text-red-500", icon: <ShieldAlert className="w-5 h-5 text-red-500" /> });
        } else if (score < 5) {
            setStrength({ state: "Medium", color: "text-yellow-500", icon: <Shield className="w-5 h-5 text-yellow-500" /> });
        } else {
            setStrength({ state: "Strong", color: "text-emerald-500", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> });
        }
    };

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCheckboxChange = (setter, currentValue) => {
        const activeCheckboxes = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length;
        if (activeCheckboxes === 1 && currentValue) {
            // Prevent unchecking the last selected option
            return;
        }
        setter(!currentValue);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-4xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Random Password Generator
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Instantly create highly secure, random passwords. Works entirely in your browser—no data is sent to any server. Free, no signup required.</p>

                    <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10">
                        {/* Password Display */}
                        <div className="relative group">
                            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-6 break-all min-h-[5rem] flex items-center justify-center text-center font-mono text-xl md:text-3xl font-bold tracking-wider text-slate-900">
                                {password}
                            </div>
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={copyToClipboard}
                                    className={`flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold transition-all duration-200 ${copied ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'}`}
                                >
                                    {copied ? <><CheckCircle2 className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy</>}
                                </button>
                                <button
                                    onClick={generatePassword}
                                    className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition-all duration-200"
                                >
                                    <RefreshCw className="w-5 h-5" /> Generate New
                                </button>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-10 space-y-8">
                            {/* Length Slider */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Password Length</label>
                                    <span className="text-2xl font-bold text-blue-600">{length}</span>
                                </div>
                                <input
                                    type="range"
                                    min="6"
                                    max="64"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                                    <span>6</span>
                                    <span>64</span>
                                </div>
                            </div>

                            {/* Custom Text Input */}
                            <div>
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Include a Custom Word (Optional)</label>
                                <input
                                    type="text"
                                    value={customText}
                                    onChange={(e) => {
                                        setCustomText(e.target.value);
                                        // Auto-increase length if custom word gets too big
                                        if (e.target.value.length >= length) {
                                            setLength(Math.min(64, e.target.value.length + 4));
                                        }
                                    }}
                                    placeholder="e.g., yourBrand"
                                    maxLength={32}
                                    className="w-full px-4 py-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700 font-medium hover:bg-slate-50"
                                />
                            </div>

                            {/* Checkboxes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeUppercase}
                                        onChange={() => handleCheckboxChange(setIncludeUppercase, includeUppercase)}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 font-medium text-slate-700">Uppercase (A-Z)</span>
                                </label>
                                <label className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeLowercase}
                                        onChange={() => handleCheckboxChange(setIncludeLowercase, includeLowercase)}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 font-medium text-slate-700">Lowercase (a-z)</span>
                                </label>
                                <label className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeNumbers}
                                        onChange={() => handleCheckboxChange(setIncludeNumbers, includeNumbers)}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 font-medium text-slate-700">Numbers (0-9)</span>
                                </label>
                                <label className="flex items-center p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={includeSymbols}
                                        onChange={() => handleCheckboxChange(setIncludeSymbols, includeSymbols)}
                                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 font-medium text-slate-700">Symbols (@#$%)</span>
                                </label>
                            </div>

                            {/* Strength Indicator */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Strength</span>
                                <div className={`flex items-center gap-2 font-bold ${strength.color}`}>
                                    {strength.icon} {strength.state}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Strong Password Generator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>A Strong Password Generator is a free online tool designed to create highly secure, unpredictable passwords that are incredibly difficult for humans or computers to crack. Using random client-side cryptographically secure algorithms, it mixes uppercase letters, lowercase letters, numbers, and special symbols to ensure maximum entropy.</p>
                            <p>In today's digital landscape, using the same simple password across multiple accounts leaves you vulnerable to data breaches and brute-force attacks. This tool instantly solves that problem by generating unique, randomized passwords for banking apps, social media, and sensitive accounts directly in your browser without saving any data.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Strong Password Generator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Select your desired password length using the slider (we recommend a minimum of 16 characters).</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Choose which character types to include: Uppercase, Lowercase, Numbers, and Symbols.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Optionally, type a custom word you want to appear in the random password.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Generate New' button if you are not satisfied with the current result.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Copy' button to save the password to your clipboard.</p>
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
                            <strong className="text-slate-800">Weak Password:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> password123 (Can be hacked in less than a second)</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Medium Password:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> MyDogMax2022! (Contains personal info, hackers use dictionary attacks)</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Strong Password:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> p#9$Ks2@vLq5*Zx1 (16 characters, completely random, would take trillions of years to crack)</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, our tool is 100% free forever. There are no usage limits.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. Everything runs locally in your web browser. Your passwords never touch our servers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, it is perfectly optimized for all smartphones and tablets.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">How long should my password be?</h4>
                            <p className="text-slate-600 leading-relaxed">Security experts recommend a minimum of 16 characters for critical accounts.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Should I memorize these passwords?</h4>
                            <p className="text-slate-600 leading-relaxed">No. It is impossible to remember unique 16-character passwords for every site. We strongly recommend using a reputable Password Manager to store them.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/password-breach-checker" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Password Breach Checker &rarr;</span>
                        </a>
                        <a href="/tools/email-breach-checker" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Email Breach Checker &rarr;</span>
                        </a>
                        <a href="/tools/uuid-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">UUID Generator &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
