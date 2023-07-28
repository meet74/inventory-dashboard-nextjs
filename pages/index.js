"use client";
import HomePage from "@/components/Home";
import SideBar from "../components/SideBar";


export default function Home() {
  
  return (
    <main className="flex">
      <SideBar />
      <HomePage/>
    </main>
  );
}
