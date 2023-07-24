import subscribe_bg from "src/images/subscribe/subscribe_bg.svg";

function emailForm() {
  return (
    <form action="" className="subscribe-form relative mb-4">
    <input
      type="email"
      name="subs-email"
      id="subs-email"
      placeholder="Your Email"
      className="text-body-color w-full rounded-2xl bg-white py-5 px-8 ring-emerald-500 focus:ring-2 focus:ring-emerald-500 transition duration-300 border-emerald-500 focus:border-emerald-500"
    />
    <button type="submit" className="main-btn btn-hover">
      Subscribe
    </button>
  </form>
  )
}

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
                <h1 className="mb-6 text-white">Contact us</h1>
                <p className="pr-5 text-white">
                  Do you have any questions? send us a message and we will get back to you as soon as possible.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-5/12 xl:w-6/12 text-center">
              <h1 className="text-white cursor-pointer">contact@easytag.com</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
