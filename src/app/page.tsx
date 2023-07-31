import Image from "next/image";
import FileInput from "../components/FileInput";
import Modal from "@/components/Modal";

export default function Home() {
  return (
    <div className=" flex items-center justify-center min-h-screen bg-base-300">
      <FileInput />
      {/* <Modal /> */}
    </div>
  );
}
