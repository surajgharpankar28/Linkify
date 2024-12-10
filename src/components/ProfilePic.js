"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProfilePic({ profilePicUrl }) {
  const [imageSrc, setImageSrc] = useState(profilePicUrl);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Fallback function for image error
  const handleImageError = () => {
    setImageSrc("/defaultProfilePic.png"); // Set to default image if error occurs
  };

  // Image onLoad event handler
  const handleImageLoad = () => {
    setIsLoading(false); // Hide shimmer once image has loaded
  };

  return (
    <div className="relative flex justify-center items-center">
      {/* Shimmer effect will be shown while loading */}
      {isLoading && (
        <div className="absolute w-24 h-24 bg-gray-200 animate-pulse rounded-full" />
      )}

      {/* The actual image */}
      <Image
        className={`rounded-full h-24 w-24 object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`} // Hide image during loading, use 'opacity-0'
        src={imageSrc}
        height={100}
        width={100}
        alt="profilePic"
        onError={handleImageError} // Handle image loading error
        onLoad={handleImageLoad} // Set the loading state to false once the image loads
      />
    </div>
  );
}
