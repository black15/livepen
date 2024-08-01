"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Add from "../public/assets/icons/add.svg";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const AddDocumentBtn = ({ userId, email }: AddDocumentProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) {
        router.push(`/documents/${room.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="bg-blue-600 hover:bg-blue-700 flex gap-1 shadow-md"
    >
      <Image src={Add} alt="Add" width={26} height={26} />
      <span className="hidden sm:block">Start a blank document</span>
    </Button>
  );
};

export default AddDocumentBtn;
