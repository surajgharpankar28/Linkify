/* eslint-disable @next/next/no-img-element */
"use client"; // Ensures this code runs on the client side

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { FaTimes } from "react-icons/fa"; // Import icons from react-icons

const Generate = () => {
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [links, setLinks] = useState([{ linkName: "", link: "" }]);
  const [description, setDescription] = useState("");

  // Fetch the handle from the query params and set it on component mount
  useEffect(() => {
    const handleParam = searchParams.get("handle");
    if (handleParam) {
      setHandle(handleParam);
    }
  }, [searchParams]); // Will run when searchParams change

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

  const deleteLink = (index) => {
    setLinks((initialLinks) => initialLinks.filter((_, i) => i !== index));
  };

  const validateLinks = () => {
    let isValid = true;

    links.forEach((link) => {
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
    if (handle?.trim() === "") {
      toast.info("Please add your Handle.", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    if (filteredLinks.length === 0) {
      toast.info("Please add at least one valid link name and link.", {
        position: "bottom-left",
        theme: "colored",
      });
      return;
    }

    // if (profilePic.length === 0) {
    //   toast.info("Please add profile picture link.", {
    //     position: "bottom-left",
    //     theme: "colored",
    //   });
    //   return;
    // }

    if (!isValidURL(profilePic.trim())) {
      toast.error("Please enter a valid profile picture URL.", {
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

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/add`,
      requestOptions
    );
    const result = await req.json();
    if (result.success) {
      toast.success(
        <div>
          {result.message} 🎉{" "}
          <a
            href={`/${result.result.handle}`} // Redirect to the generated page
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View your Linkify
          </a>
        </div>,
        {
          position: "bottom-left",
          autoClose: 5000, // Adjust auto-close time as needed
        }
      );

      setLinks([{ linkName: "", link: "" }]);
      setProfilePic("");
      setDescription("");
    } else {
      toast.error(result.message, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="bg-[#235ABE] min-h-screen flex flex-col lg:flex-row border">
      {/* First Div - Form Container */}
      <div className="bg-white flex flex-col   justify-start items-center px-6 py-28 w-full lg:w-1/2">
        <ToastContainer />

        {/* Heading with sticky positioning */}
        <h1 className="text-4xl font-bold text-[#235ABE] mb-8  bg-white py-4 z-10">
          Create your Linkify
        </h1>

        <div className="flex flex-col gap-10 w-full max-w-lg flex-grow">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 1. Claim your Handle
            </h2>
            <input
              onChange={(e) => setHandle(e.target.value)}
              value={handle || ""}
              className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
              type="text"
              placeholder="Your Linkify Handle"
              required
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 2. Add Links
            </h2>
            <div className="space-y-4">
              {links?.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  {/* Link Name Input */}
                  <input
                    onChange={(e) =>
                      handleChange(index, "linkName", e.target.value)
                    }
                    value={item.linkName}
                    className="w-1/4 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
                    type="text"
                    placeholder="Link name"
                  />

                  {/* Link URL Input */}
                  <input
                    onChange={(e) =>
                      handleChange(index, "link", e.target.value)
                    }
                    value={item.link}
                    className="w-3/4 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#235ABE] rounded-lg shadow-md"
                    type="text"
                    placeholder="Enter link URL"
                  />

                  {/* Delete Button */}
                  {links.length > 1 ? (
                    <button
                      onClick={() => deleteLink(index)}
                      className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:text-black transition"
                    >
                      <FaTimes className=" cursor-pointer" />
                    </button>
                  ) : (
                    ""
                  )}
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

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 3. Add Linkify Profile Link
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
              rows="2"
              required
            />
          </div>

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

      {/* Second Div - Image Container */}
      <div className="w-full lg:w-1/2 flex justify-center h-screen mt-6 lg:mt-0">
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
