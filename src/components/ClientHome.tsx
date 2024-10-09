'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ClientHome() {
  const { user } = useUser();

  useEffect(() => {
    const createProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create profile");
        }

        const data = await response.json();
        console.log("Profile created:", data);
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    };

    if (user) {
      createProfile();
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to your Todo List, {user?.fullName}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <UserButton />
        </div>
      </div>

      {/* Todo list will be added here */}
    </main>
  );
}