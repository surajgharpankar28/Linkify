"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();
  const createLinkify = () => {
    router.push(`/generate?handle=${text}`);
  };
  return (
    <main>
      <section className="bg-[#274F1B] min-h-[100vh] grid grid-cols-2">
        <div className="flex justify-center flex-col mx-[10vw] gap-2">
          <p className="text-6xl text-yellow-500 font-bold">All of you, </p>{" "}
          <p className="text-6xl text-yellow-500 font-bold">captured in</p>
          <p className="text-6xl text-yellow-500 font-bold">
            {" "}
            one simple link.
          </p>
          <p className="text-yellow-300 text-xl pt-4">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="mt-4">
            <input
              className="p-2 rounded-md focus:outline-[#274F1B]"
              type="text"
              placeholder="enter your handle"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              className="bg-green-500 p-2 ml-2 rounded-lg font-semibold rounded-m"
              onClick={() => createLinkify()}
            >
              Claim your Linkify
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mx-[10vw]">
          <Image src="/showcase.jpg" height={900} width={900} alt="showcase" />
        </div>
      </section>
      <section className="bg-red-600 min-h-[100vh]"></section>
    </main>
  );
}
