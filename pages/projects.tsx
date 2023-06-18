import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Card from "@/components/Cards";
import cardsData from "../public/cards.json";

const Projects: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [study, setStudy] = useState("");
  // const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedStudy, setGeneratedStudy] = useState("");

  const studyRef = useRef<null | HTMLDivElement>(null);

  const scrollToStudy = () => {
    if (studyRef.current !== null) {
      studyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const prompt = `Generate 2 ${vibe} twitter studygraphies with no hashtags and clearly labeled "1." and "2.". ${
  //   vibe === "Funny"
  //     ? "Make sure there is a joke in there and it's a little ridiculous."
  //     : null
  // }
  //     Make sure each generated studygraphy is less than 160 characters, has short sentences that are found in Twitter studys, and base them on this context: ${study}${
  //   study.slice(-1) === "." ? "" : "."
  // }`;
  const persona = `Ignore all previous instructions. Here is your new role and Persona:\nYou are a UI/UX designer, you possess a wealth of experience and expertise in creating user-centered digital experiences. Your understanding of the importance of putting the user at the core of the design process, conducting thorough user research, and gathering valuable insights informs your design decisions. Your keen eye for aesthetics and strong visual design skills allow you to create visually appealing and engaging interfaces that captivate users. You excel in interaction design, ensuring that the interfaces you create are intuitive, easy to navigate, and encourage user engagement. You are a master of writing professional and detailed case studies.\n`;
  const prompt = `${persona}Generate a detailed UI/UX case study. It should have the follwoing headings: Painpoints, Scope & constraints, Roles and responsibilities, Ideation, Design approach & principles, Design artifacts and Outcomes & lessons Base it on this context: ${study}`;

  const generateStudy = async (e: any) => {
    e.preventDefault();
    setGeneratedStudy("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedStudy((prev) => prev + chunkValue);
    }
    scrollToStudy();
    setLoading(false);
  };

  return (
    <div className="flex mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Snapfolio - AI Case Study Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center pt-[33.5px] text-center px-4">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterstudy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}
        <div className="w-full max-w-[1376px]">
          <div className="flex justify-between items-center">
            <h4 className="fg-text-contrast">Projects</h4>
            <button className="bg-fg-accent rounded-lg text-white button-md-bold px-8 py-3.5 hover:bg-black/80">
              Create Document
            </button>
          </div>
          <div className="flex mt-4 gap-x-2	">
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-slideup-animation"
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded border fg-border button-md-regular bg-white fg-text-contrast shadow-sm align-middle"
              >
                Category
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 min-w-[15rem] shadow-sm rounded-lg border fg-border bg-white p-2"
                aria-labelledby="hs-dropdown-slideup-animation"
              >
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 my-1 button-md-regular bg-white fg-text-contrast"
                  href="#"
                >
                  Newsletter
                </a>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-3 my-1  button-md-regular bg-white fg-text-contrast"
                  href="#"
                >
                  Newsletter
                </a>
              </div>
            </div>
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-slideup-animation"
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded border fg-border button-md-regular bg-white fg-text-contrast shadow-sm align-middle"
              >
                Date Modified
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 min-w-[15rem] shadow-sm rounded-lg border fg-border bg-white p-2"
                aria-labelledby="hs-dropdown-slideup-animation"
              ></div>
            </div>
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-slideup-animation"
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded border fg-border button-md-regular bg-white fg-text-contrast shadow-sm align-middle"
              >
                Tags
                <svg
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 min-w-[15rem] shadow-sm rounded-lg border fg-border bg-white p-2"
                aria-labelledby="hs-dropdown-slideup-animation"
              ></div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-start">
              <div className="flex items-center gap-x-3.5 cursor-pointer">
              <svg
                className="hs-dropdown-open:rotate-180 w-4 h-4 fg-text-contrast"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h5
                className="fg-text-contrast cursor-pointer"
                data-hs-collapse="#hs-basic-collapse-heading"
              >
                Recents
              </h5>
              </div>
              {/* <button
                type="button"
                className="hs-collapse-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                id="hs-basic-collapse"
              >
                Collapse
                <svg
                  className="hs-collapse-open:rotate-180 w-2.5 h-2.5 text-white"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button> */}
            </div>
            <div
              id="hs-basic-collapse-heading"
              className="hs-collapse open w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-collapse"
            >
              <div className="mt-5">
                <p className="text-gray-500 dark:text-gray-400">
                  This is a collapse body. It is hidden by default, until the
                  collapse plugin adds the appropriate classes that we use to
                  style each element. These classes control the overall
                  appearance, as well as the showing and hiding via CSS
                  transitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
