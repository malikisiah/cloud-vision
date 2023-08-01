import Hero from "@/components/Hero";
import FacesDemo from "@/components/FacesDemo";
import LabelsDemo from "@/components/LabelsDemo";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex-col space-y-16 bg-base-200 pt-32">
        <FacesDemo />
        <LabelsDemo />
      </div>
    </>
  );
}
