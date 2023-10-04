import React from "react";
import { CiLaptop } from "react-icons/ci";
import { Button } from "@nextui-org/button";
import Image from "next/image";
const Herosection = () => {
  return (
    <div className="max-w-screen-lg mx-auto flex items-center flex-col xl:flex-row sm:items-center sm:justify-center">
      <div className="flex items-center flex-col md:flex-row m-8 lg:justify-center">
        <div className="flex flex-col gap-y-2">
          <p className="text-md sm:text-lg md:text-xl lg:text-2xl">
            Elevate your vocabulary.
            <br />
            Sharpen your thinking.
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Get worded
          </h1>

          <p className="text-md sm:text-lg md:text-xl lg:text-2xl md:text-right">
            Unlock the power of words
            <br />
            for clearer thinking <br />
            and effective communication
          </p>
          <Button size="lg" className="bg-[#CCD6A6] rounded-full mt-4">
            Sign up
          </Button>
        </div>
        <div className="mt-4 ml-8">
          <Image
            src="/Hero.png"
            width={300}
            height={300}
            alt="hero image glots"
            className="sm:h-[350] sm:w-[350] md:w-[450] md:h-[450] lg:w-[550] lg:h-[550]"
          />
        </div>
      </div>
    </div>
  );
};
export default Herosection;
