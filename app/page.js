"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, settext] = useState("");
  const claimTree = () => {
    // send the inputted text as handle to the generate component using router and acccess the handler value in generate using searchparams
    router.push(`/generate?handle=${text}`);
  };
  return (
    <main>
      <section className="bg-[#254F1A] grid grid-cols-1 sm:grid-cols-2 min-h-[130vh] pt-30 sm:pt-0">
        {/* here comes a grid with 2 columns one containing a text and another an image */}
        <div className="col1 flex justify-center gap-3 flex-col px-4 sm:ml-[10vw]">
          <h1 className="text-wrap text-4xl sm:text-7xl text-[#D2E823] font-extrabold">
            Everything you are. In one, simple link in bio.
          </h1>
          <p className="text-[#D2E823] text-lg sm:text-sm font-medium">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          {/* input field and button */}
          <div className="input flex flex-col px-10 justify-center items-center mb-20 sm:flex sm:flex-row gap-3">
            <input
              value={text}
              type="text"
              placeholder="Enter your handle"
              className="bg-white rounded-lg p-4 focus:outline-green-700"
              onChange={(e) => settext(e.target.value)}
            />
            <button
              className="rounded-full bg-[#e9c0e9] p-5 font-normal text-[#1e2348] cursor-pointer"
              onClick={() => claimTree()}
            >
              Claim your LinkCanopy
            </button>
          </div>
        </div>
        <div className="col2 flex justify-center items-center flex-col sm:mr-[10vw]">
          <img src="/home.png" alt="home" />
        </div>
      </section>

      <section className="bg-[#E9C0E9] grid-cols-1 sm:grid-cols-2 min-h-[60vh] pt-30 sm:pt-10">
        <div className="flex flex-col sm:flex sm:flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-start sm:px-4 ml-[10vw] gap-3 w-30% pb-2.5">
            <h1 className="text-wrap text-4xl sm:text-7xl text-[#502274] font-extrabold">
              Create and customize your LinkCanopy in minutes
            </h1>
            <p className="text-[#502274] text-lg sm:text-sm font-medium">
              Connect your TikTok, Instagram, Twitter, website, store, videos,
              music, podcast, events and more.
            </p>
            <p className="text-[#502274] text-lg sm:text-sm font-medium">It all comes together in a link
            in bio landing page designed to convert.</p>
            <button
              className="rounded-full bg-[#502274] p-5 font-normal text-white cursor-pointer"
              onClick={() => router.push("/generate")}
            >
              Get started for free
            </button>
          </div>

          <div className="sm:mr-[10vw] w-50%">
            <img src="/home2.png" alt="home" className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}
