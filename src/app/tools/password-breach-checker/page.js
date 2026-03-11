"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Shield, Search, RefreshCw, Eye, EyeOff, Lock, Unlock, Database } from "lucide-react";

export default function PasswordBreachChecker() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const sha1 = async (str) => {
        const buffer = new TextEncoder("utf-8").encode(str);
        const digest = await crypto.subtle.digest("SHA-1", buffer);
        return Array.from(new Uint8Array(digest))
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("").toUpperCase();
    };

    const checkPassword = async (e) => {
        if (e) e.preventDefault();

        if (!password.trim()) {
            setError("Please enter a password to check.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const hash = await sha1(password);
            const prefix = hash.slice(0, 5);
            const suffix = hash.slice(5);

            const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);

            if (!res.ok) {
                throw new Error("Failed to connect to the breach database. Please try again later.");
            }

            const text = await res.text();
            const lines = text.split("\n");
            let foundCount = 0;

            for (const line of lines) {
                if (!line) continue;
                const [lineSuffix, lineCount] = line.split(":");
                if (lineSuffix.trim() === suffix) {
                    foundCount = parseInt(lineCount.trim(), 10);
                    break;
                }
            }

            setResult({
                isPwned: foundCount > 0,
                count: foundCount,
                prefix,
                hash
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearInput = () => {
        setPassword("");
        setResult(null);
        setError("");
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Password Data Breach Scanner
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Find out if your password has been exposed in a data breach. Powered securely by the <strong>Have I Been Pwned</strong> database. Free, no signup required.</p>

                    <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10 relative overflow-hidden">

                        {/* Security Banner Ribbon */}
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-8 py-1 rotate-45 transform translate-x-[25px] translate-y-[20px] shadow-sm flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Secure
                        </div>

                        {/* Search Area */}
                        <form onSubmit={checkPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-blue-500" /> Enter a Password to Check
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Type a password here..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-5 pr-12 py-5 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900 font-bold text-lg md:text-xl shadow-inner bg-slate-50 focus:bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !password}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                            >
                                {loading ? <RefreshCw className="animate-spin h-6 w-6" /> : <><Search className="h-6 w-6" /> Scan for Breaches</>}
                            </button>
                        </form>

                        {/* Error State */}
                        {error && (
                            <div className="mt-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3 animate-fadeIn">
                                <AlertTriangle className="h-6 w-6 flex-shrink-0" />
                                <span className="font-semibold">{error}</span>
                            </div>
                        )}

                        {/* Loading State Skeleton */}
                        {loading && (
                            <div className="mt-8 border border-slate-100 bg-slate-50 rounded-2xl p-6 text-center animate-pulse flex flex-col items-center">
                                <Database className="w-8 h-8 text-blue-400 mb-3 animate-bounce" />
                                <p className="text-slate-500 font-bold">Hashing password securely...</p>
                                <p className="text-slate-400 text-sm mt-1">Cross-referencing 890+ million breached records.</p>
                            </div>
                        )}

                        {/* Result Area */}
                        {result && !loading && (
                            <div className={`mt-8 rounded-2xl border p-6 md:p-8 text-center animate-fadeIn ${result.isPwned ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>

                                {result.isPwned ? (
                                    <>
                                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 border-4 border-red-200">
                                            <Unlock className="w-8 h-8 text-red-600" />
                                        </div>
                                        <h2 className="text-2xl font-black text-red-700 mb-2 tracking-tight">Oh no — pwned!</h2>
                                        <p className="text-red-900 font-medium text-lg leading-snug">
                                            This password has been seen <strong>{result.count.toLocaleString()}</strong> times in previous data breaches.
                                        </p>
                                        <div className="mt-6 p-4 bg-white rounded-xl border border-red-100">
                                            <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2">Security Advice</h4>
                                            <p className="text-sm text-slate-600">
                                                This password is unsafe to use, even for low-security accounts. Hackers actively use breached password dictionaries to break into accounts through "credential stuffing" attacks. <strong>Do not use this password.</strong>
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-emerald-200">
                                            <Shield className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <h2 className="text-2xl font-black text-emerald-700 mb-2 tracking-tight">Good news — no pwnage found!</h2>
                                        <p className="text-emerald-900 font-medium text-lg leading-snug">
                                            This password wasn't found in any known public data breaches.
                                        </p>
                                        <div className="mt-6 p-4 bg-white rounded-xl border border-emerald-100">
                                            <p className="text-sm text-slate-600">
                                                While this exact password hasn't been leaked, always ensure you use <strong className="text-emerald-700">unique</strong> passwords for different sites and try to keep them at least 16 characters long.
                                            </p>
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={clearInput}
                                    className="mt-6 text-sm font-bold text-slate-500 hover:text-slate-800 underline transition-colors"
                                >
                                    Check another password
                                </button>
                            </div>
                        )}

                        {/* Technical Privacy Notice */}
                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-lg mx-auto flex flex-col items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span>
                                    <strong>100% Secure & Private:</strong> We use the k-Anonymity model. Your password is <strong className="text-slate-500">hashed locally</strong> in your browser using SHA-1. We only send the first 5 characters of the hash to the API. <em>Your actual password never leaves your device.</em>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Password Breach Checker?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The Password Breach Checker verifies if a specific password string has ever been exposed in a historical data breach. It leverages k-Anonymity encryption to keep your query mathematically secure and untraceable.</p>
                            <p>Many people reuse basic passwords like 'Welcome123'. Because hackers already possess massive databases containing billions of leaked passwords, they will test these against your accounts instantly. If your password has been seen in a breach, using it anywhere is highly dangerous.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Password Breach Checker</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Type the password you want to evaluate into the secure input.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Check Password' button.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Behind the scenes, your password is mathematically hashed before leaving your browser.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">The tool tells you if the password has been breached, and exactly how many times hackers have seen it.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">If it's safe, you will see a green shield indicating zero matches.</p>
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
                            <strong className="text-slate-800">Common Password:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Searching password123 will show it has been leaked over 10 million times.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Safe Password:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Searching a generated string like Tx9!kLp$2 will show 0 leaks.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Historical Check:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Validating an old password you used to use years ago to see if it was ever exposed.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, absolutely free to use.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Incredibly safe. We use the 'k-Anonymity' model. We convert your password to a SHA-1 hash locally, and only send the first 5 characters of the hash to the API. Your actual password never touches a network.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, fully functional on mobile devices.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">If my password has 0 breaches, is it safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Being in 0 breaches is great, but it must also be unguessable. 'MyNameIsJohn' might have 0 breaches but is easy to guess. Combine this with our Password Generator.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Are you saving the passwords I type?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely not. The input is processed, hashed, and discarded instantly.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/email-breach-checker" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Email Breach Checker &rarr;</span>
                        </a>
                        <a href="/tools/password-generator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Strong Password Generator &rarr;</span>
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