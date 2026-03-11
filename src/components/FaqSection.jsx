"use client";

import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const faqs = [
    {
        question: "Do I need to create an account to use TempMail.sbs?",
        answer:
            "No registration is required. A temporary email address is generated automatically when you visit the website, and it can be used immediately.",
    },
    {
        question: "How long does a temporary email address remain active?",
        answer:
            "Temporary inboxes remain active for a limited time. After expiration, the email address and all received messages are automatically removed.",
    },
    {
        question: "Is temporary email suitable for important accounts?",
        answer:
            "Temporary email addresses are designed for short-term and non-sensitive use. For banking, government services, or business accounts, a permanent email address should be used.",
    },
    {
        question: "Can I send emails using a temporary address?",
        answer:
            "Most temporary email services are receive-only. They are primarily intended for receiving short-term verification or access emails.",
    },
    {
        question: "Is using a temporary email legal?",
        answer:
            "In most regions, using a temporary email service for privacy or testing purposes is legal. It should always be used responsibly and according to applicable laws.",
    },
    {
        question: "Why would someone use a temporary email?",
        answer:
            "Temporary email addresses are often used to reduce spam, protect primary inboxes, and manage short-term online registrations.",
    },
    {
        question: "Are temporary email messages private?",
        answer:
            "Temporary email services are designed for convenience rather than secure communication. Sensitive information should not be shared through temporary inboxes.",
    },
    {
        question: "Can I recover emails after expiration?",
        answer:
            "No. Once the inbox expires and messages are deleted, they cannot be recovered. Important emails should be saved before expiration.",
    },
    {
        question: "Does TempMail.sbs store personal information?",
        answer:
            "Temporary email services typically operate without requiring personal registration. However, users should review the privacy policy for detailed information.",
    },
    {
        question: "Can I use temporary email for app or website testing?",
        answer:
            "Yes, temporary emails are commonly used by developers and testers to verify registration flows and email delivery systems.",
    },
    {
        question: "Will temporary emails prevent all spam?",
        answer:
            "Temporary email addresses can reduce spam reaching your primary inbox, but they do not eliminate spam entirely across the internet.",
    },
    {
        question: "Do temporary emails work on mobile devices?",
        answer:
            "Yes, temporary email services can generally be accessed through mobile browsers, making them convenient for use on smartphones and tablets.",
    },
    {
        question: "Can I extend the duration of a temporary email?",
        answer:
            "Most temporary email addresses expire automatically. Extension options depend on the service provider and system design.",
    },
    {
        question:
            "Is a temporary email the same as a permanent email account?",
        answer:
            "No. Temporary emails are short-term inboxes designed for limited use, while permanent email accounts are intended for long-term communication.",
    },
    {
        question: "When should I avoid using a temporary email?",
        answer:
            "Temporary email should not be used for financial accounts, official registrations, or any service that requires long-term access to important information.",
    },
];

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-50 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <FiHelpCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Quick answers to common questions about our service
                    </p>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl bg-white hover:border-blue-100 transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left p-6 flex justify-between items-center"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                <FiChevronDown
                                    className={`w-6 h-6 text-gray-500 transform transition-transform ${activeIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-40" : "max-h-0"
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default FaqSection;
