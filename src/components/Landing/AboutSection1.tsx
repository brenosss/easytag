import Image from 'next/image';
import about_left_shape from "src/images/about/about_left_shape.svg"
import left_dots from "src/images/about/left_dots.svg"
import Terminal from 'react-animated-term'
import 'react-animated-term/dist/react-animated-term.css'

const termLines = [
  {
    'text': "curl 'https://api.socialsharing.dev/pages/snippet' \n\
      --header 'Authorization: Bearer OTFMUI8S7XREYFPWQEP98'  \n\
      --header 'Content-Type: application/json'  \n\
      --data '\{ \n\
        'path': 'dashboard/pages', \n\
        'type': 'html' \n\
      }'",
    'cmd': true
  },
  {
    'text': '<meta property="og:title" content="Facebook"></meta> \n\
    <meta name="twitter:title" content="Facebook"></meta> \n\
    <meta property="og:description" content="Facebook is a social networking service and website launched in February 2004, operated and privately owned by Facebook, Inc."></meta> \n\
    <meta name="twitter:description" content="Facebook is a social networking service and website launched in February 2004, operated and privately owned by Facebook, Inc."></meta> \n\
    <meta property="og:image" content="https://imagedelivery.net/h2ihZ1o4nc1zDIgmiFJSbA/90e01909-29a3-4c5f-f708-29fcde463d00/public"></meta> \n\
    <meta name="twitter:image" content="https://imagedelivery.net/h2ihZ1o4nc1zDIgmiFJSbA/90e01909-29a3-4c5f-f708-29fcde463d00/public"></meta> \n\
    <meta property="og:url" content="en/dashboard/details"></meta> \n\
    <meta name="twitter:card" content="summary"></meta>',
    'cmd': false
  },
]



export default function AboutSection1() {
  return (
    <section id="about" className="about-section relative z-10 pt-150">
			<div className="container">
				<div className="row flex items-center">
					<div className="w-full lg:w-1/2">
						<div className="about-img relative z-10 pt-19 pb-19 mb-18 lg:mb-0">
							<Image src={about_left_shape} alt="" className="shape-1"/>
              <Terminal
                lines={termLines}
                interval={10}
                style={{ fontSize: '2em'}}
                height={540}
              />
						</div>
					</div>
					<div className="w-full lg:w-1/2 pl-8">
						<div className="about-content">
							<div className="section-title mb-8">
								<h1 className="mb-6 ">Easy API integration</h1>
								<p className="">Our API is designed to be easy to use and integrate with your existing website. Check out our documentation to see how to get started.</p>
							</div>
							<a className="main-btn btn-hover border-btn" target="_blank" href='https://determined-calliandra-75c.notion.site/Social-Share-Documentation-011b2571298f4eebad8ca3d6e2de213f'>Documentation</a>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}