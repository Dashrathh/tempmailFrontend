const HowToUseSection = () => {
    return (
        <section className="bg-white py-12 px-6 md:px-16">
            <div className="max-w-3xl mx-auto text-gray-800 leading-relaxed">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    How to Use a Temporary Email
                </h2>

                <p className="mb-4">
                    Using TempMail.sbs is quick and simple. When you open the website, a
                    temporary email address is automatically created for you. There is no
                    registration, no login, and no personal information required.
                </p>

                <p className="mb-4">
                    You can copy the generated email address and use it for short-term
                    registrations, accessing online services, or receiving verification
                    emails. Any incoming message will appear directly in your inbox on the
                    same page.
                </p>

                <p>
                    The temporary inbox remains active for a limited time. After
                    expiration, the email address and its messages are automatically
                    removed. For important or long-term accounts, always use a permanent
                    and secure email address.
                </p>
            </div>
        </section>
    );
};

export default HowToUseSection;
