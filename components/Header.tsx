import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-subtle drop-shadow-md text-sm py-[9px]">
      <nav
        className="max-w-[1440px] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-logo font-semibold" href="#">
            Snapfolio
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:pl-5">
            <a
              // className="font-medium text-blue-500"
              className="button-lg-regular text-contrast p-3"
              href="#"
              aria-current="page"
            >
              Features
            </a>
            <a className="button-lg-regular text-contrast p-3" href="#">
              Pricing
            </a>
            <a className="button-lg-regular text-contrast p-3" href="#">
              Learn
            </a>
          </div>
        </div>
        <a className="button-md-bold text-contrast accent p-3 mr-2" href="#">
          Login
        </a>
        <div className="pt-3 md:pt-0">
          <a
            className=" button-md-bold inline-flex justify-center items-center gap-x-2 text-center bg-fg-accent text-white rounded-lg py-2.5 px-3"
            href="#"
          >
            Get Started for Free
          </a>
        </div>
      </nav>
    </header>
    // <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
    //   <Link href="/" className="flex space-x-3">
    //     {/* <Image
    //       alt="header text"
    //       src="/writingIcon.png"
    //       className="sm:w-12 sm:h-12 w-8 h-8"
    //       width={32}
    //       height={32}
    //     /> */}
    //     <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
    //       Snapfolio
    //     </h1>
    //   </Link>
    //   {/* <a
    //     href="https://vercel.com/templates/next.js/twitter-bio"
    //     target="_blank"
    //     rel="noreferrer"
    //   > */}
    //     {/* <Image
    //       alt="Vercel Icon"
    //       src="/vercelLogo.png"
    //       className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
    //       width={32}
    //       height={28}
    //     /> */}
    //       <p className="ml-2 tracking-tight">
    //       Powered by ChatGPT
    //     </p>
    //   {/* </a> */}
    // </header>
  );
}
