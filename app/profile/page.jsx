"use client";

import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import app from "../../config/firebase";
import { Button } from "@nextui-org/button";
import { useSession, signOut } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { GlotsLogo } from "@/components/ui/glotsLogo";
import exp from "constants";
import Link from "next/link";
import OpenAI from "openai";
require("dotenv").config();
const url = "https://api.openai.com/v1/completions";
const apikey = process.env.OPENAI_API_KEY ;

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
  dangerouslyAllowBrowser: true,
});

const db = getFirestore(app);

function Profile() {
  async function definition(word) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `in not more than 10 words, what is the meaning of ${word} in the simplest way I can understand. `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data.choices[0].text;
    } catch (error) {
      console.error("Error:", error);
 
      return null;
    }
  }

  // Usage
  definition()
    .then((result) => {
      console.log(result); // This will print the desired text
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  async function sentance(word) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `I want to learn the word ${word} so that I can be able to use it correctly. respond me with only a simple example phrase that will help me understand the best use of the word. do not explain. do not use quotes.
            `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data.choices[0].text;
    } catch (error) {
      console.error("Error:", error);
      // Handle the error appropriately or return an error value if needed
      return null;
    }
  }

  // Usage
  sentance("")
    .then((result) => {
      console.log(result); // This will print the desired text
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const [wordInput, setWordInput] = useState("");
  const [words, setWords] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const colRef = collection(db, "words");
    const q = query(colRef, orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const newWords = snapshot.docs.map((doc) => ({
        id: doc.id,
        word: doc.data().word,
        define: doc.data().define,
        example: doc.data().example,
      }));
      setWords(newWords);
    });
  }, []);

  const handleDeleteChecked = async () => {
    const promises = Object.keys(checkedItems)
      .filter((id) => checkedItems[id])
      .map((id) => deleteDoc(doc(db, "words", id)));

    await Promise.all(promises);
  };

  const toggleCheck = (id) => {
    setCheckedItems((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const [editingWordId, setEditingWordId] = useState(null); // Track the ID of the word being edited

  // ... (useEffect and other functions)

  const handleEditWord = () => {
    const checkedWordIds = Object.keys(checkedItems).filter(
      (id) => checkedItems[id],
    );

    if (checkedWordIds.length !== 1) {
      alert("Select one word to edit");
      return;
    }

    const wordToEdit = words.find((w) => w.id === checkedWordIds[0]);
    if (wordToEdit) {
      setWordInput(wordToEdit.word);
      setEditingWordId(wordToEdit.id); // Set the ID of the word being edited
    }
  };

  const [wordData, setWordData] = useState({}); // State to store word data

  // Function to fetch definition and example data for a word
  const fetchWordData = async (word) => {
    const wordDefinition = await definition(word); // Await the result
    const wordExample = await sentance(word); // Await the result
    return { define: wordDefinition, example: wordExample };
  };

  const handleAddWord = async () => {
    if (wordInput.trim()) {
      const lowercaseWord = wordInput.trim().toLowerCase(); // Convert word to lowercase
      const colRef = collection(db, "words");
  
      // Check if the word already exists
      const queryRef = query(colRef, where("word", "==", lowercaseWord));
      const querySnapshot = await getDocs(queryRef);
  
      if (querySnapshot.size > 0) {
        // Word already exists, handle it (e.g., show an error message)
        alert("This word already exists in the database.");
      } else {
        try {
          if (editingWordId) {
            // If in edit mode, update the existing word
            const docRef = doc(db, "words", editingWordId);
            await updateDoc(docRef, { word: lowercaseWord }); // Store in lowercase
            setEditingWordId(null); // Reset editing state
          } else {
            // Otherwise, add a new word
            const wordDefinition = await fetchWordData(lowercaseWord); // Fetch data
  
            // Check if wordDefinition is valid before accessing its properties
            if (wordDefinition && wordDefinition.define && wordDefinition.example) {
              await addDoc(colRef, {
                word: lowercaseWord, // Store in lowercase
                createdAt: serverTimestamp(),
                define: wordDefinition.define.toString(), // Store the result
                example: wordDefinition.example.toString(), // Store the result
              });
  
              setWordInput("");
              console.log(wordDefinition.define.toString());
              console.log(wordDefinition.example.toString());
  
              // Update the wordData state to avoid future API calls for this word
              setWordData((prevWordData) => ({
                ...prevWordData,
                [wordInput]: wordDefinition,
              }));
            } else {
              alert("Failed to fetch word definition and example.");
            }
          }
        } catch (error) {
          console.error("Error adding/editing word:", error);
          // Handle the error appropriately or show an error message
        }
      }
    }
  };
  

  return (
    <main className="max-w-screen-lg mx-auto">
      <div>
        <div className="flex p-6 justify-between">
          <GlotsLogo />

          <h1 className="hover:text-red-500" onClick={handleLogout}>
            Log out
          </h1>
        </div>

        <div className="flex justify-center items-center">
          <button className="py-2 px-4 bg-[#F4EAD5] rounded-md m-4">
            Learning
          </button>
          <button className="py-2 px-4 bg-[#CCD6A6] rounded-md">
            Mastered
          </button>
        </div>
      </div>

      <div>
        <Accordion type="single" collapsible className="w-full">
          {words.map(({ id, word, define, example }) => (
            <AccordionItem value={id} className="" key={id}>
              <AccordionTrigger className="mx-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 mr-2"
                  checked={checkedItems[id] || false}
                  onChange={() => toggleCheck(id)}
                />
                <Link href={`/profile/${id}`}>{word}</Link>
              </AccordionTrigger>
              <AccordionContent className="text-center">
                <div className="bg-yellow-300">
                  <h3 className="bg-green-800">{define}</h3>
                  <h4>{example}</h4>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="sticky bottom-0 left-0 right-0 p-4 flex items-center justify-center bg-white lg:left-1/4 lg:right-1/4">
        <div className="flex justify-end mr-5 gap-x-4">
          <Image
            src="/delete.svg"
            width={20}
            height={20}
            alt="delete"
            onClick={handleDeleteChecked} // Added onClick listener
          />

          <Image
            src="/edit.svg"
            width={20}
            height={20}
            alt="edit"
            onClick={handleEditWord} // Bind the click event to the edit function
          />
          <Image
            src="/done.svg"
            width={20}
            height={20}
            alt="done"
            //onClick={handleDone} // Bind the click event to the done function
          />
        </div>
        <input
          className="border-2 border-gray-300 rounded-md px-4 py-2 flex-1 focus:outline-none focus:border-blue-500 transition duration-200 mx-4 "
          type="text"
          placeholder="Enter Word..."
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
        />
        <Button color="primary" onClick={handleAddWord}>
          {editingWordId ? "Update" : "Add"}
        </Button>
      </div>
    </main>
  );
}

export default Profile;
