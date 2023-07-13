import Image from 'next/image';
import about_2 from "src/images/about/about_2.png"
import about_right_shape from "src/images/about/about_right_shape.svg"
import left_right_dots from "src/images/about/right_dots.svg"

export default function AboutSection2() {
	return (
		<section id="about" className="about-section pt-150">
			<div className="container">
				<div className="row flex items-center">
					<div className="w-full lg:w-1/2">
						<div className="about-content">
							<div className="section-title mb-8">
								<h1 className="mb-6 text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Easy to Use with Tons of Awesome Features</h1>
								<p className="">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
							</div>
							<ul className="about-feature">
								<li>Quick Access</li>
								<li>Easily to Manage</li>
								<li>24/7 Support</li>
							</ul>
							<a href="" className="main-btn btn-hover border-btn ">Learn More</a>
						</div>
					</div>
					<div className="w-full lg:w-1/2 order-first lg:order-last">
						<div className="about-img-2 relative z-10 pt-19 pb-19 mb-18 lg:mb-0">
							<Image src={about_2} alt="" className="w-100" />
							<Image src={about_right_shape} alt="" className="shape shape-1" />
							<Image src={left_right_dots} alt="" className="shape shape-2" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}