import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@nextui-org/button";

export const Testimonials = () => {
  return (
    <div className="max-w-screen-lg mx-auto text-center">
      <p className="text-center m-8 mt-16 text-2xl">Testimonials</p>

      <div className="flex justify-center gap-4 m-4">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>{" "}
          <p className=" text-justify m-2 text-sm">
            Vocabulary App has been a game-changer for me. I used to struggle
            with finding the right words, but this app has expanded my
            vocabulary in no time. Highly recommended!
          </p>
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </Avatar>{" "}
          <p className="m-2 text-sm text-justify ">
            As a non-native English speaker, I've always wanted to improve my
            English skills. Thanks to Vocabulary App, I feel more confident than
            ever. It's user-friendly and effective.
          </p>
        </div>

        <div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          </Avatar>{" "}
          <p className="m-2 text-sm text-justify">
            I use Vocabulary App every day to learn new words. The daily
            challenges keep me engaged, and I've noticed a significant
            improvement in my writing and speaking skills.
          </p>
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          </Avatar>{" "}
          <p className="m-2 text-sm text-justify">
            I've tried several vocabulary apps before, but this one stands out.
            The flashcards and quizzes are fun, and I love how it tracks my
            progress. It's like having a personal vocabulary coach!
          </p>
        </div>
      </div>
      <Button size="lg" className="bg-[#CCD6A6] rounded-full my-6">
        Sign up
      </Button>
    </div>
  );
};
export default Testimonials;
