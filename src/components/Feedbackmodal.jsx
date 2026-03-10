"use client";

import { useState } from "react";
import { API } from "@/utils/api";

export default function FeedbackModal({ onClose, emailState }) {
    const [feedbackType, setFeedbackType] = useState("");
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const feedbackTypes = [
        { value: "love", emoji: "❤️", label: "I love it!" },
        { value: "suggestion", emoji: "💡", label: "Suggestion" },
        { value: "bug", emoji: "🐛", label: "Bug Report" },
        { value: "other", emoji: "💬", label: "Other" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedbackType) {
            alert("Please select a feedback type");
            return;
        }

        setLoading(true);

        try {
            const feedbackData = {
                type: "manual_feedback",
                feedbackType,
                rating: rating || null,
                message: message.trim(),
                email: email.trim() || "anonymous",
                emailState: {
                    generated: emailState.generated,
                    received: emailState.received,
                    opened: emailState.opened,
                },
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
            };

            const response = await API.post("/feedback", feedbackData);

            if (response.data.success) {
                setSubmitted(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Error submitting feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 text-center max-w-sm">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✓</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Thank You!</h2>
                    <p className="text-gray-600">Your feedback helps us improve.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#111827] text-white px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-bold">Share Feedback</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl leading-none font-light hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Feedback Type */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-700">
                            What&apos;s your feedback about?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {feedbackTypes.map((type) => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setFeedbackType(type.value)}
                                    className={`p-3 rounded-lg border-2 transition ${feedbackType === type.value
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{type.emoji}</div>
                                    <div className="text-xs font-medium">{type.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rating (if love selected) */}
                    {feedbackType === "love" && (
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-gray-700">
                                How much?
                            </label>
                            <div className="flex gap-2 justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-3xl transition ${rating >= star ? "opacity-100 scale-110" : "opacity-40"
                                            }`}
                                    >
                                        ⭐
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Tell us more (optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your feedback..."
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            maxLength="500"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                            {message.length}/500
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Your email (optional)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            We&apos;ll reply if you have questions
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={!feedbackType || loading}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${feedbackType && !loading
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {loading ? "Sending..." : "Send Feedback"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
