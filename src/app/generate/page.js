"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Generate = () => {
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [profilePic, setProfilePic] = useState("");
  const [links, setLinks] = useState([{ linkName: "", link: "" }]);
  const [description, setDescription] = useState("");

  // Regex to validate URLs
  const isValidURL = (url) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;
    return regex.test(url);
  };

  const handleChange = (index, field, value) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat([{ linkName: "", link: "" }]));
  };

  const validateLinks = () => {
    let isValid = true;

    // Check for empty links or invalid URLs
    links.forEach((link, linkName, index) => {
      if (link.link.trim() !== "" && !isValidURL(link.link)) {
        isValid = false;
        toast.error(`Please enter a valid URL for ${link.linkName}`, {
          position: "bottom-left",
          theme: "colored",
        });
      }
    });

    return isValid;
  };

  const submitLinks = async () => {
    // Validate URLs before proceeding
    if (!validateLinks()) {
      return; // Stop if any URL is invalid
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Filter out empty links or linkNames
    const filteredLinks = links.filter(
      (link) => link.link.trim() !== "" && link.linkName.trim() !== ""
    );

    // Check if handle is empty
    if (handle.trim() === "") {
      toast.info("Please add your Handle.", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    // Check if all links are empty
    if (filteredLinks.length === 0) {
      toast.info("Please add at least one valid link name and link.", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    // Check if profile picture is empty
    if (profilePic.length === 0) {
      toast.info("Please add profile picture link.", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    const raw = JSON.stringify({
      links: filteredLinks,
      profilePic: profilePic,
      handle: handle.trim(), // Optional: trim whitespace from the handle
      description: description,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const req = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await req.json();
    if (result.success) {
      toast.success(result.message, {
        position: "bottom-left",
        theme: "colored",
      });
      setLinks([{ linkName: "", link: "" }]);
      setHandle("");
      setProfilePic("");
      setDescription("");
    } else {
      toast.error(result.message, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="bg-[#235ABE] min-h-screen grid grid-cols-2 border">
      {/* Left Section */}
      <div className="bg-white flex justify-center items-center flex-col px-6 py-12">
        <ToastContainer />
        <h1 className="text-4xl font-bold text-[#235ABE] mb-8">
          Create your Linkify
        </h1>

        <div className="flex flex-col gap-10 w-full max-w-lg">
          {/* Step 1: Claim Handle */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 1. Claim your Handle
            </h2>
            <input
              onChange={(e) => setHandle(e.target.value)}
              value={handle}
              className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
              type="text"
              placeholder="Your Linkify Handle"
              required
            />
          </div>

          {/* Step 2: Add Links */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 2. Add Links
            </h2>
            <div className="space-y-4">
              {links?.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    onChange={(e) => {
                      handleChange(index, "linkName", e.target.value);
                    }}
                    value={item.linkName}
                    className="flex-1 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
                    type="text"
                    placeholder="Enter link name"
                  />
                  <div className="flex-1">
                    <input
                      onChange={(e) =>
                        handleChange(index, "link", e.target.value)
                      }
                      value={item.link}
                      className="flex-1 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
                      type="text"
                      placeholder="Enter link"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="px-6 py-3 text-blue-700 underline font-semibold rounded-lg cursor-pointer hover:text-[#1a4196] transition"
                onClick={() => addLink()}
              >
                Add Link
              </button>
            </div>
          </div>

          {/* Step 3. Add Linkify Profile Link */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 3. Add Linkify Profile Pic and Description
            </h2>
            <input
              onChange={(e) => setProfilePic(e.target.value)}
              value={profilePic}
              className="w-full p-4 mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
              type="text"
              placeholder="Your Linkify Profile Link"
              required
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
              placeholder="Enter Description"
              rows="2" // Adjust rows for height
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              onClick={() => submitLinks()}
            >
              Submit your Linkify
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full flex justify-center h-screen">
        <img
          className="h-full object-cover"
          src="/generate.png"
          alt="banner_image"
        />
      </div>
    </div>
  );
};

export default Generate;
