import Image from 'next/image'
import footer_bg from 'src/images/footer/footer_bg.svg'
export default function Footer() {
  return (
    <footer className="footer bg-cover bg-no-repeat bg-right-top pt-120 mt-25 bg-theme-color md:bg-transparent md:pt-260 lg:pt-260"  style={{backgroundImage: `url(${footer_bg.src})`}}>
      <div className="container">
        <div className="widget-wrapper">
          <div className="row">

            <div className="w-full md:w-6/12 lg:w-4/12">
              <div className="footer-widget mb-10 mx-3">
                <div className="logo mb-8">
                  <a href="/"> <Image src="src/images/logo/logo.svg" width={12} height={12} alt=""/> </a>
                </div>
                <p className="mb-8 text-white sm:pr-13 md:pr-0 2xl:pr-25">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dinonumy eirmod tempor invidunt.</p>
                <ul className="socials flex items-center">
                  <li className="mr-5">
                    <a href=""> <i className="lni lni-facebook-original"></i> </a>
                  </li>
                  <li className="mr-5">
                    <a href=""> <i className="lni lni-twitter-original"></i> </a>
                  </li>
                  <li className="mr-5">
                    <a href=""> <i className="lni lni-instagram-original"></i> </a>
                  </li>
                  <li>
                    <a href=""> <i className="lni lni-linkedin-original"></i> </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 lg:w-2/12">
              <div className="footer-widget mb-10 mx-3">
                <h3 className="mb-6 text-white">About Us</h3>
                <ul className="links">
                  <li> <a href="">Home</a> </li>
                  <li> <a href="">Feature</a> </li>
                  <li> <a href="">About</a> </li>
                  <li> <a href="">Testimonials</a> </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 lg:w-3/12">
              <div className="footer-widget mb-10 mx-3">
                <h3 className="mb-6 text-white">Features</h3>
                <ul className="links">
                  <li> <a href="">How it works</a> </li>
                  <li> <a href="">Privacy policy</a> </li>
                  <li> <a href="">Terms of service</a> </li>
                  <li> <a href="">Refund policy</a></li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 lg:w-3/12">
              <div className="footer-widget mb-10 mx-3">
                <h3 className="mb-6 text-white">Other Products</h3>
                <ul className="links">
                  <li> <a href="">Accounting Software</a> </li>
                  <li> <a href="">Billing Software</a> </li>
                  <li> <a href="">Booking System</a> </li>
                  <li> <a href="">Tracking System</a> </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}