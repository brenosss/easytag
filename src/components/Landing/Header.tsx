import logo from "src/images/logo/logo.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuClassName = isMenuOpen ? "block navbar-toggler focus:outline-none lg:hidden active" : "block navbar-toggler focus:outline-none lg:hidden";

  return (
    <header className="header">
      <div className="navbar-area">
        <div className="container relative">
          <div className="row items-center">
            <div className="w-full">
              <nav className="flex items-center justify-between py-4 navbar navbar-expand-lg">
                <a className="navbar-brand mr-5" href="/">
                  <Image src={logo} alt="Logo" />
                </a>
                <button className={menuClassName} type="button" onClick={toggleMenu} aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div className="absolute left-0 z-20 hidden w-full px-5 py-3 duration-300 bg-white shadow lg:w-auto lg:block top-full mt-full lg:static lg:bg-transparent lg:shadow-none" id="navbarOne">
                  <ul id="nav" className="items-center content-start mr-auto lg:justify-end navbar-nav lg:flex">
                    <li className="nav-item ml-5 lg:ml-11">
                      <a className="page-scroll active" href="#home">Home</a>
                    </li>
                    <li className="nav-item ml-5 lg:ml-11">
                      <a className="page-scroll" href="#features">Features</a>
                    </li>
                    <li className="nav-item ml-5 lg:ml-11">
                      <a className="page-scroll" href="#about">About</a>
                    </li>

                    <li className="nav-item ml-5 lg:ml-11">
                      <a className="page-scroll" href="#why">Why</a>
                    </li>
                    <li className="nav-item ml-5 lg:ml-11">
                      <a className="page-scroll" href="#pricing">Pricing</a>
                    </li>
                    <li className="nav-item ml-5 lg:ml-11">
                      <a className="page-scroll" href="#testimonials">Clients</a>
                    </li>
                    <li className="nav-item ml-5 lg:ml-11">
                      <Link
                        href="/api/auth/signin"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Log in <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/*<!-- navbar collapse -->*/}
              </nav>
              {/*<!-- navbar -->*/}
            </div>
          </div>
          {/*<!-- row -->*/}
        </div>
        {/*<!-- container -->*/}
      </div>
      {/*<!-- navbar area -->*/}
    </header>
  )
}