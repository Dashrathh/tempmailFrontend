"use client";

import { useState } from "react";
import Link from "next/link";

export default function LearnMoreClient() {
    const [username, setUsername] = useState("");
    const [domain] = useState("tempmail.sbs");
    const [generatedEmail, setGeneratedEmail] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerateEmail = () => {
        if (username.trim() === "") {
            const randomUsername = Math.random().toString(36).substring(2, 10);
            setGeneratedEmail(`${randomUsername}@${domain}`);
        } else {
            setGeneratedEmail(`${username}@${domain}`);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Instant Email Creation",
            description: "Generate a disposable email address in seconds without any registration or personal information required.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Complete Privacy Protection",
            description: "Keep your personal inbox safe from spam and protect your identity from tracking and data collection.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            title: "Unlimited Email Addresses",
            description: "Create as many temporary email addresses as you need for different websites and services.",
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            ),
            title: "No Expiration Limit",
            description: "Your temporary email addresses remain active as long as you need them, with no forced expiration.",
        },
    ];

    const faqs = [
        { question: "What is a temporary email?", answer: "A temporary email is a disposable email address that you can use instead of your personal email. It forwards messages to your real inbox while keeping your personal email private." },
        { question: "Is Tempmail.sbs free to use?", answer: "Yes, our service is completely free with no hidden fees. We believe in protecting your privacy without charging you for it." },
        { question: "How long do temporary emails last?", answer: "Your temporary email addresses remain active indefinitely. We don't impose expiration dates, so you can use them as long as you need." },
        { question: "Can I reply to emails from my temporary address?", answer: "Currently, our service is receive-only. You can view messages sent to your temporary address but cannot reply from it. We're working on adding reply functionality soon!" },
        { question: "Is Tempmail.sbs secure?", answer: "Absolutely. We use bank-grade encryption and never store your personal information. All emails are securely forwarded to your inbox without being stored on our servers." },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Protect Your Privacy with Temporary Emails
                            </h1>
                            <p className="text-xl text-blue-100 mb-8">
                                Keep your personal inbox spam-free and secure your identity online with our disposable email service.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition shadow-lg">
                                    Get Started
                                </Link>
                                <a href="#how-it-works" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition">
                                    How It Works
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full">
                                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Temporary Email</h2>
                                <div className="mb-6">
                                    <label className="block text-gray-200 mb-2">Choose a username (optional)</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="e.g. john123"
                                            className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
                                        />
                                        <span className="bg-gray-200 text-gray-700 px-4 py-3 rounded-r-lg">@{domain}</span>
                                    </div>
                                </div>
                                <button onClick={handleGenerateEmail} className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition mb-4">
                                    Generate Email Address
                                </button>
                                {generatedEmail && (
                                    <div className="mt-6">
                                        <label className="block text-gray-200 mb-2">Your temporary email:</label>
                                        <div className="flex">
                                            <input type="text" value={generatedEmail} readOnly className="flex-grow px-4 py-3 rounded-l-lg bg-gray-100 text-gray-800 font-mono" />
                                            <button onClick={copyToClipboard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-lg transition">
                                                {copied ? "Copied!" : "Copy"}
                                            </button>
                                        </div>
                                        <p className="text-blue-100 text-sm mt-2">
                                            This is a sample. Want real? Go to{" "}
                                            <Link href="/" className="text-white hover:underline">Home Page</Link>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Tempmail.sbs?</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our temporary email service provides the perfect solution to protect your privacy and keep your inbox clean.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div id="how-it-works" className="py-16 bg-gray-50 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Creating and using a temporary email is simple and takes just seconds.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6">
                            {[
                                { num: "1", color: "blue", title: "Create Your Temporary Email", desc: "Generate a unique email address on our platform. You can choose your own username or let us create one for you." },
                                { num: "2", color: "green", title: "Use It for Signups", desc: "Use your temporary email address when signing up for websites, services, or apps that require an email." },
                                { num: "3", color: "purple", title: "Receive Messages", desc: "Any emails sent to your temporary address will be forwarded to your real inbox. You can read them just like regular emails." },
                                { num: "4", color: "yellow", title: "Stay Protected", desc: "If you start receiving spam, simply disable the temporary email address. Your personal inbox remains clean and secure." },
                            ].map((step) => (
                                <div key={step.num} className="flex">
                                    <div className="flex-shrink-0">
                                        <div className={`w-12 h-12 rounded-full bg-${step.color}-100 flex items-center justify-center text-${step.color}-600 font-bold text-xl`}>
                                            {step.num}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full border border-gray-200">
                                <div className="space-y-4">
                                    {["Website Registration", "Online Shopping", "App Testing", "Limited-time Offers", "Contests & Giveaways"].map((item) => (
                                        <div key={item} className="bg-gray-100 p-4 rounded-lg">
                                            <div className="font-bold text-gray-700">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison */}
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tempmail.sbs vs. Personal Email</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">See how our temporary email service provides superior privacy protection</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 text-left text-gray-700 font-bold text-lg border-b">Feature</th>
                                    <th className="py-4 px-6 text-center text-blue-600 font-bold text-lg border-b">Tempmail.sbs</th>
                                    <th className="py-4 px-6 text-center text-gray-700 font-bold text-lg border-b">Personal Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["No Registration Required", "✅", "❌"],
                                    ["Protects Your Identity", "✅", "❌"],
                                    ["Blocks Spam", "✅", "❌"],
                                    ["Unlimited Addresses", "✅", "❌"],
                                    ["No Expiration", "✅", "✅"],
                                    ["Completely Free", "✅", "Depends"],
                                ].map(([feature, temp, personal]) => (
                                    <tr key={feature}>
                                        <td className="py-4 px-6 border-b">{feature}</td>
                                        <td className="py-4 px-6 text-center border-b">{temp}</td>
                                        <td className="py-4 px-6 text-center border-b">{personal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="py-16 bg-gray-50 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our temporary email service.</p>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                                <div className="font-bold text-gray-900 mb-2">{faq.question}</div>
                                <div className="text-gray-700">{faq.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect Your Inbox?</h2>
                    <p className="text-xl mb-8">Start using Tempmail.sbs today and enjoy a safer, spam-free online experience.</p>
                    <Link href="/" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition shadow-lg">
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
