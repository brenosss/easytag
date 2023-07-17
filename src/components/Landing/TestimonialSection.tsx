import Image from "next/image";
import testimonial_shape from "src/images/testimonial/testimonial_shape.svg";
import testimonial_dots from "src/images/testimonial/testimonial_dots.svg";
import testimonial_1 from "src/images/testimonial/testimonial_1.png";

export default function TestimonialSection() {
  return (
    <section
      id="testimonials"
      className="testimonial-section pb-25 lg:py-170 pt-8 sm:p-0"
    >
      <div className="container">
        <div className="testimonial-active-wrapper relative">
          <div className="section-title text-center">
            <h1 className="relative z-20 mb-8">What our customers says</h1>
          </div>
          <div className="shapes z-10">
            <Image
              src={testimonial_shape}
              alt=""
              className="shape shape-1 -left-25 top-1/2 hidden -translate-y-1/2 transform lg:block"
            />
            <Image
              src={testimonial_dots}
              alt=""
              className="shape shape-2 left-150 -bottom-110 lg:-bottom-13 hidden lg:block lg:w-1/4 xl:w-max"
            />
          </div>

          <div className="testimonial-active">
            {/*<!-- single testimonial */}
            <div className="single-testimonial">
              <div className="row flex">
                <div className="w-full lg:w-5/12">
                  <div className="testimonial-Image relative mb-8 inline-block text-left lg:mb-0 lg:block lg:text-right">
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
                      <p className="mb-8 text-lg leading-7">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed dinonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua. At vero eos et
                        accusam et justo duo dolores et ea rebum. Stet clita
                        kasd gubergren, no sea takimata sanctus est Lorem.
                      </p>
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
  );
}
