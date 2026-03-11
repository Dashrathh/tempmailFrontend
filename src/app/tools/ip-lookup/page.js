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
                    <p className="text-slate-600 mb-8 text-center max-w-xl">Instantly check your public IP address or lookup the geolocation, ISP, and network details of any IPv4/IPv6 address worldwide. Free, no signup required.</p>

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
                <article className="max-w-4xl border-t border-slate-200 pt-16 mx-auto mt-12 w-full">
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What is a IP Address Lookup?</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>An IP Lookup tool allows you to instantly discover the geographic location, Internet Service Provider (ISP), and network details associated with any public IP address. It automatically detects your current IP address when you load the page, but you can also manually search for any IPv4 or IPv6 address.</p>
                            <p>Whether you are a web developer troubleshooting networking issues, a security analyst tracking down the source of malicious traffic, or a regular user wanting to see what information your IP reveals to the websites you visit, this tool provides real-time, accurate geolocation and ASN data.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">How to Use IP Address Lookup</h2>
                        <ul className="space-y-4">

                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                1
                            </div>
                            <p className="text-slate-600 mt-1">Load the page, and your current IP address will be automatically detected and displayed.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                2
                            </div>
                            <p className="text-slate-600 mt-1">To look up a different IP, type the IPv4 or IPv6 address into the search bar.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                3
                            </div>
                            <p className="text-slate-600 mt-1">Click the 'Lookup IP' button to fetch the data.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                4
                            </div>
                            <p className="text-slate-600 mt-1">Review the interactive map, location details (City, Region, Country), and ISP provider.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                5
                            </div>
                            <p className="text-slate-600 mt-1">Use the 'Copy' button to quickly copy the IP address for your records.</p>
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
                            <strong className="text-slate-800">Your IP:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> Shows your current public IP exposed to the internet.</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">IPv4 Example:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> 8.8.8.8 (Reveals the IP belongs to Google LLC in California)</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <strong className="text-slate-800">IPv6 Example:</strong>
                            <p className="text-slate-600 mt-1 font-mono text-sm bg-slate-50 p-2 rounded"> 2001:4860:4860::8888 (Validates and maps the modern IPv6 address format)</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is this tool free?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, our IP Lookup tool is 100% free to use.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Is my data safe?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes. We respect your privacy and do not log or store the IP addresses you search for.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Does it work on mobile?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. You can look up IP addresses seamlessly on any mobile network.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Can this tool find a person's exact physical address?</h4>
                            <p className="text-slate-600 leading-relaxed">No. IP lookup tools only provide the general residential area (like City or Zip Code) and the ISP. Your exact house address remains private.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg text-slate-800 mb-2">Why does my IP show a different city?</h4>
                            <p className="text-slate-600 leading-relaxed">ISPs often route traffic through centralized data centers. It's common for an IP block to be registered in a nearby major city rather than your exact local town.</p>
                        </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Related Tools</h2>
                        <div className="grid sm:grid-cols-3 gap-4">

                        <a href="/tools/url-encoder-decoder" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">URL Encoder & Decoder &rarr;</span>
                        </a>
                        <a href="/tools/email-validator" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">Email Validator &rarr;</span>
                        </a>
                        <a href="/tools/json-formatter" className="block p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                            <span className="font-semibold text-blue-700">JSON Formatter &rarr;</span>
                        </a>
                        </div>
                    </section>
                </article>
            
            </div>
        </div>
    );
}
