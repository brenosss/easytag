import Image from 'next/image';
import testimonial_shape from "src/images/testimonial/testimonial_shape.svg"
import testimonial_dots from "src/images/testimonial/testimonial_dots.svg"
import testimonial_1 from "src/images/testimonial/testimonial_1.png"

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="testimonial-section pt-8 pb-25 sm:p-0 lg:py-170">
      <div className="container">
        <div className="section-title text-center">
          <h1 className="mb-8">What our customers says</h1>
        </div>
        <div className="testimonial-active-wrapper relative">

          <div className="shapes">
            <Image src={testimonial_shape} alt="" className="shape shape-1 hidden lg:block -left-25 top-1/2 transform -translate-y-1/2" />
            <Image src={testimonial_dots} alt="" className="shape shape-2 hidden lg:block left-150 -bottom-110 lg:-bottom-13 lg:w-1/4 xl:w-max" />
          </div>

          <div className="testimonial-active">

            {/*<!-- single testimonial */}
            <div className="single-testimonial">
              <div className="row flex">
                <div className="w-full lg:w-5/12">
                  <div className="testimonial-Image inline-block lg:block text-left lg:text-right relative mb-8 lg:mb-0">
                    <Image src={testimonial_1} alt="" className="lg:ml-auto" />
                    <div className="quote">
                      <i className="lni lni-quotation"></i>
                    </div>
                  </div>
                </div>
                <div className="w-0 lg:w-1/12"></div>
                <div className="lg:w-6/12">
                  <div className="content-wrapper">
                    <div className="content">
                      <p className="text-lg leading-7 mb-8">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dinonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.</p>
                    </div>
                    <div className="info">
                      <h4 className="mb-3">Jonathon Smith</h4>
                      <p>Developer and Youtuber</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}