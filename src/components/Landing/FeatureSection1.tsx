export default function FeatureSection1() {
  return (
    <section id="features" className="feature-section pt-120">
      <div className="container">
        <div className="row flex justify-center">
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="text-center px-3 2xl:px-10 py-8">
              <div className="feature-icon">
                <i className="lni lni-postcard"></i>
              </div>
              <div className="content">
                <h3 className="mb-5">Seamless Card Creation</h3>
                <p className="text-xl">
                  With our intuitive interface, you can effortlessly define the title, description, and upload your chosen images to create dynamic social cards.
                  Change and adapt your content anytime without a single line of code, offering you unparalleled flexibility.</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="text-center px-3 2xl:px-10 py-8">
              <div className="feature-icon">
                <i className="lni lni-bolt-alt"></i>
              </div>
              <div className="content">
                <h3 className="mb-5">Optimized Card Performance</h3>
                <p className="text-xl">
                  With our preview tool, we help you make social cards that do really well across all sorts of social media sites.
                  We give you helpful advice and suggestions to get the most out of your social media posts and increase your audience.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="text-center px-3 2xl:px-10 py-8">
              <div className="feature-icon">
                <i className="lni lni-coffee-cup"></i>
              </div>
              <div className="content">
                <h3 className="mb-5">Easy Integration</h3>
                <p className="text-xl">
                  We provide a bunch of plug-ins that work well with many commonly used technologies, making it easy for you to get things set up on your existing website.
                  If you want something more custom-made, you can use our API to create an integration that suits your needs just right.  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}