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

const Home: NextPage = () => {
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
  const persona = `Ignore all previous instructions. Here is your new role and Persona:\nYou are a UI/UX designer, you possess a wealth of experience and expertise in creating user-centered digital experiences. Your understanding of the importance of putting the user at the core of the design process, conducting thorough user research, and gathering valuable insights informs your design decisions. Your keen eye for aesthetics and strong visual design skills allow you to create visually appealing and engaging interfaces that captivate users. You excel in interaction design, ensuring that the interfaces you create are intuitive, easy to navigate, and encourage user engagement. You are a master of writing professional and detailed case studies.\n`
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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Snapfolio - AI Case Study Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterstudy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next Case Study using AI
        </h1>
        <p className="text-slate-500 mt-5">11,938 case studies generated so far.</p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Write a short description or relevant keywords about your project{" "}
              <span className="text-slate-500">
                (or leave it blank to generate one from scratch!)
              </span>
              .
            </p>
          </div>
          <textarea
            value={study}
            onChange={(e) => setStudy(e.target.value)}
            rows={5}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. MelonBox is a beauty based subscription box service which helps you build your dream beauty collection without breaking your bank account. Get 10 full-size best selling and trendy products in the price of one, straight to your door, More glam for less money!"
            }
          />
          {/* <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div> */}

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateStudy(e)}
            >
              Generate your case study &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedStudy && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={studyRef}
                >
                  Your generated Case Study
                </h2>
              </div>
              <div className="space-y-8 flex flex-col max-w-xl mx-auto">
                {/* {generatedStudy
                  .substring(generatedStudy.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedStudy) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedStudy);
                          toast("Study copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedStudy}
                      >
                        <p>{generatedStudy}</p>
                      </div>
                    );
                  })} */}

                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedStudy);
                    toast("Case Study copied to clipboard", {
                      icon: "✅",
                    });
                  }}
                >
                    <pre className="text-left whitespace-pre-wrap break-words">{generatedStudy}</pre>
                </div>

              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
