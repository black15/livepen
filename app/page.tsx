import Image from "next/image";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import editico from "../public/assets/icons/edit.svg";
import shareico from "../public/assets/icons/share.svg";

const Home = () => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-between gap-2">
          <div className="flex gap-2">
            <span>Untitled</span>
            <Image width={20} src={editico} alt="Edit" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
              <Image src={shareico} alt="Share" width={15} />
              <span>Share</span>
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Header>
      <Editor />
    </div>
  );
};

export default Home;
