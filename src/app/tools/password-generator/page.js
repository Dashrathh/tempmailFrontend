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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Instantly create highly secure, random passwords. Works entirely in your browser—no data is sent to any server.
                    </p>

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
                <article className="max-w-3xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What makes a password truly secure?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        In today's digital landscape, using a strong, unique password for every online account is no longer optional—it's essential. Hackers use powerful software capable of guessing billions of passwords per second through a method known as "brute force."
                        A secure password created by our <strong>Random Password Generator</strong> acts as your first line of defense against these cyber threats.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Best Practices for Password Security in 2026</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Length is crucial:</strong> Every character you add exponentially increases the time it takes to crack. Aim for at least 16 characters.</li>
                        <li><strong className="text-slate-800">Mix your characters:</strong> Use a random combination of uppercase letters, lowercase letters, numbers, and symbols.</li>
                        <li><strong className="text-slate-800">Never reuse passwords:</strong> If one website suffers a data breach, hackers will try your compromised password on other popular sites (credential stuffing).</li>
                        <li><strong className="text-slate-800">Avoid personal information:</strong> Do not include pet names, birthdays, or dictionary words.</li>
                        <li><strong className="text-slate-800">Use a Password Manager:</strong> Since it's impossible to memorize 50+ random 16-character passwords, use a reputable password manager to store them securely.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Is this password generator safe to use?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes. The password generation process happens entirely in your web browser (client-side) using the secure <code>window.crypto</code> API. We do not store, track, or transmit the passwords you generate to any server.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">How long does it take a hacker to crack a 16-character password?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                A 16-character password containing a mix of letters, numbers, and symbols generated by our tool would take standard computing hardware trillions of years to crack using brute force.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Should I change my passwords regularly?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Modern security guidelines suggest that if you use a strong, unique password and have Multi-Factor Authentication (MFA) enabled, you only need to change your password if you suspect a specific breach or account compromise.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
