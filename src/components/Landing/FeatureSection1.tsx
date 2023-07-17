export default function FeatureSection1() {
  return (
    <section id="features" className="feature-section pt-120">
      <div className="container">
        <div className="row flex justify-center">
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="text-center px-3 2xl:px-10 py-8">
              <div className="feature-icon">
                <i className="lni lni-bootstrap"></i>
              </div>
              <div className="content">
                <h3 className="mb-5">Bootstrap 5</h3>
                <p className="text-lg">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="text-center px-3 2xl:px-10 py-8">
              <div className="feature-icon">
                <i className="lni lni-layout"></i>
              </div>
              <div className="content">
                <h3 className="mb-5">Clean Design</h3>
                <p className="text-lg">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="text-center px-3 2xl:px-10 py-8">
              <div className="feature-icon">
                <i className="lni lni-coffee-cup"></i>
              </div>
              <div className="content">
                <h3 className="mb-5">Easy to Use</h3>
                <p className="text-lg">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}