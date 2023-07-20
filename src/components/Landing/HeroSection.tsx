import Image from 'next/image';
import hero_img from 'src/images/hero/hero_img.png'
import hero_bg from 'src/images/hero/hero_bg.svg'

export default function HeroSection() {
  return (
    <section id="home" className="hero-section relative bg-no-repeat bg-top z-10 pt-200 pb-13 lg:pb-200 2xl:pb-120" style={{ backgroundImage: `url(${hero_bg.src})`}}>
      <div className="container">
        <div className="row flex items-center relative">
          <div className="w-full lg:w-1/2">
            <div className="hero-content mb-0 lg:mb-6">
              <h1 className="text-white mb-9 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl 2xl:text-6xl">Launch Your SaaS Website in Minutes!</h1>
              <p className="text-white text-xl mb-10 xl:pr-18 2xl:pr-120">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              </p>
              <a className="main-btn border-btn btn-hover mb-2">Get Started</a>
              <a href="#features" className="scroll-bottom"> <i className="lni lni-arrow-down"></i></a>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="hero-img pt-8 lg:pt-0">
              <Image src={hero_img} alt="" className="w-full lg:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}