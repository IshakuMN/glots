import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import Image from "next/image";
import { BiSolidExtension } from "react-icons/bi";
import { CgEreader } from "react-icons/cg";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TbLanguageKatakana as Language } from "react-icons/tb";
import { Button } from "@nextui-org/button";
const Features = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-center mb-4 text-2xl">Features</h1>
      <div className="flex flex-col text-center sm:flex-row sm:justify-center">
        <div className="my-4">
          <Card className="inline-block py-4 mx-4 bg-[#F4EAD5]">
            <CardHeader>Extension</CardHeader>
            <BiSolidExtension className="text-9xl p-4" />
          </Card>

          <Card className="inline-block py-4 mx-4 bg-[#E1EEFF]">
            <CardHeader>Reader</CardHeader>
            <CgEreader className="text-9xl p-4" />
          </Card>
        </div>

        <div>
          <Card className="inline-block py-4 mx-4 bg-[#E5CFF7]">
            <CardHeader>Assistant</CardHeader>
            <HiOutlineChatAlt2 className="text-9xl p-4" />
          </Card>

          <Card className="inline-block py-4 mx-4 bg-[#BFD8D5]">
            <CardHeader>Language</CardHeader>
            <Language className="text-9xl p-4" />
          </Card>
        </div>
      </div>

      <div className="flex m-8 justify-center">
        <Button className="mx-4 text-white bg-gray-800">Get Extension</Button>
        <Button className="bg-white border-2 border-black">Get App</Button>
      </div>
    </div>
  );
};

export default Features;
