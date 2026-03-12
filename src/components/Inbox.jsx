"use client";

import { useEffect, useState, useRef } from "react";
import { API } from "@/utils/api";
import WhatIsTempMail from "./WhatIsTempMail";
import DOMPurify from "dompurify";
import FeedbackModal from "./Feedbackmodal";

// 160x600 Side Banner Component
function SideBanner() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const optScript = document.createElement("script");
        optScript.innerHTML = `
            atOptions = {
                'key': '76212000070ff546cb6508fde55a2673',
                'format': 'iframe',
                'height': 600,
                'width': 160,
                'params': {}
            };
        `;
        const invokeScript = document.createElement("script");
        invokeScript.src = "https://www.highperformanceformat.com/76212000070ff546cb6508fde55a2673/invoke.js";
        invokeScript.async = true;

        ref.current.appendChild(optScript);
        ref.current.appendChild(invokeScript);
    }, []);

    return <div ref={ref} className="w-[160px] h-[600px]" />;
}

export default function Inbox() {
    const [inbox, setInbox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [emailState, setEmailState] = useState({
        generated: false,
        received: false,
        opened: false,
    });

    const formatEmailBody = (text) => {
        return DOMPurify.sanitize(text);
    };

    const fetchInbox = async () => {
        const email = localStorage.getItem("email");
        if (!email) return;

        try {
            setLoading(true);
            const { data: response } = await API.get(`/inbox/${email}`);
            if (response) {
                setInbox(response.data || []);
                if (response.data?.length > 0 && !emailState.received) {
                    setEmailState((prev) => ({ ...prev, received: true }));
                }
            }
        } catch (error) {
            if (error?.statusCode === 404) {
                setInbox([]);
            } else {
                console.error("Error while fetching inbox mail", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            setEmailState((prev) => ({ ...prev, generated: true }));
        }
    }, []);

    useEffect(() => {
        if (emailState.received && !showFeedback) {
            // Optional: Auto-show feedback after email arrives
        }
    }, [emailState.received, showFeedback]);

    useEffect(() => {
        fetchInbox();
        const interval = setInterval(fetchInbox, 5000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
        setEmailState((prev) => ({ ...prev, opened: true }));
    };

    const handleFeedbackClick = (e) => {
        e.stopPropagation();
        setShowFeedback(true);
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 px-4 py-6">

            {/* 3-column: LEFT AD | INBOX | RIGHT AD */}
            <div className="flex items-start justify-center gap-4 w-full">

                {/* LEFT AD — Desktop only */}
                <div className="hidden xl:flex flex-col items-center sticky top-8 min-w-[160px]">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Ad</p>
                    <SideBanner />
                </div>

                {/* INBOX CONTENT */}
                <div className="w-full max-w-3xl flex flex-col">
                    <div className="bg-white rounded-md shadow-md h-[500px] overflow-y-auto relative">

                        {selectedEmail ? (
                            <div className="p-6">
                                <button
                                    onClick={() => setSelectedEmail(null)}
                                    className="mb-4 text-blue-600 hover:underline font-medium"
                                >
                                    ← Back to Inbox
                                </button>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="relative size-12 sm:size-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-sm flex items-center justify-center">
                                            {selectedEmail.from ? (
                                                <span className="text-xl font-medium text-gray-700 uppercase">
                                                    {selectedEmail.from
                                                        .split("<")[0]
                                                        .trim()
                                                        .split(/\s+/)
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .slice(0, 2)}
                                                </span>
                                            ) : (
                                                <svg className="w-6 h-6 text-gray-400" />
                                            )}
                                            <div className="absolute inset-0 rounded-full shadow-inner" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-sm font-semibold">
                                                {selectedEmail.from.split("<")[0]}
                                            </div>
                                            <div className="text-sm">
                                                {selectedEmail.from
                                                    .split("<")[1]
                                                    ?.replace("<", "")
                                                    ?.replace(">", "")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block">
                                        <div className="text-lg">Date</div>
                                        <div className="text-sm">
                                            {selectedEmail.date?.split("+")[0]}
                                        </div>
                                    </div>
                                </div>

                                {selectedEmail.subject && (
                                    <div className="block text-sm my-2 border p-2">
                                        Subject: {selectedEmail.subject}
                                    </div>
                                )}

                                <div
                                    className="max-w-none block size-full relative overflow-hidden overflow-y-auto"
                                    dangerouslySetInnerHTML={{
                                        __html: formatEmailBody(selectedEmail.html),
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                {/* Inbox Header */}
                                <div className="bg-[#111827] text-white px-4 py-3 font-semibold text-lg relative">
                                    <div className="flex items-center justify-between">
                                        <span>Inbox ({inbox.length})</span>
                                        <button
                                            onClick={handleFeedbackClick}
                                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-medium shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            <span className="group-hover:rotate-12 transition-transform duration-300">💬</span>
                                            <span>Feedback</span>
                                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
                                        </button>
                                    </div>
                                </div>

                                {/* Column Headers */}
                                <div className="bg-gray-200 px-4 py-2 font-semibold grid grid-cols-3 text-sm border-b border-gray-300">
                                    <span>SENDER</span>
                                    <span>SUBJECT</span>
                                    <span className="text-center">VIEW</span>
                                </div>

                                {/* Email List */}
                                {loading ? (
                                    <div className="p-4 space-y-4 animate-pulse duration-700">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="grid grid-cols-3 items-center px-4 py-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                </div>
                                                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                                <div className="h-6 bg-gray-200 rounded w-12 mx-auto"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : inbox.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">
                                        Waiting for incoming emails...
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {inbox.map((email, i) => (
                                            <div
                                                key={i}
                                                className="grid grid-cols-3 items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
                                                onClick={() => handleEmailClick(email)}
                                            >
                                                <div className="font-medium truncate">
                                                    {email.from ? email.from.split("<")[0] : "Unknown Sender"}
                                                </div>
                                                <div className="text-sm text-gray-600 truncate">
                                                    {email.subject}
                                                </div>
                                                <div className="text-center text-blue-600 hover:underline text-sm">
                                                    View
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT AD — Desktop only */}
                <div className="hidden xl:flex flex-col items-center sticky top-8 min-w-[160px]">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Ad</p>
                    <SideBanner />
                </div>

            </div>

            {/* Feedback Modal */}
            {showFeedback && (
                <FeedbackModal
                    onClose={() => setShowFeedback(false)}
                    emailState={emailState}
                />
            )}

            <WhatIsTempMail />
        </div>
    );
}