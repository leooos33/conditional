import Head from "next/head";

export default function Home() {
  return (
    <div className="App">
      <header class="flex flex-wrap place-items-center bg-black1">
        <section class="relative mx-auto">
          <nav class="flex container justify-between text-white w-screen">
            <div class="px-5 lg:px-0 xl:px-14 py-3 flex w-full items-center">
              <a class="flex title-font font-sans items-center  text-white md:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-8 h-10 pb-1 text-white pt-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span class=" ml-2 pb-1.5 font-sans font-normal text-3xl">
                  spectr
                </span>
              </a>

              <nav class="hidden pb-1  md:flex px-4 mx-auto  text-2xl space-x-6 text-gray1-g75 font-sans font-medium">
                <a class="mr-5 hover:text-white">Build</a>
                <a class="mr-5 hover:text-white">Blog</a>
                <a class="mr-5 hover:text-white">Analytics</a>
                <a class="mr-5 hover:text-white">We're hiring</a>
              </nav>
              <button class="hidden md:block pb-2 bg-transparent text-white font-sans font-medium text-xl py-1 px-6 border-orange1 border-2 hover:border-transparent rounded-full ">
                App
              </button>
            </div>

            <a class="navbar-burger self-center mr-12 md:hidden" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </a>
          </nav>
        </section>
      </header>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 pt-20 sm:flex-row flex-col items-center">
          <div class="md:w-10/12 lg:w-8/12 xl:w-7/12 lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-6xl text-6xl mb-1 font-medium text-white">
              Conditional liquidity protocol
            </h1>
            <div class="flex justify-center md:flex-row flex-col-reverse ">
              <button class="inline-flex items-center justify-center md:px-12 px-20 my-10 md:my-6 text-white bg-orange1 rounded-full py-2 font-sans font-medium text-3xl focus:outline-none">
                <div>Trade now </div>
              </button>

              <a class="text-gray1-g50 text-3xl inline-flex items-center justify-center pl-5 md:mt-0 mt-8 font-sans font-semibold focus:outline-none">
                Start building
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-8 h-8 mt-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <div class="flex justify-center md:justify-start pt-3 md:pt-0">
              <button class=" rounded-full h-12 w-12 flex items-center justify-center bg-white">
                <svg
                  class="w-4 h-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center bg-white">
                <svg
                  class="w-4 h-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center bg-white">
                <svg
                  class="w-4 h-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center bg-white">
                <svg
                  class="w-4 h-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>

              <button class=" ml-3 rounded-full h-12 w-12 flex items-center justify-center bg-white">
                <svg
                  class="w-4 h-4 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 py-10 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white">
              Don't limit yourself to just one curve, when there is an infinite
              number of them.
            </h1>
            <p class="leading-relaxed text-gray1-g66 text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-sans font-medium">
              Set any curve that you really would like to have (even as in the
              graph).{" "}
            </p>

            <div class="flex justify-center">
              <button class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none">
                <div>Read the docs </div>
                <svg
                  class="fill-current w-3 h-3 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="Section1.svg"
            />
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white">
              Regulate parameters to better control your risk.
            </h1>
            <p class="leading-relaxed text-gray1-g66 text-2xl md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-sans font-medium">
              Accept trades only when market conditions are met.{" "}
            </p>

            <div class="flex justify-center">
              <button class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none">
                <div>View all parameters </div>
                <svg
                  class="fill-current w-3 h-3 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-7/12 w-full">
            <div class="container  mx-auto flex flex-wrap justify-center ">
              <div class="flex flex-wrap ">
                <div class="p-3 md:w-1/3 sm:px-5 px-0">
                  <div class="flex   flex-col">
                    <div class="flex items-center justify-center">
                      <h2 class="text-white lg:text-3xl text-2xl title-font font-medium">
                        3 bps
                      </h2>
                    </div>
                    <div class="flex-grow">
                      <p class="leading-relaxed lg:text-3xl text-orange1 sm:text-2xl text-2xl font-medium text-center">
                        Spread
                      </p>
                    </div>
                  </div>
                </div>

                <div class="p-3 md:w-1/3 px-5">
                  <div class="flex  flex-col">
                    <div class="flex items-center justify-center">
                      <h2 class="text-white title-font font-medium lg:text-3xl text-2xl ml-2">
                        3-5%
                      </h2>
                    </div>
                    <div class="flex-grow">
                      <p class="leading-relaxed lg:text-3xl sm:text-2xl text-2xl text-orange1 font-medium font-sans text-center ">
                        Volatility
                      </p>
                      <p class="leading-relaxed lg:text-3xl sm:text-2xl text-2xl text-orange1 font-medium font-sans -mt-3 sm:-mt-2 text-center ">
                        range
                      </p>
                    </div>
                  </div>
                </div>

                <div class="p-3 md:w-1/3 sm:px-8 md:px-12 lg:px-16 xl:px-20 px-3">
                  <div class="flex flex-col">
                    <div class="flex items-center justify-center">
                      <h2 class="text-white title-font font-medium lg:text-3xl text-2xl pl-0 md:pl-3 lg:pl-0">
                        55%
                      </h2>
                    </div>
                    <div class="flex-grow">
                      <p class="leading-relaxed lg:text-3xl sm:text-2xl text-2xl text-orange1 font-medium text-center -mx-8">
                        Buy/Sell
                      </p>
                      <p class="leading-relaxed lg:text-3xl sm:text-2xl text-2xl text-orange1 font-medium font-sans -mt-3 sm:-mt-2 -mx-2 md:-mx-4 text-center">
                        ratio
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0 py-10 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2  lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white w-full ">
              Apply 2-sided orders to create a variety of liquidity provisioning
              strategies.
            </h1>

            <div class="flex justify-center">
              <button class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none">
                <div>Read the docs</div>
                <svg
                  class="fill-current w-3 h-3 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/600x280"
            />
          </div>
        </div>
      </section>

      <section class="bg-black1  body-font">
        <div class="container mx-auto flex px-5 xl:px-12 lg:px-0  md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2  lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-s text-center">
            <h1 class="title-font sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl text-2xl mt-5 font-medium text-white">
              ...And sell them to earn royalties!
            </h1>
            <p class="leading-relaxed text-gray1-g66 text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-sans font-medium">
              Decentralized liquidity fundraising.{" "}
            </p>

            <div class="flex justify-center">
              <button class="inline-flex text-orange1 font-sans font-medium text-2xl md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl border-0 py-1  focus:outline-none">
                <div>Financial NFT's </div>
                <svg
                  class="fill-current w-3 h-3 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="Section3.svg"
              width="600px"
              height="800px"
            />
          </div>
        </div>
      </section>

      <footer class="text-gray-400 bg-black1 body-font pt-8 ">
        <div class="container md:px-2 px-12 xl:px-10 lg:px-0 mx-auto flex items-center md:flex-row flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-12 h-12 mb-4 text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>

          <div class="form-control pb-5 lg:pb-0 px-3">
            <div class="relative pb-1 md:w-11/12 lg:w-full w-full">
              <input
                type="text"
                placeholder="Email "
                class="w-full text-lg md:text-md pb-1 font-sans font-semibold pr-32 bg-black1 border-b-2"
              />
              <button class="absolute top-0 right-0 rounded-full bg-gray1-g00 px-4 text-white text-lg font-sans font-normal md:font-medium">
                Subscribe
              </button>
            </div>
            <label class="label">
              <span class="label-text font-sans text-gray1-g50 font-semibold text-sm lg:text-md -mx-1 -my-2 sm:-my-4">
                Subscribe to our blog for project updates.
              </span>
            </label>
          </div>

          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start flex-col sm:flex-row sm:text-left text-center">
            <div class="lg:w-2/4 md:w-3/4 w-full sm:ml-0 md:mx-2 lg:mx-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3">
                Products
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white ">
                    Spot market
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Analytics
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Options
                  </a>
                </li>
              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full sm:mx-6  md:mx-3 lg:mx-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3 ">
                Developers
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">Docs</a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Github
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">SDK</a>
                </li>
              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full sm:mx-5 md:mx-1 lg:mx-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3">
                About
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">About</a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">Team</a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Careers
                  </a>
                </li>
              </nav>
            </div>

            <div class="lg:w-1/4 md:w-1/2 w-full lg:mx-2 md:mx-5 sm:ml-5">
              <h2 class="title-font font-medium font-sans text-white text-2xl sm:text-xl md:text-sm lg:text-lg xl:text-xl tracking-widest mb-3">
                Community
              </h2>
              <nav class="list-none mb-10 text-xl sm:text-lg md:text-sm lg:text-lg">
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Discord
                  </a>
                </li>
                <li>
                  <a class="text-gray1-w75 font-mono hover:text-white">
                    Telegram
                  </a>
                </li>
              </nav>
            </div>
          </span>
        </div>
      </footer>
    </div>
  );
}
