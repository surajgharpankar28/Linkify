"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();

  const createLinkify = () => {
    if (text.trim() === "")
      return toast.error("Please enter a handle!", {
        position: "bottom-left",
      });
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#F7F8FA] min-h-screen grid grid-cols-1 lg:grid-cols-2 py-24">
        {/* Text Content */}
        <div className="flex justify-center flex-col px-8 lg:pl-[10vw] lg:pr-4 py-12 gap-4">
          <ToastContainer />
          <h1 className="text-5xl lg:text-6xl text-[#4A4E69] font-extrabold leading-tight">
            All of you, captured in{" "}
            <span className="text-[#9A8C98] animate-color-change">
              one simple link.
            </span>{" "}
          </h1>
          <p className="text-[#6B705C] text-lg lg:text-xl pt-4 leading-relaxed">
            Create your personalized Linkify page to share everything you
            create, curate, and sell with one link. Perfect for showcasing your
            content from Instagram, TikTok, Twitter, YouTube, and more, Linkify
            brings all your social media profiles together in one place.
          </p>

          {/* Input and Button */}
          <div className="mt-6 flex flex-wrap gap-4">
            <input
              className="w-full lg:w-auto p-3 rounded-md focus:outline-[#9A8C98] text-gray-800 shadow-md placeholder-gray-500 border border-gray-300"
              type="text"
              placeholder="Enter your handle"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-[#9A8C98] text-white p-3 rounded-md font-semibold shadow-lg hover:bg-[#6B705C] transition-all duration-300"
              onClick={createLinkify}
            >
              Claim your Linkify
            </button>
          </div>
        </div>

        {/* Showcase Image */}
        <div className="flex items-center justify-center px-8 py-12 lg:pr-[15vw]">
          <Image
            src="/showcaseBG.png"
            height={900}
            width={900}
            alt="Showcase"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Placeholder for Next Section */}
      <section className="bg-[#FFE8D6] min-h-screen flex items-center justify-center">
        <h2 className="text-4xl text-[#4A4E69] font-bold flex items-center justify-center">
          More exciting features coming soon!
        </h2>
      </section>
    </main>
  );
}
