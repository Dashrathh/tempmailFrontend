"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Shield, Search, RefreshCw, Mail, Database, Calendar, FileText, Unlock } from "lucide-react";

export default function EmailBreachChecker() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [breaches, setBreaches] = useState(null); // null means not searched, [] means safe
    const [error, setError] = useState("");

    const checkEmail = async (e) => {
        if (e) e.preventDefault();

        if (!email.trim() || !/^\\S+@\\S+\\.\\S+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError("");
        setBreaches(null);

        try {
            // Note: HIBP API requires a paid key to check emails (breachedaccount).
            const apiKey = process.env.NEXT_PUBLIC_HIBP_API_KEY || "YOUR_API_KEY";

            const res = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email.trim())}?truncateResponse=false`, {
                headers: {
                    "hibp-api-key": apiKey,
                    "user-agent": "TempMailSBS"
                }
            });

            if (res.status === 404) {
                // 404 from HIBP means the account could not be found (safe!)
                setBreaches([]);
            } else if (res.status === 401) {
                // Because this is a client-side call, if the user doesn't have an API key configured this will trigger.
                throw new Error("Invalid or missing API Key. Please configure your HaveIBeenPwned API Key.");
            } else if (res.status === 403) {
                throw new Error("Forbidden: Access denied to the HIBP API (Cross-Origin Request Blocked without proper backend proxy).");
            } else if (res.status === 429) {
                throw new Error("Rate limit exceeded. Please wait a moment and try again.");
            } else if (!res.ok) {
                throw new Error(`Failed to connect to the breach database. Error Code: ${res.status}`);
            } else {
                const data = await res.json();
                setBreaches(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearInput = () => {
        setEmail("");
        setBreaches(null);
        setError("");
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Email Data Breach Checker
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Find out if your email address has been compromised in any public data breaches. Powered by the <strong>Have I Been Pwned</strong> API.
                    </p>

                    <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10 relative overflow-hidden">

                        {/* Security Banner Ribbon */}
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-8 py-1 rotate-45 transform translate-x-[25px] translate-y-[20px] shadow-sm flex items-center gap-1">
                            <Shield className="w-3 h-3" /> API v3
                        </div>

                        {/* Search Area */}
                        <form onSubmit={checkEmail} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-500" /> Enter Email Address to Check
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="user@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-5 pr-5 py-5 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900 font-bold text-lg md:text-xl shadow-inner bg-slate-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                            >
                                {loading ? <RefreshCw className="animate-spin h-6 w-6" /> : <><Search className="h-6 w-6" /> Scan Databases</>}
                            </button>
                        </form>

                        {/* Error State */}
                        {error && (
                            <div className="mt-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex flex-col sm:flex-row items-center sm:items-start gap-3 animate-fadeIn text-center sm:text-left">
                                <AlertTriangle className="h-6 w-6 flex-shrink-0" />
                                <div className="font-semibold text-sm">
                                    <p>{error}</p>
                                    {error.includes("API Key") && (
                                        <p className="mt-2 text-xs opacity-80 text-red-700">Note to Developer: Email searches require an Active API Key from HaveIBeenPwned. Ensure `NEXT_PUBLIC_HIBP_API_KEY` is set in your .env file.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Loading State Skeleton */}
                        {loading && (
                            <div className="mt-8 border border-slate-100 bg-slate-50 rounded-2xl p-6 text-center animate-pulse flex flex-col items-center">
                                <Database className="w-8 h-8 text-blue-400 mb-3 animate-bounce" />
                                <p className="text-slate-500 font-bold">Scanning massive databases...</p>
                                <p className="text-slate-400 text-sm mt-1">Cross-referencing your email against billions of leaked records.</p>
                            </div>
                        )}

                        {/* Result Area */}
                        {breaches !== null && !loading && (
                            <div className={`mt-8 animate-fadeIn`}>
                                {breaches.length > 0 ? (
                                    <div className="rounded-2xl border bg-red-50 border-red-200 p-6 md:p-8">
                                        <div className="text-center mb-8">
                                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 border-4 border-red-200">
                                                <Unlock className="w-8 h-8 text-red-600" />
                                            </div>
                                            <h2 className="text-2xl font-black text-red-700 mb-2 tracking-tight">Oh no — pwned!</h2>
                                            <p className="text-red-900 font-medium text-lg leading-snug">
                                                This email was found in <strong>{breaches.length}</strong> data breaches.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {breaches.map((breach, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                                                    <div className="flex bg-slate-50 p-3 rounded-lg border border-slate-100 flex-shrink-0 items-center justify-center w-12 h-12 hidden sm:flex">
                                                        <AlertTriangle className="w-6 h-6 text-red-500" />
                                                    </div>
                                                    <div className="flex-grow w-full">
                                                        <h3 className="font-bold text-slate-800 text-lg flex flex-wrap items-center gap-2">
                                                            <span className="break-all">{breach.Name}</span>
                                                            <div className="flex gap-1">
                                                                {breach.IsVerified && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">Verified</span>}
                                                                {breach.IsSensitive && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase">Sensitive</span>}
                                                            </div>
                                                        </h3>

                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mt-2 mb-3 font-medium">
                                                            <div className="flex items-center gap-1"><Calendar className="w-4 h-4 text-slate-400" /> {breach.BreachDate}</div>
                                                            <div className="flex items-center gap-1"><Database className="w-4 h-4 text-slate-400" /> {breach.PwnCount?.toLocaleString()} records</div>
                                                        </div>

                                                        <div className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: breach.Description }} />

                                                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-sm">
                                                            <div className="font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                                                                <FileText className="w-4 h-4 text-rose-500" /> Compromised Data:
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {breach.DataClasses?.map((item, i) => (
                                                                    <span key={i} className="bg-white text-rose-700 border border-rose-200 text-xs px-2 py-1 rounded-md font-semibold font-mono">
                                                                        {item}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center mt-8">
                                            <button
                                                onClick={clearInput}
                                                className="text-sm font-bold text-slate-500 hover:text-slate-800 underline transition-colors"
                                            >
                                                Check another email
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border bg-emerald-50 border-emerald-200 p-6 md:p-8 text-center group">
                                        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-emerald-200 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <h2 className="text-2xl font-black text-emerald-700 mb-2 tracking-tight">Good news — stay safe!</h2>
                                        <p className="text-emerald-900 font-medium text-lg leading-snug">
                                            Your email was not found in any of the verified public data breaches.
                                        </p>
                                        <div className="mt-8 p-5 bg-white rounded-xl border border-emerald-100 shadow-sm text-left">
                                            <h4 className="font-bold text-emerald-800 mb-2 text-sm uppercase tracking-wide">Stay Protected</h4>
                                            <p className="text-sm text-slate-600">
                                                While this email hasn't been leaked in the known HIBP database, always ensure you use <strong className="text-slate-800">unique and strong passwords</strong> for different services, and enable <strong className="text-slate-800">Two-Factor Authentication (2FA)</strong> wherever possible.
                                            </p>
                                        </div>
                                        <button
                                            onClick={clearInput}
                                            className="mt-6 text-sm font-bold text-slate-500 hover:text-slate-800 underline transition-colors"
                                        >
                                            Check another email
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Data Breach?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        A data breach is a security incident where sensitive, protected, or confidential data is copied, transmitted, viewed, stolen, or used by an individual unauthorized to do so. These incidents can happen to massive companies (like LinkedIn, Adobe, or Yahoo) or smaller independent websites. When a breach happens, millions of email addresses, passwords, phone numbers, and personal details are often posted online for anyone to see or sold on the dark web.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">What should I do if my Email was "Pwned"?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Change Compromised Passwords:</strong> Look at the compromised data list above. If passwords were leaked alongside your email from a specific website, immediately change your password on that service.</li>
                        <li><strong className="text-slate-800">Stop Password Reuse:</strong> If you use the same password on multiple websites, change it everywhere. Hackers will actively try that leaked email/password combination on popular platforms like Amazon, Netflix, and online Banking systems.</li>
                        <li><strong className="text-slate-800">Enable Multi-Factor Authentication:</strong> Use 2FA on everything. This guarantees that even if a hacker has your email address and password, they cannot log into your account without physical access to your mobile phone.</li>
                        <li><strong className="text-slate-800">Watch for Phishing Scams:</strong> If your email address is part of a public breach, you should be prepared for a potential increase in spam. Attackers may send cleverly disguised "phishing" emails to try and steal more details from you.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Where does this breach data come from?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                We securely utilize the official API provided by <strong>Have I Been Pwned</strong>, an industry-standard platform operated by cybersecurity expert Troy Hunt. It acts as the internet's most comprehensive index of verified, known data breaches.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Why am I seeing strange company names I never signed up for?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Often, massive data brokers or advertising companies gather your information across the web. If <em>those</em> third-party companies get hacked, your email will appear in their leak, even if you never directly created an account with them.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Is this tool safe to use?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Yes. The search happens securely over an encrypted HTTPS connection. Your email address is sent strictly to the official API to verify its status. We do not save, track, or share the emails you check, nor do we send spam.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
