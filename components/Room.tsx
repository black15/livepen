"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useEffect, useRef, useState } from "react";

import Header from "@/components/Header";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import editico from "../public/assets/icons/edit.svg";
import shareico from "../public/assets/icons/share.svg";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "./editor/Editor";
import ActiveUsers from "./ActiveUsers";
import Loader from "./Loader";
import { Input } from "./ui/input";
import { updateDocument } from "@/lib/actions/room.actions";

const Room = ({
  roomId,
  roomMeta,
}: {
  roomId: string;
  roomMeta: RoomMetaTypes;
}) => {
  const [title, setTitle] = useState(roomMeta.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentUserType = "editor";

  const updateTitleHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key == "Enter") {
      setLoading(true);
      try {
        const updatedRoom = await updateDocument(roomId, title);
        if (updatedRoom) {
          setEditing(false);
        }
      } catch (error) {
        console.log(error, "error updating document title");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleOutsideClick = async (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditing(false);
        await updateDocument(roomId, title);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [roomId, title, loading]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="w-full flex items-center justify-between gap-2">
              <div ref={containerRef} className="mx-auto flex gap-2">
                {editing && !loading ? (
                  <Input
                    type="text"
                    value={title}
                    ref={inputRef}
                    placeholder="Enter a title"
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => updateTitleHandler(e)}
                    className="document-title-input text-gray-100"
                  />
                ) : (
                  <>
                    <span className="text-gray-100 text-lg font-medium">
                      {title}
                    </span>
                  </>
                )}
                {loading && <p className="text-gray-100">saving ...</p>}
                {currentUserType == "editor" && !editing && (
                  <Image
                    width={20}
                    src={editico}
                    alt="Edit"
                    onClick={() => setEditing(true)}
                  />
                )}
                {currentUserType !== "editor" && !editing && (
                  <p className="view-only-tag">Read only</p>
                )}
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
                  <Image src={shareico} alt="Share" width={15} />
                  <span>Share</span>
                </Button>

                <ActiveUsers />
                <Avatar>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </Avatar>
              </div>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
