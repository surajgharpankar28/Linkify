/* eslint-disable @next/next/no-img-element */
"use client";
import { Suspense } from "react";
import GenerateComponent from "@/components/GenerateComponent";

// Ensures this code runs on the client side

const Generate = () => {
  return;
  <Suspense fallback={<div>Loading...</div>}>
    <GenerateComponent />
  </Suspense>;
};

export default Generate;
