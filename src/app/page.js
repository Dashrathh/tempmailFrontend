import EmailGenerator from "@/components/MailGenerator";
import Inbox from "@/components/Inbox";
import BlogList from "@/components/BlogList";
import FeaturesSection from "@/components/FeaturesSection";
import HowToUseSection from "@/components/HowToUseSection";
import FaqSection from "@/components/FaqSection";
import PopularTools from "@/components/PopularTools";

export default function Home() {
  return (
    <>
      <EmailGenerator />
      <Inbox />
      <BlogList hasTitle={false} />
      <FeaturesSection />
      <PopularTools />
      <HowToUseSection />
      <FaqSection />
    </>
  );
}
