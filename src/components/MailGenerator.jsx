"use client";

import { useEffect, useState, useRef } from "react";
import { API } from "@/utils/api";
import QRCode from "qrcode";

export default function EmailGenerator() {
    const [mail, setMail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [customLoading, setCustomLoading] = useState(false);
    const inputRef = useRef(null);
    const customInputRef = useRef(null);
    const [customMail, setCustomMail] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [showQR, setShowQR] = useState(false);

    const [selectedDomain, setSelectedDomain] = useState("tempmail.sbs");
    const domains = ["tempmail.sbs", "filmyhunt.xyz"];

    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMsg(""), 4000);
    };
    const fetchMailDetails = async (regenerate = false) => {
        if (regenerate) {
            localStorage.removeItem("email");
        }

        const emailExists = localStorage.getItem("email");

        if (emailExists) {
            setMail(emailExists);
        } else {
            try {
                setLoading(true);
                const { data: response } = await API.get(`/generate`);
                if (response?.data) {
                    setMail(response.data);
                    localStorage.setItem("email", response.data);
                } else {
                    showError("Unexpected response from server. Please try again.");
                }
            } catch (error) {
                console.error("Error while fetching mail", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle both QR scan (URL parameter) and normal loading
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailFromUrl = urlParams.get("email");

        if (emailFromUrl) {
            setMail(emailFromUrl);
            localStorage.setItem("email", emailFromUrl);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            fetchMailDetails();
        }
    }, []);

    // Generate QR Code whenever mail changes
    useEffect(() => {
        if (mail && mail !== "Generating...") {
            generateQRCode(mail);
        }
    }, [mail]);

    const generateQRCode = async (email) => {
        try {
            const websiteUrl = `https://tempmail.sbs/?email=${encodeURIComponent(email)}`;
            const url = await QRCode.toDataURL(websiteUrl, {
                width: 200,
                margin: 2,
                color: {
                    dark: "#1e40af",
                    light: "#ffffff",
                },
            });
            setQrCodeUrl(url);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    const copyToClipboard = (text, ref) => {
        navigator.clipboard.writeText(text);
        if (ref.current) {
            ref.current.focus();
            ref.current.select();
        }
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    const downloadQRCode = () => {
        const link = document.createElement("a");
        link.download = `tempmail-qr-${mail}.png`;
        link.href = qrCodeUrl;
        link.click();
    };

    // Custom Mail
    const generateCustomMail = async () => {
        if (!customMail) {
            showError("Please enter a username for your custom email.");
            return;
        }
        try {
            setCustomLoading(true);
            const { data: response } = await API.post(`/custom`, {
                username: customMail,
                domain: selectedDomain,
            });

            if (response?.data) {
                localStorage.setItem("email", response.data);
                setMail(response.data);
            } else {
                showError("Unexpected response from server. Please try again.");
            }
        } catch (error) {
            console.error("Error while creating custom mail", error);
            showError(error?.message || "Failed to create custom email. Please try again.");
        } finally {
            setCustomLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-16 px-4 flex flex-col items-center">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
                    Free Temporary Email
                </h1>

                <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
                    Generate a disposable email address instantly to protect your privacy
                    and keep your primary inbox free from spam.
                </p>
            </div>

            <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700 max-w-4xl w-full space-y-8 relative">
                {/* Notification */}
                {showNotification && (
                    <div className="animate-fade-in-down absolute top-4 right-4 bg-emerald-600/90 text-white px-4 py-2 rounded-lg text-sm shadow-md z-50">
                        Copied to clipboard!
                    </div>
                )}

                {errorMsg && (
                    <div className="animate-fade-in-down absolute top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-red-600/90 text-white px-4 py-2 rounded-lg text-sm shadow-md z-50">
                        ⚠️ {errorMsg}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Random Email Section */}
                    <div className="space-y-6 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                        <h2 className="text-xl font-semibold text-blue-300">
                            Random Email
                        </h2>
                        <div className="flex flex-col gap-4">
                            {/* Email Input with QR Button */}
                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        value={loading ? "Generating..." : mail}
                                        readOnly
                                        className="w-full bg-gray-800 text-blue-100 font-mono text-lg p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-20"
                                        onFocus={(e) => e.target.select()}
                                    />

                                    <button
                                        onClick={() => copyToClipboard(mail, inputRef)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-2 rounded-lg shadow-md transition-all duration-200 group"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>

                                        <span className="absolute left-1/2 -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                                            Copy to clipboard
                                        </span>
                                    </button>
                                </div>

                                {/* QR Code Toggle Button */}
                                {mail && !loading && (
                                    <button
                                        onClick={() => setShowQR(!showQR)}
                                        className="w-full bg-gray-700/50 hover:bg-gray-700 text-blue-300 font-medium px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 border border-gray-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                            />
                                        </svg>
                                        {showQR ? "Hide" : "Show"} QR Code
                                    </button>
                                )}

                                {/* QR Code Display */}
                                {showQR && qrCodeUrl && (
                                    <div className="bg-white p-4 rounded-xl animate-fade-in space-y-3">
                                        <div className="flex justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={qrCodeUrl}
                                                alt="QR Code"
                                                className="rounded-lg shadow-lg"
                                            />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <p className="text-gray-700 text-sm font-medium">
                                                Scan to open on mobile
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                Opens tempmail.sbs with your email
                                            </p>
                                            <button
                                                onClick={downloadQRCode}
                                                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-2 mx-auto"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                    />
                                                </svg>
                                                Download QR Code
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => fetchMailDetails(true)}
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-800 via-blue-500 to-indigo-500 bg-[length:300%_300%] animate-gradient-x text-white font-medium px-6 py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Generating...
                                    </>
                                ) : (
                                    "Generate New Email"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Custom Email Section */}
                    <div className="space-y-6 p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                        <h2 className="text-xl font-semibold text-blue-300">
                            Custom Email
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="relative size-full flex flex-col md:flex-row items-center rounded-lg border border-gray-600 bg-gray-800 text-blue-100">
                                <input
                                    ref={customInputRef}
                                    type="text"
                                    value={customLoading ? "Generating..." : customMail}
                                    onChange={(e) => setCustomMail(e.target.value)}
                                    disabled={customLoading}
                                    className="w-full font-mono bg-transparent text-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue- pr-0 md:pr-20"
                                    placeholder="your name"
                                />
                                <select
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    className="self-stretch md:self-auto p-3 bg-gray-800 text-gray-400 border-l border-gray-600 focus:outline-none"
                                >
                                    {domains.map((d) => (
                                        <option key={d} value={d}>
                                            @{d}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={generateCustomMail}
                                disabled={customLoading}
                                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:300%_300%] animate-gradient-x text-white font-medium px-6 py-3 rounded-lg transition-all disabled:opacity-50"
                            >
                                {customLoading ? (
                                    <>
                                        <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating...
                                    </>
                                ) : (
                                    "Create Custom Email"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-4 text-center mt-8">
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        <h3 className="text-blue-400 font-medium">Secure</h3>
                        <p className="text-sm text-gray-400 mt-1">End-to-end encryption</p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        <h3 className="text-blue-400 font-medium">Anonymous</h3>
                        <p className="text-sm text-gray-400 mt-1">
                            No personal data collected
                        </p>
                    </div>
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        <h3 className="text-blue-400 font-medium">Temporary</h3>
                        <p className="text-sm text-gray-400 mt-1">Auto-deletes in 1h</p>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-sm text-gray-400 mt-8 leading-relaxed">
                    Protect your online privacy with temporary, secure email addresses.
                    <br />
                    No registration required • Completely anonymous • Free forever
                </p>
            </div>
        </div>
    );
}
