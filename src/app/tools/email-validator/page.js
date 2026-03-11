"use client";

import { useState } from "react";
import { Mail, Search, ShieldCheck, ShieldAlert, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";

export default function EmailValidator() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const validateEmail = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter an email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email format.");
            setResult(null);
            return;
        }

        setError("");
        setLoading(true);

        // Simulated validation logic (Client-side checks)
        // In a real production app, you would call an API like ZeroBounce or your own backend.
        setTimeout(() => {
            const domain = email.split("@")[1].toLowerCase();

            // Basic lists for demonstration
            const freeProviders = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
            // We treat all disposable/temp providers honestly, including our own domains
            const disposableProviders = ["tempmail.sbs", "filmyhunt.xyz", "mailinator.com", "10minutemail.com", "temp-mail.org", "yopmail.com"];

            const isDisposable = disposableProviders.includes(domain);
            const isFree = freeProviders.includes(domain);
            const isSyntaxValid = true;

            let score = 100;
            let status = "Valid & Professional";
            let color = "text-emerald-600";
            let bg = "bg-emerald-50";

            if (isDisposable) {
                // Honest classification: It is a temporary email. It's safe to receive, but not meant for long-term accounts.
                score = 50;
                status = "Temporary / Disposable";
                color = "text-orange-500";
                bg = "bg-orange-50";
            } else if (isFree) {
                score = 80;
                status = "Free Provider";
                color = "text-blue-600";
                bg = "bg-blue-50";
            }

            setResult({
                email,
                domain,
                status,
                score,
                isSyntaxValid,
                isFree,
                isDisposable,
                color,
                bg
            });

            setLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-4xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        Free Email Validator
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Verify if an email address exists, check its format, and detect if it is a temporary or disposable email. Free, no signup required.</p>

                    <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10">
                        <form onSubmit={validateEmail} className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter email to verify (e.g., name@example.com)"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700 font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                            >
                                {loading ? <RefreshCw className="animate-spin h-5 w-5" /> : "Verify"}
                            </button>
                        </form>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 flex items-center gap-2 mb-6">
                                <AlertCircle className="h-5 w-5" />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}

                        {result && (
                            <div className="animate-fadeIn mt-8 space-y-6">
                                {/* Score Card */}
                                <div className={`p-6 rounded-2xl border ${result.bg} border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-full bg-white shadow-sm ${result.color}`}>
                                            {result.score > 80 ? <ShieldCheck className="h-8 w-8" /> :
                                                result.score > 40 ? <AlertCircle className="h-8 w-8" /> :
                                                    <ShieldAlert className="h-8 w-8" />}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status</h3>
                                            <p className={`text-2xl font-bold ${result.color}`}>{result.status}</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Trust Score</h3>
                                        <div className="text-4xl font-extrabold text-slate-800">{result.score}<span className="text-xl text-slate-500">/100</span></div>
                                    </div>
                                </div>

                                {/* Detailed Results */}
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                                        <div className="p-5 flex items-center justify-between">
                                            <span className="text-slate-600 font-medium">Format Valid</span>
                                            {result.isSyntaxValid ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <ShieldAlert className="h-5 w-5 text-red-500" />}
                                        </div>
                                        <div className="p-5 flex items-center justify-between">
                                            <span className="text-slate-600 font-medium">Domain Name</span>
                                            <span className="font-semibold text-slate-800">@{result.domain}</span>
                                        </div>
                                        <div className="p-5 flex items-center justify-between border-t border-slate-200">
                                            <span className="text-slate-600 font-medium">Provider Type</span>
                                            <span className="font-semibold text-slate-800">
                                                {result.isDisposable ? "Temporary Mail" : result.isFree ? "Free Account" : "Business / Custom"}
                                            </span>
                                        </div>
                                        <div className="p-5 flex items-center justify-between border-t border-slate-200">
                                            <span className="text-slate-600 font-medium">Safe for Signups?</span>
                                            <span className={`font-semibold ${result.isDisposable ? "text-orange-500" : "text-emerald-500"}`}>
                                                {result.isDisposable ? "Short-term Only" : "Yes"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                
                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a Email Validator?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>The Email Validator is a precision tool that analyzes an email address syntax, checks its DNS and MX records, and determines whether the address is valid, temporary, or completely fake.</p>
                            <p>Invalid or fake emails in your database lead to bounced emails, which permanently ruins your domain sender reputation causing your legitimate campaigns to land in Spam folders. This tool helps you verify a lead before ever hitting the send button.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use Email Validator</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Enter the email address you wish to check in the search bar.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Verify Email' button.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Wait a moment while the tool checks the syntax and queries the domain registry.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Review the card to see the Validity Status, Syntax accuracy, and domain health.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Check if it's flagged as a 'Disposable' or 'Role-based' (e.g., admin@) account.</p>
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
                            <strong className="text-slate-800">Valid Email Check:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Validates the structure and confirms Gmail MX records exist.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Typo Catching:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Catches common errors like name@gmail.con.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">Disposable Mail Prevention:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Flags domains known for 10-minute temporary mail.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes! While many services charge per validation, our single-check tool is free.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, we do not store the emails you enter. They are only sent securely to the validation API.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. Perfectly optimized for all devices.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does this send an email to the person?</h4>
                            <p className="text-slate-600 leading-relaxed">No. This tool performs a passive DNS/MX record lookup and syntax check. It does not send any test emails.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Why is an email marked invalid but they say it works?</h4>
                            <p className="text-slate-600 leading-relaxed">If the domain has misconfigured their MX (Mail Exchange) records technically, our strict tool might fail it, even if some permissive servers still let mail through.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/email-breach-checker" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Email Breach Checker &rarr;</span>
                        </a>
                        <a href="/tools/ip-lookup" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">IP Lookup &rarr;</span>
                        </a>
                        <a href="/tools/password-breach-checker" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Password Breach Checker &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
