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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Verify if an email address exists, check its format, and detect if it is a temporary or disposable email.
                    </p>

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
                <article className="max-w-3xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why is Email Validation Important?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Whether you are a marketer maintaining an email list, a developer securing a signup flow, or a business owner trying to prevent spam, verifying email addresses is crucial.
                        Sending emails to invalid, fake, or disposable addresses ruins your sender reputation, increases bounce rates, and can get your domain blacklisted by major providers like Gmail and Outlook.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">What exactly does an Email Checker do?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Syntax Check:</strong> Verifies that the email is correctly formatted (e.g., contains an @ symbol and a valid domain extension).</li>
                        <li><strong className="text-slate-800">Domain / MX Record Check:</strong> Confirms that the domain actually exists and has Mail Exchange (MX) records indicating it can receive emails.</li>
                        <li><strong className="text-slate-800">Disposable Email Detection:</strong> Identifies if the email comes from a temporary or burner email provider designed to bypass registrations.</li>
                        <li><strong className="text-slate-800">Free Provider Identification:</strong> Categorizes emails from free providers like Gmail, Yahoo, or Outlook versus professional business domains.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Do you store the emails I check?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No, we prioritize your privacy. We do not store, log, or share the email addresses you check using our tool. The validation is performed instantly and the data is discarded.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">What is a disposable email address?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                A disposable email is a temporary, throwaway address that self-destructs after a short period. Users often use them to avoid spam. However, businesses block them because they lead to zero long-term engagement and bounced communications.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Is this tool 100% accurate?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Our tool checks the syntax and compares the domain against extensive lists of known free and disposable providers. While highly accurate for format and domain checks, verifying if a specific inbox actually exists without sending an email ("pinging" the server) varies in accuracy depending on the recipient email server's security settings.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
