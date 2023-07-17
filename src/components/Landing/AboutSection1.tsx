import Image from 'next/image';
import about_1 from"src/images/about/about_1.png"
import about_left_shape from "src/images/about/about_left_shape.svg"
import left_dots from "src/images/about/left_dots.svg"

export default function AboutSection1() {
  return (
    <section id="about" className="about-section relative z-10 pt-150">
			<div className="container">
				<div className="row flex items-center">
					<div className="w-full lg:w-1/2">
						<div className="about-img relative z-10 pt-19 pb-19 mb-18 lg:mb-0">
							<Image src={about_1} alt="" className="w-100"/>
							<Image src={about_left_shape} alt="" className="shape-1"/>
							<Image src={left_dots} alt="" className="shape shape-2"/>
						</div>
					</div>
					<div className="w-full lg:w-1/2">
						<div className="about-content">
							<div className="section-title mb-8">
								<h1 className="mb-6 ">Perfect Solution Thriving Online Business</h1>
								<p className="">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed dinonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.Lorem ipsum dolor sit amet.</p>
							</div>
							<a className="main-btn btn-hover border-btn ">Discover More</a>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}