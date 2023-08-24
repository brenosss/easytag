import Head from "next/head";
import HeroSection from "./HeroSection";
import FeatureSection1 from "./FeatureSection1";
import AboutSection1 from "./AboutSection1";
import "src/styles/LineIcons.2.0.css";
import "src/styles/tailwindcss.css";
import "src/styles/animate.css";
import "src/styles/tiny-slider.css";
import AboutSection2 from "./AboutSection2";
import FeatureSection2 from "./FeatureSection2";
import PricingSection from "./PricingSection";
import TestimonialSection from "./TestimonialSection";
import SubscribeSection from "./SubscribeSection";
import Footer from "./Footer";
import Header from "./Header";

const Landing = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Head>
          <title>EasyTag</title>
        </Head>
        <div className="bg-white">
          <Header />
          <main>
            <HeroSection />
            <FeatureSection1 />
            <AboutSection1 />
            <PricingSection />
            <SubscribeSection />
          </main>
          <Footer />
        </div>
      </div>
      <a href="#" className="scroll-top btn-hover">
        <i className="lni lni-chevron-up"></i>
      </a>
    </>
  );
};
export default Landing;