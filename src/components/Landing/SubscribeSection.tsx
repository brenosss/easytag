import subscribe_bg from "src/images/subscribe/subscribe_bg.svg";

export default function SubscribeSection() {
  return (
    <section id="contact" className="subscribe-section pt-120">
      <div className="container">
        <div
          className="subscribe-wrapper pb-13 md:px-13 rounded-3xl bg-cover bg-center bg-no-repeat px-8 pt-16"
          style={{ backgroundImage: `url(${subscribe_bg.src})` }}
        >
          <div className="row flex items-center">
            <div className="w-full lg:w-7/12 xl:w-6/12">
              <div className="section-title mb-4">
                <h1 className="mb-6 text-white">Subscribe Our Newsletter</h1>
                <p className="pr-5 text-white">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor
                </p>
              </div>
            </div>
            <div className="w-full lg:w-5/12 xl:w-6/12">
              <form action="" className="subscribe-form relative mb-4">
                <input
                  type="email"
                  name="subs-email"
                  id="subs-email"
                  placeholder="Your Email"
                  className="text-body-color solid w-full rounded-2xl border bg-white py-5 px-8 ring-4 transition duration-300 focus:border-emerald-500 focus:shadow-xl focus:ring-emerald-500"
                />
                <button type="submit" className="main-btn btn-hover">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
