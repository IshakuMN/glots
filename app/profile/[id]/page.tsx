import React from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import app from "../../../config/firebase";
import { DivideIcon } from "lucide-react";
import { GlotsLogo } from "@/components/ui/glotsLogo";
import Image from "next/image";
import { LiaGrinTongueSolid } from "react-icons/lia";
import Link from "next/link";

const db = getFirestore(app);

interface WordProps {
  params: {
    id: string;
  };
}

export async function getStaticPaths() {
  // Get words from DB
  const querySnapshot = await getDocs(collection(db, "words"));
  const paths: any = [];

  querySnapshot.forEach((doc) => {
    paths.push({
      params: {
        id: doc.id,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export default async function Word({ params }: WordProps) {
  const docWord = await getDefinition(params.id);

  // Add a conditional check to ensure docWord is defined before accessing its properties
  if (!docWord) {
    return <div>Loading...</div>; // You can replace this with a loading indicator or an error message
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <Link href="/profile">
        <GlotsLogo />
      </Link>

      <div className="flex-col text-center py-20">
        <h1 title="word definition" className="text-xl text-right ">{docWord.define}</h1>
        <h1 title='the word'  className="text-6xl bg-yellow-100 bg-rounded-full md:text-8xl">
          {docWord.word}
        </h1>
        <h1 title='example sentence' className="text-xl text-left py-3">{docWord.example}</h1>
      </div>
    </div>
  );
}

async function getDefinition(id: string) {
  const docSnap = await getDoc(doc(db, "words", id));
  return docSnap.data();
}
