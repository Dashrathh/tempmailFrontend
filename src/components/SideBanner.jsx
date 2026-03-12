// SideBanner.jsx — shared component, isolated scope fix
"use client";

import { useEffect, useRef } from "react";

export default function SideBanner() {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        // Create isolated iframe to avoid atOptions conflict
        const iframe = document.createElement("iframe");
        iframe.style.width = "160px";
        iframe.style.height = "600px";
        iframe.style.border = "none";
        iframe.scrolling = "no";
        ref.current.appendChild(iframe);

        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
            <head><style>body{margin:0;padding:0;}</style></head>
            <body>
                <script>
                    atOptions = {
                        'key': '76212000070ff546cb6508fde55a2673',
                        'format': 'iframe',
                        'height': 600,
                        'width': 160,
                        'params': {}
                    };
                <\/script>
                <script async src="https://www.highperformanceformat.com/76212000070ff546cb6508fde55a2673/invoke.js"><\/script>
            </body>
            </html>
        `);
        doc.close();
    }, []);

    return (
        <div className="hidden xl:flex flex-col items-center sticky top-8 min-w-[160px]">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Ad</p>
            <div ref={ref} className="w-[160px] h-[600px]" />
        </div>
    );
}