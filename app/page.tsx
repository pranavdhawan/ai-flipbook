import HomeUI from "./components/HomeUI";
import prisma from "@/lib/prisma";
import { BookExcerpt } from "@prisma/client";

export const revalidate = 0

export default async function Home() {
  const data = await prisma.bookExcerpt.findMany()
  // console.log(data.length)

  return (
    <HomeUI data={data as BookExcerpt[]} />
  );
}
