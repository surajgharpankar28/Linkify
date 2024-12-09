import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaLink,
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
    } else if (link.includes("x.com") || link.includes("twitter.com")) {
      return <FaTwitter className="text-white" />;
    } else if (link.includes("http") || link.includes("www")) {
      return <FaGlobe className="text-white" />;
    }
    // Default icon for links that don't match specific keywords
    return <FaLink className="text-white" />;
  };

  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("linkify");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });
  if (!item) {
    return notFound();
  }
  return (
    <div className="flex min-h-screen bg-purple-400 justify-center items-center py-10">
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        {/* Profile Picture and Handle */}
        <div className="photo flex flex-col justify-center items-center mb-6">
          <Image
            className="rounded-full"
            src={item.profilePic}
            height={90}
            width={90}
            alt="profilePic"
          />
          <span className="font-bold text-2xl text-purple-700 mt-4">
            @{item.handle}
          </span>
          <span className="text-md">{item.description}</span>
        </div>

        {/* Links Section */}
        <div className="links w-full flex flex-col gap-4 justify-center align-middle">
          {item.links.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 justify-center  text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center gap-3"
            >
              {getIconForLink(link.link)} {/* Display Icon */}
              {link.linkName.charAt(0).toUpperCase() + link.linkName.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
