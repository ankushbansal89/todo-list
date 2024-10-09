import ClientHome from '@/components/ClientHome';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <ClientHome />;
}
