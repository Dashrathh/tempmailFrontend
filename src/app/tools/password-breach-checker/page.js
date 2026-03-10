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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Find out if your password has been exposed in a data breach. Powered securely by the <strong>Have I Been Pwned</strong> database.
                    </p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What does it mean to be "Pwned"?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        In hacker culture, being <em>"pwned"</em> (pronounced like <em>owned</em>) means your data has been compromised or conquered by a malicious party. When a website gets hacked, the database of user accounts (often containing emails, usernames, and unencrypted passwords) is stolen and sold on the dark web or dumped on public forums.
                        If your password is in one of these dumps, it has been "pwned."
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">How does this tool check my password safely?</h3>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4 mb-8">
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            You might be wondering: <em>"Isn't it dangerous to type my password into a random website?"</em> Yes! Never trust random sites with your passwords. That is why our tool uses a sophisticated cryptographic technique called <strong>k-Anonymity</strong> to protect you.
                        </p>
                        <ol className="space-y-4 list-decimal pl-5 text-sm text-slate-700 font-medium">
                            <li>When you type your password, your browser instantly runs a mathematical algorithm to convert it into a 40-character <strong>SHA-1 Hash</strong>. (e.g., <code>5BAA61E...</code>)</li>
                            <li>The tool takes <strong>only the first 5 characters</strong> of that hash (e.g., <code>5BAA6</code>) and sends it to the Have I Been Pwned API.</li>
                            <li>The API answers with a list of <em>hundreds</em> of breached passwords that just happen to share the same first 5 characters.</li>
                            <li>Your browser then searches that downloaded list locally to see if the full 40-character hash matches.</li>
                        </ol>
                        <p className="text-sm border-l-4 border-emerald-500 text-emerald-700 bg-emerald-50 p-3 rounded-r-lg mt-5 font-semibold">
                            Conclusion: The API server never knows your real password, and it never even sees your full hash. It is mathematically impossible for anyone tracking your network to intercept your password.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">My password is pwned. What should I do?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-red-700">Change it immediately:</strong> Anywhere you use that exact password, log in now and change it. Hackers use automated bots to test breached passwords across thousands of popular websites like Amazon, Netflix, and Gmail.</li>
                        <li><strong className="text-slate-800">Stop reusing passwords:</strong> If one website is breached, your identical password on another website is at risk. Always use unique passwords.</li>
                        <li><strong className="text-slate-800">Use a Password Manager:</strong> Because it is impossible to memorize 50 different 16-character passwords, use tools to generate and safely store them.</li>
                        <li><strong className="text-slate-800">Turn on 2FA:</strong> Two-Factor Authentication (Using an app like Authy or Google Authenticator) ensures that even if a hacker has your password, they cannot log in without the code from your phone.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Where does this breach data come from?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                We rely on the publicly available, secure API provided by <strong>Have I Been Pwned (HIBP)</strong>, created by cybersecurity expert Troy Hunt. HIBP actively collects massive data dumps from known website breaches (such as LinkedIn, Apollo, MySpace) to help users protect themselves.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Does a "0 times" result mean my account is 100% safe?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Not necessarily. It only means that this specific password has <em>not yet</em> been found in <em>known, publicly published</em> data breaches. If a breach just happened yesterday and the data hasn't been uploaded to HIBP yet, it won't show up here.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Can I check if my Email is pwned?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Currently, our tool only checks passwords for maximum anonymity and zero tracking. Checking emails requires sending the actual email address over the network, which we avoid doing directly to maintain your ultimate privacy.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}