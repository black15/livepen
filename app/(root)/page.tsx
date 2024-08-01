import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import doc from "../../public/assets/icons/documentrepo.svg";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const documents = [];

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/login");

  return (
    <main className="home-container">
      <Header classname="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4 text-gray-100">
          Notifaction
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div>hello</div>
      ) : (
        <div
          className="w-full max-w-[750px] bg-gray-50 flex flex-col gap-4 items-center justify-center rounded-md py-8"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
        >
          <Image
            src={doc}
            alt="Document"
            width={50}
            height={50}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
