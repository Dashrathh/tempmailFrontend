"use client";

import { useState, useEffect } from "react";
import { Copy, RefreshCw, CheckCircle2, Globe, MapPin, Network, Search, AlertCircle, Server, DollarSign, Clock, Phone } from "lucide-react";

export default function IPLookup() {
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [copiedContent, setCopiedContent] = useState("");

    const fetchIpInfo = async (ipToSearch = "") => {
        setLoading(true);
        setError("");
        try {
            // Using ipapi.co which is reliable and allows free usage for non-commercial clients
            const url = ipToSearch ? `https://ipapi.co/${ipToSearch}/json/` : "https://ipapi.co/json/";
            const res = await fetch(url);

            if (res.status === 429) {
                throw new Error("Rate limit exceeded. Please try again later.");
            }

            const data = await res.json();

            if (data.error) {
                throw new Error(data.reason || "Invalid IP address or not found.");
            }

            setIpData(data);
        } catch (err) {
            setError(err.message || "Failed to fetch IP information.");
            setIpData(null);
        } finally {
            setLoading(false);
        }
    };

    // On mount, fetch user's own IP
    useEffect(() => {
        fetchIpInfo();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            fetchIpInfo(searchInput.trim());
        } else {
            // If empty, fetch own IP again
            fetchIpInfo();
        }
    };

    const copyToClipboard = (text, type) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedContent(type);
        setTimeout(() => setCopiedContent(""), 2000);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-10 pb-20 px-4 sm:px-6">
            <div className="max-w-5xl w-full mx-auto space-y-12">

                {/* TOOL SECTION */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4 text-center">
                        IP Lookup & Geolocation
                    </h1>
                    <p className="text-slate-600 mb-8 text-center max-w-xl">
                        Instantly check your public IP address or lookup the geolocation, ISP, and network details of any IPv4/IPv6 address worldwide.
                    </p>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 md:p-10">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter any IP address (e.g. 8.8.8.8) or leave empty for your IP"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-700 font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-md"
                            >
                                {loading ? <RefreshCw className="animate-spin h-5 w-5" /> : "Lookup IP"}
                            </button>
                        </form>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center gap-3 mb-8 max-w-2xl mx-auto">
                                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        {loading && !ipData && (
                            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                                <RefreshCw className="h-10 w-10 animate-spin mb-4 text-blue-500" />
                                <p className="font-medium animate-pulse">Tracing IP location...</p>
                            </div>
                        )}

                        {ipData && !loading && (
                            <div className="animate-fadeIn">
                                {/* Hero IP Display */}
                                <div className="text-center mb-10 pb-10 border-b border-slate-100 relative group">
                                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                                        {!searchInput ? "Your Public IP Address" : "Lookup Results for"}
                                    </h2>
                                    <div className="flex items-center justify-center gap-4 px-4 w-full">
                                        <div className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight font-mono break-all max-w-full">
                                            {ipData.ip}
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(ipData.ip, "ip")}
                                            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors flex-shrink-0"
                                            title="Copy IP Address"
                                        >
                                            {copiedContent === "ip" ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6" />}
                                        </button>
                                    </div>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold border border-blue-100">
                                        <Globe className="w-4 h-4" /> {ipData.version}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                    {/* Left Column: Data Cards */}
                                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Location Card */}
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group transition-all hover:shadow-md hover:border-blue-200">
                                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                                <MapPin className="w-5 h-5 text-emerald-500" />
                                                <h3 className="font-bold uppercase text-xs tracking-wider">Geolocation</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5">Country</span>
                                                    <p className="font-semibold text-slate-800 text-lg flex items-center gap-2">
                                                        {ipData.country_name} <span className="text-sm font-medium text-slate-500">({ipData.country_code})</span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5">Region / City</span>
                                                    <p className="font-semibold text-slate-800 text-base">{ipData.region}, {ipData.city}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5">Postal Code</span>
                                                    <p className="font-semibold text-slate-800">{ipData.postal || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Network Provider Card */}
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group transition-all hover:shadow-md hover:border-indigo-200">
                                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                                <Network className="w-5 h-5 text-indigo-500" />
                                                <h3 className="font-bold uppercase text-xs tracking-wider">ISP / Network</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5">Internet Service Provider (ISP)</span>
                                                    <p className="font-semibold text-slate-800 text-base">{ipData.org || "Unknown"}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5">ASN (Autonomous System)</span>
                                                    <p className="font-semibold text-slate-800 font-mono text-sm">{ipData.asn || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5">Network Range</span>
                                                    <p className="font-semibold text-slate-800 font-mono text-sm">{ipData.network || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Advanced Card */}
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group transition-all hover:shadow-md hover:border-orange-200 sm:col-span-2">
                                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                                <Server className="w-5 h-5 text-orange-500" />
                                                <h3 className="font-bold uppercase text-xs tracking-wider">Advanced Metrics</h3>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Timezone</span>
                                                    <p className="font-semibold text-slate-800 text-sm">{ipData.timezone || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> UTC Offset</span>
                                                    <p className="font-semibold text-slate-800 font-mono text-sm">{ipData.utc_offset || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Currency</span>
                                                    <p className="font-semibold text-slate-800 text-sm">{ipData.currency_name || "N/A"} ({ipData.currency})</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-slate-400 block mb-0.5 flex items-center gap-1"><Phone className="w-3 h-3" /> Calling Code</span>
                                                    <p className="font-semibold text-slate-800 text-sm font-mono">{ipData.country_calling_code || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Interactive Map */}
                                    <div className="lg:col-span-1 bg-slate-50 p-2 rounded-2xl border border-slate-200 flex flex-col hover:shadow-md transition-all">
                                        <div className="px-4 py-3 flex justify-between items-center text-slate-500 border-b border-slate-200/60 mb-2">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-rose-500" />
                                                <h3 className="font-bold uppercase text-xs tracking-wider">Live Map</h3>
                                            </div>
                                            <div className="text-xs font-mono font-medium text-slate-400">
                                                {ipData.latitude}, {ipData.longitude}
                                            </div>
                                        </div>
                                        <div className="flex-grow w-full h-[250px] lg:h-full min-h-[250px] rounded-xl overflow-hidden bg-slate-100">
                                            {ipData.latitude && ipData.longitude ? (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    src={`https://maps.google.com/maps?q=${ipData.latitude},${ipData.longitude}&z=11&output=embed`}
                                                    title="IP Location Map"
                                                ></iframe>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-sm">
                                                    Map not available
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO & EDUCATIONAL SECTION */}
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is an IP Address?</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        An <strong>IP (Internet Protocol) address</strong> is a unique string of numbers separated by periods (IPv4) or colons (IPv6). It acts as a digital home address for devices connected to the internet. Every time you visit a website, send an email, or stream a video, your device uses this IP address to communicate with servers and receive data back.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">IPv4 vs IPv6: What's the difference?</h3>
                    <div className="grid md:grid-cols-2 gap-8 mt-6 mb-8 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2">IPv4 (Legacy Standard)</h4>
                            <p className="text-sm text-slate-600 leading-relaxed mb-3">Example: <code>192.168.1.1</code></p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                IPv4 uses a 32-bit address scheme allowing for roughly 4.3 billion unique addresses. Because of the massive growth of the internet, the world officially ran out of new IPv4 addresses in 2011.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2">IPv6 (Modern Standard)</h4>
                            <p className="text-sm text-slate-600 leading-relaxed mb-3">Example: <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                IPv6 uses a 128-bit address scheme, allowing for an astronomical number of IPs (340 undecillion). It allows the internet to scale infinitely as more smart devices and phones come online.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Why hide or change your IP Address?</h3>
                    <ul className="space-y-3 mb-8 text-slate-600 list-disc pl-5">
                        <li><strong className="text-slate-800">Privacy & Anonymity:</strong> Your IP address can reveal your general physical location (City/Region) and your Internet Service Provider. Using a Virtual Private Network (VPN) masks your real IP.</li>
                        <li><strong className="text-slate-800">Geo-Unblocking:</strong> Many streaming services and websites restrict content based on your country. Changing your IP via a VPN bypasses these digital borders.</li>
                        <li><strong className="text-slate-800">Security:</strong> Hiding your IP address makes it significantly harder for hackers to target your home network with DDoS attacks.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 mt-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-slate-800">Can I find someone's IP address from their Mobile Number?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No. You cannot find an IP address purely by entering a mobile number. Phone networks (Cellular) and Data networks (IPs) operate independently. Tools online that claim to "Find IP by Phone Number" are generally scams or rely on sending tracking links directly to the target device via SMS.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Can someone find my exact house from my IP?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No. A public IP address only reveals your general location (like your city or zip code) and your ISP (like Comcast or AT&T). Only your Internet Service Provider knows the exact physical residential address associated with the IP, and they securely protect this data unless ordered by a legal warrant.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Why does my IP address keep changing?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Most home networks and mobile 4G/5G connections use "Dynamic IP Addresses." This means your ISP periodically assigns you a new IP address from a pool of available numbers. Only businesses typically pay extra for "Static IP Addresses" that never change.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">Does this tool log my IP?</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                No. We respect your privacy. The IP lookup happens instantly and directly via our secure API provider, and we do not store, trace, or log the IP addresses you search for in our databases.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
