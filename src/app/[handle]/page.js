import clientPromise from "@/lib/mongodb";
import ProfilePic from "@/components/ProfilePic"; // Import the Client Component

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaLink,
  FaSpotify,
  FaSoundcloud,
  FaYoutube,
} from "react-icons/fa"; // Import icons from react-icons

export default async function Page({ params }) {
  const getIconForLink = (link) => {
    if (link.includes("github.com")) {
      return <FaGithub className="text-white" />;
    } else if (link.includes("linkedin.com")) {
      return <FaLinkedin className="text-white" />;
    } else if (link.includes("instagram.com")) {
      return <FaInstagram className="text-white" />;
    } else if (link.includes("facebook.com")) {
      return <FaFacebook className="text-white" />;
    } else if (
      link.includes("/x.com") ||
      link.includes(".x.com") ||
      link.includes("twitter.com")
    ) {
      return <FaTwitter className="text-white" />;
    } else if (link.includes("spotify.com")) {
      return <FaSpotify className="text-white" />;
    } else if (link.includes("youtube.com") || link.includes("youtu.be")) {
      return <FaYoutube className="text-white" />;
    } else if (link.includes("soundcloud.com")) {
      return <FaSoundcloud className="text-white" />;
    } else if (link.includes("http") || link.includes("www")) {
      return <FaGlobe className="text-white" />;
    }
    return <FaLink className="text-white" />;
  };

  const handle = (await params).handle.toLowerCase(); // Convert handle to lowercase
  const client = await clientPromise;
  const db = client.db("linkify");
  const collection = db.collection("links");

  const item = await collection.findOne({
    handle: { $regex: `^${handle}$`, $options: "i" },
  });
  if (!item) {
    return notFound();
  }

  // Function to check if the profile pic URL is valid
  const isValidProfilePicUrl = (url) => {
    try {
      const imageUrl = new URL(url); // Parse the URL to validate its structure
      const isHttpOrHttps =
        imageUrl.protocol === "http:" || imageUrl.protocol === "https:";

      return isHttpOrHttps;
    } catch (error) {
      return false; // If URL parsing fails, it's invalid
    }
  };

  // Use fallback default image if the profile pic URL is invalid
  const profilePicUrl = isValidProfilePicUrl(item.profilePic)
    ? item.profilePic
    : "/defaultProfilePic.png";

  return (
    <>
      <div className="flex min-h-screen bg-pastel-blue justify-center items-center py-10">
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          {/* Profile Picture and Handle */}
          <div className="photo flex flex-col justify-center items-center mb-6">
            <ProfilePic profilePicUrl={profilePicUrl} />{" "}
            {/* Used Client Component here - ProfilePic*/}
            <span className="font-bold text-2xl text-purple-700 mt-4">
              @{item.handle}
            </span>
            <span
              className="text-md break-words overflow-hidden text-ellipsis whitespace-normal"
              style={{ wordBreak: "break-word", maxWidth: "100%" }}
            >
              {item.description}
            </span>
          </div>

          {/* Links Section */}
          <div className="links w-full flex flex-col gap-4 justify-center align-middle">
            {item.links.map((link, index) => {
              const normalizedLink =
                link.link.startsWith("http://") ||
                link.link.startsWith("https://")
                  ? link.link
                  : `https://${link.link}`; // Ensure the link has http/https protocol

              return (
                <a
                  key={index}
                  href={normalizedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 justify-center text-white py-3 px-4 rounded-lg hover:bg-pastel-blue hover:text-black transition-all duration-300 flex items-center gap-3"
                >
                  {getIconForLink(normalizedLink)} {/* Display Icon */}
                  {link.linkName.charAt(0).toUpperCase() +
                    link.linkName.slice(1)}
                </a>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col">
            <span className="text-sm">Want to make your own Linkify?</span>
            <Link
              className="text-sm text-blue-600 hover:underline "
              href="/"
              target="_blank"
            >
              Click here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
