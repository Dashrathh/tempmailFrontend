"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/utils/api";
import {
    Send,
    ArrowLeft,
    Shield,
    Eye,
    EyeOff,
    Copy,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Paperclip,
    Clock,
    Lock,
    HelpCircle,
    TrendingUp,
    Zap,
    Globe,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const domains = ["@tempmail.sbs", "@filmyhunt.xyz"];

export default function SendMail() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fromUser: "",
        to: "",
        subject: "",
        message: "",
    });

    const [selectedDomain, setSelectedDomain] = useState("@tempmail.sbs");
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    const generateUsername = () => {
        const adjectives = ["quick", "silent", "mystic", "secure", "hidden"];
        const nouns = ["fox", "shadow", "guard", "phoenix", "nomad"];
        return (
            adjectives[Math.floor(Math.random() * adjectives.length)] +
            nouns[Math.floor(Math.random() * nouns.length)] +
            Math.floor(Math.random() * 999)
        );
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === "message") setCharCount(value.length);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            toast.error("Maximum 5 attachments allowed");
            return;
        }
        setAttachments(files);
        toast.success(`${files.length} file(s) added`);
    };

    const removeFile = (index) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
        toast.success("File removed");
    };

    const copyToClipboard = () => {
        const email = `${formData.fromUser}${selectedDomain}`;
        navigator.clipboard.writeText(email).then(() => {
            toast.success("Email copied to clipboard!");
        });
    };

    const validateForm = () => {
        if (!formData.fromUser.trim()) {
            toast.error("From email is required");
            return false;
        }
        if (!formData.to.trim()) {
            toast.error("Recipient email is required");
            return false;
        }
        if (!formData.message.trim()) {
            toast.error("Message cannot be empty");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.to)) {
            toast.error("Please enter a valid recipient email");
            return false;
        }
        return true;
    };

    const handleSend = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const form = new FormData();

            form.append("inboxEmail", `${formData.fromUser}${selectedDomain}`);
            form.append("to", formData.to);
            form.append("subject", formData.subject || "(No subject)");
            form.append("message", formData.message);

            attachments.forEach((file) => {
                form.append("attachments", file);
            });

            await API.post("/sendmail", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess(true);
            toast.success("Email sent successfully! 🎉");

            setTimeout(() => {
                setFormData({ fromUser: "", to: "", subject: "", message: "" });
                setAttachments([]);
                setCharCount(0);
                setSuccess(false);
            }, 1500);
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Failed to send email";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const senderEmail = `${formData.fromUser || "your-email"}${selectedDomain}`;

    const faqs = [
        {
            q: "How do I send an anonymous email for free?",
            a: 'Just enter any username, choose a domain (@tempmail.sbs or @filmyhunt.xyz), type your message and hit Send. No signup, no registration — done in seconds.',
        },
        {
            q: "Can I send an email without revealing my identity?",
            a: "Yes! TempMail.sbs generates a disposable email address that completely hides your real identity. The recipient cannot trace the email back to you.",
        },
        {
            q: "Is TempMail.sbs safe and private to use?",
            a: "Absolutely. We store zero personal data, no IP logs, and all inboxes are auto-deleted after use. Your privacy is our top priority.",
        },
        {
            q: "Can I attach files to anonymous emails?",
            a: "Yes — you can attach up to 5 files per email, completely free. Supported formats include documents, images, PDFs and more.",
        },
        {
            q: "What is a temporary or disposable email address?",
            a: "A temporary email is a one-time email address you can use to send or receive emails without exposing your real email account. It auto-expires after use.",
        },
        {
            q: "Who uses anonymous email senders?",
            a: "Whistleblowers, journalists, privacy-conscious users, people avoiding spam, developers testing email systems, and anyone who wants to communicate without leaving a digital footprint.",
        },
    ];

    const features = [
        {
            icon: <Zap size={22} className="text-yellow-400" />,
            title: "Instant & Free",
            desc: "Send anonymous emails in seconds. No account, no credit card, no waiting.",
            border: "border-yellow-500/20",
            bg: "bg-yellow-500/5",
        },
        {
            icon: <Shield size={22} className="text-emerald-400" />,
            title: "100% Anonymous",
            desc: "Your real identity stays hidden. Zero logs, zero tracking, zero traces.",
            border: "border-emerald-500/20",
            bg: "bg-emerald-500/5",
        },
        {
            icon: <Paperclip size={22} className="text-blue-400" />,
            title: "File Attachments",
            desc: "Attach up to 5 files per email — documents, images, PDFs and more.",
            border: "border-blue-500/20",
            bg: "bg-blue-500/5",
        },
        {
            icon: <Globe size={22} className="text-purple-400" />,
            title: "Multiple Domains",
            desc: "Choose from @tempmail.sbs or @filmyhunt.xyz for your disposable sender address.",
            border: "border-purple-500/20",
            bg: "bg-purple-500/5",
        },
    ];

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#1e293b",
                        color: "#f1f5f9",
                        border: "1px solid #334155",
                        borderRadius: "0.75rem",
                        fontSize: "0.875rem",
                    },
                    success: {
                        duration: 3000,
                        style: { borderColor: "#10b981", background: "#065f46" },
                    },
                    error: {
                        duration: 3000,
                        style: { borderColor: "#ef4444", background: "#7f1d1d" },
                    },
                }}
            />

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 text-white">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 font-medium"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT - COMPOSE SECTION */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 backdrop-blur-md shadow-xl">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                            Compose Email
                                        </h1>
                                        <p className="text-sm text-slate-400">
                                            Send emails anonymously with a temporary inbox
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setPreviewMode(!previewMode)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all font-medium"
                                    >
                                        {previewMode ? (
                                            <>
                                                <EyeOff size={16} /> Edit
                                            </>
                                        ) : (
                                            <>
                                                <Eye size={16} /> Preview
                                            </>
                                        )}
                                    </button>
                                </div>

                                {!previewMode ? (
                                    <>
                                        {/* FROM FIELD */}
                                        <div className="mb-6">
                                            <label className="text-sm font-semibold text-slate-300 mb-2 block">
                                                From <span className="text-red-400">*</span>
                                            </label>
                                            <div className="flex gap-3">
                                                <div className="flex-1 relative">
                                                    <input
                                                        value={formData.fromUser}
                                                        onChange={(e) =>
                                                            handleChange("fromUser", e.target.value)
                                                        }
                                                        placeholder="Enter username"
                                                        className="w-full px-4 py-3 pr-40 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-colors placeholder:text-slate-500"
                                                    />
                                                    <select
                                                        value={selectedDomain}
                                                        onChange={(e) => setSelectedDomain(e.target.value)}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-700 text-sm text-slate-300 font-medium focus:outline-none cursor-pointer rounded px-1 py-1"
                                                    >
                                                        {domains.map((d) => (
                                                            <option
                                                                key={d}
                                                                value={d}
                                                                className="bg-slate-800"
                                                            >
                                                                {d}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleChange("fromUser", generateUsername())
                                                    }
                                                    className="px-4 py-3 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all font-medium"
                                                    title="Generate random username"
                                                >
                                                    <RefreshCw size={18} />
                                                </button>
                                                <button
                                                    onClick={copyToClipboard}
                                                    disabled={!formData.fromUser}
                                                    className="px-4 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                                                    title="Copy email to clipboard"
                                                >
                                                    <Copy size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* TO FIELD */}
                                        <div className="mb-6">
                                            <label className="text-sm font-semibold text-slate-300 mb-2 block">
                                                To <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="recipient@example.com"
                                                value={formData.to}
                                                onChange={(e) => handleChange("to", e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-colors placeholder:text-slate-500"
                                            />
                                        </div>

                                        {/* SUBJECT FIELD */}
                                        <div className="mb-6">
                                            <label className="text-sm font-semibold text-slate-300 mb-2 block">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Email subject (optional)"
                                                value={formData.subject}
                                                onChange={(e) =>
                                                    handleChange("subject", e.target.value)
                                                }
                                                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-colors placeholder:text-slate-500"
                                            />
                                        </div>

                                        {/* MESSAGE FIELD */}
                                        <div className="mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-sm font-semibold text-slate-300">
                                                    Message <span className="text-red-400">*</span>
                                                </label>
                                                <span className="text-xs text-slate-400">
                                                    {charCount} / 5000
                                                </span>
                                            </div>
                                            <textarea
                                                rows={8}
                                                value={formData.message}
                                                onChange={(e) =>
                                                    handleChange("message", e.target.value)
                                                }
                                                maxLength={5000}
                                                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:border-cyan-500 focus:outline-none transition-colors resize-none placeholder:text-slate-500"
                                                placeholder="Write your message here..."
                                            />
                                        </div>

                                        {/* ATTACHMENTS */}
                                        <div className="mb-6">
                                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                                                <Paperclip size={16} /> Attachments (Max 5)
                                            </label>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileChange}
                                                className="mb-3 text-sm text-slate-400 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-all cursor-pointer"
                                            />
                                            {attachments.length > 0 && (
                                                <div className="space-y-2">
                                                    {attachments.map((file, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex justify-between items-center p-3 bg-slate-800/30 border border-slate-700 rounded-lg"
                                                        >
                                                            <span className="text-sm text-slate-300">
                                                                📎 {file.name}
                                                            </span>
                                                            <button
                                                                onClick={() => removeFile(i)}
                                                                className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {error && (
                                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-3">
                                                <AlertCircle
                                                    size={18}
                                                    className="flex-shrink-0 mt-0.5"
                                                />
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        {success && (
                                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-start gap-3">
                                                <CheckCircle
                                                    size={18}
                                                    className="flex-shrink-0 mt-0.5"
                                                />
                                                <span>Email sent successfully!</span>
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => router.back()}
                                                className="flex-1 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSend}
                                                disabled={loading}
                                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="animate-spin">⏳</div> Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={18} /> Send Email
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                                            <div>
                                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                                                    From
                                                </p>
                                                <p className="text-base font-semibold text-cyan-400">
                                                    {senderEmail}
                                                </p>
                                            </div>
                                            <div className="border-t border-slate-700 pt-4">
                                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                                                    To
                                                </p>
                                                <p className="text-base font-semibold text-slate-200">
                                                    {formData.to || "Not specified"}
                                                </p>
                                            </div>
                                            <div className="border-t border-slate-700 pt-4">
                                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                                                    Subject
                                                </p>
                                                <p className="text-base font-semibold text-slate-200">
                                                    {formData.subject || "(No subject)"}
                                                </p>
                                            </div>
                                            <div className="border-t border-slate-700 pt-4">
                                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                                                    Message
                                                </p>
                                                <div className="bg-slate-900/50 border border-slate-700 rounded p-4 max-h-96 overflow-y-auto">
                                                    <p className="text-sm text-slate-300 whitespace-pre-wrap">
                                                        {formData.message || "(No message)"}
                                                    </p>
                                                </div>
                                            </div>
                                            {attachments.length > 0 && (
                                                <div className="border-t border-slate-700 pt-4">
                                                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                                                        Attachments ({attachments.length})
                                                    </p>
                                                    <div className="space-y-2">
                                                        {attachments.map((file, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-2 text-sm text-slate-300"
                                                            >
                                                                <Paperclip
                                                                    size={14}
                                                                    className="text-slate-400"
                                                                />
                                                                {file.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => setPreviewMode(false)}
                                                className="flex-1 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-medium"
                                            >
                                                Back to Edit
                                            </button>
                                            <button
                                                onClick={handleSend}
                                                disabled={loading}
                                                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="animate-spin">⏳</div> Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={18} /> Send Email
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="text-emerald-400" size={24} />
                                    <h3 className="text-lg font-bold text-emerald-400">
                                        Security
                                    </h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                        <span>Temporary inbox with auto deletion</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                        <span>No personal data stored</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                        <span>End-to-end privacy guaranteed</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="text-blue-400" size={24} />
                                    <h3 className="text-lg font-bold text-blue-400">Tips</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold">•</span>
                                        <span>Use the Generate button for random usernames</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold">•</span>
                                        <span>Preview your email before sending</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold">•</span>
                                        <span>Attachments limited to 5 files per email</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lock className="text-purple-400" size={24} />
                                    <h3 className="text-lg font-bold text-purple-400">Privacy</h3>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Your emails are completely anonymous. No tracking, no logs,
                                    and complete privacy from start to finish.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SEO SECTION */}
                    <div className="mt-16 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-slate-900/0 p-8 backdrop-blur-md">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    📬 Send Anonymous Email — Free, Instant, No Sign Up
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                                    TempMail.sbs is the fastest way to send an anonymous email
                                    online without registration. Whether you need to send a
                                    private message, report something confidentially, or simply
                                    protect your real identity — our disposable email sender has
                                    you covered.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-sm whitespace-nowrap">
                                <TrendingUp size={18} />
                                Trusted by 1000+ users
                            </div>
                        </div>
                    </div>

                    {/* FEATURE CARDS */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`rounded-xl border ${f.border} ${f.bg} p-5 backdrop-blur-md`}
                            >
                                <div className="mb-3">{f.icon}</div>
                                <h3 className="text-white font-semibold text-sm mb-1">
                                    {f.title}
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* WHO USES IT */}
                    <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-8 backdrop-blur-md">
                        <h2 className="text-xl font-bold text-white mb-2">
                            Who Uses Anonymous Email Senders?
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            TempMail.sbs is used by thousands of privacy-conscious people
                            around the world every day.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                {
                                    emoji: "🕵️",
                                    label: "Whistleblowers",
                                    desc: "Report issues without risk",
                                },
                                {
                                    emoji: "📰",
                                    label: "Journalists",
                                    desc: "Protect sources & contacts",
                                },
                                {
                                    emoji: "👨‍💻",
                                    label: "Developers",
                                    desc: "Test email systems safely",
                                },
                                {
                                    emoji: "🛡️",
                                    label: "Privacy Users",
                                    desc: "Avoid spam & data leaks",
                                },
                                {
                                    emoji: "🛒",
                                    label: "Online Shoppers",
                                    desc: "Skip marketing emails",
                                },
                                {
                                    emoji: "🌐",
                                    label: "Anyone",
                                    desc: "Who values online privacy",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
                                >
                                    <span className="text-2xl">{item.emoji}</span>
                                    <div>
                                        <p className="text-white font-semibold text-sm">
                                            {item.label}
                                        </p>
                                        <p className="text-slate-400 text-xs">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ SECTION */}
                    <div className="mt-8 rounded-2xl border border-slate-700/50 bg-slate-900/40 p-8 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <HelpCircle size={22} className="text-cyan-400" />
                            <h2 className="text-xl font-bold text-white">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="border border-slate-700/50 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left bg-slate-800/30 hover:bg-slate-800/60 transition-colors"
                                    >
                                        <span className="text-sm font-semibold text-slate-200 pr-4">
                                            {faq.q}
                                        </span>
                                        <span
                                            className={`text-cyan-400 text-lg font-bold transition-transform flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}
                                        >
                                            +
                                        </span>
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-5 py-4 bg-slate-900/30 border-t border-slate-700/30">
                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM SEO KEYWORDS BLOCK */}
                    <div className="mt-8 rounded-2xl border border-slate-700/30 bg-slate-900/20 p-6">
                        <h2 className="text-base font-semibold text-slate-300 mb-3">
                            Why TempMail.sbs is the Best Anonymous Email Sender
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Looking for a free anonymous email sender with no registration?
                            TempMail.sbs offers instant disposable email addresses so you can
                            send anonymous emails online without revealing your real identity.
                            Unlike other temporary email services, we support file
                            attachments, multiple domains, and guarantee zero data retention.
                            Whether you need to send a burner email, a private email without
                            login, or a one-time anonymous message — TempMail.sbs is the
                            fastest, most secure, and completely free solution. No sign up. No
                            spam. Just privacy.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {[
                                "anonymous email sender",
                                "temporary email",
                                "disposable email",
                                "send email without registration",
                                "burner email",
                                "fake email sender",
                                "private email sender",
                                "free anonymous email",
                                "no signup email",
                                "send email anonymously",
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
