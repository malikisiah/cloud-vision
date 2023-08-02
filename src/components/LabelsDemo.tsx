"use client";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import ImageSkeleton from "./ImageSkeleton";
import Labels from "./Labels";
import LabelSkeleton from "./LabelSkeleton";
export default function LabelsDemo() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>("/wallhaven-13oeov.jpg");
  const [loading, setLoading] = useState<boolean>(false);
  const [labels, setLabels] = useState<Labels[]>([
    { label: "Architecture", confidence: 99.99996185302734 },
    { label: "Building", confidence: 99.99996185302734 },

    { label: "Cityscape", confidence: 99.99996185302734 },

    { label: "Urban", confidence: 99.99996185302734 },

    { label: "City", confidence: 99.98231506347656 },

    { label: "Face", confidence: 98.53372192382812 },

    { label: "Head", confidence: 98.53372192382812 },

    { label: "Person", confidence: 98.53372192382812 },

    { label: "Selfie", confidence: 98.53372192382812 },

    { label: "Adult", confidence: 96.10157012939453 },

    { label: "Male", confidence: 96.10157012939453 },

    { label: "Man", confidence: 96.10157012939453 },

    { label: "Clothing", confidence: 95.932373046875 },

    { label: "Footwear", confidence: 95.932373046875 },

    { label: "Shoe", confidence: 95.932373046875 },

    { label: "Outdoors", confidence: 89.08931732177734 },

    { label: "High Rise", confidence: 82.45134735107422 },

    { label: "Wristwatch", confidence: 78.83476257324219 },

    { label: "Indoors", confidence: 67.03498077392578 },

    { label: "Office Building", confidence: 57.45750045776367 },

    { label: "Metropolis", confidence: 56.87534713745117 },

    { label: "Aerial View", confidence: 56.83830261230469 },

    { label: "Body Part", confidence: 55.88993835449219 },

    { label: "Hand", confidence: 55.88993835449219 },

    { label: "Condo", confidence: 55.39098358154297 },

    { label: "Housing", confidence: 55.39098358154297 },

    { label: "Tower", confidence: 55.01219177246094 },
  ]);

  useEffect(() => {
    const postRequest = async () => {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL as string;
      const requestBody = {
        action: "detectLabel",
        image: imageData,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);

      const tempLabels: Labels[] = data.map((item: any) => ({
        label: item.Name,
        confidence: item.Confidence,
      }));
      setLabels(tempLabels);
      setLoading(false);
    };
    if (imageData) {
      postRequest();
    }
  }, [imageData]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const tempURL = URL.createObjectURL(file);

    setImageURL(tempURL);

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const data = event.target.result as string;
        const marker = "base64";
        const index = data.indexOf(marker) + marker.length;

        setImageData(data.slice(index));
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <section className="bg-base-200 text-base-content min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            {loading ? (
              <ImageSkeleton />
            ) : (
              <Image
                src={imageURL}
                alt=""
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover"
                quality={100}
                priority={true}
              />
            )}
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Detect Labels</h2>

            <p className="mt-4 h-24 ">
              It is also possible to detect labels in a given image, with each
              label given a confidence on how certain the model is that the
              label exists in the image.
            </p>

            <div className="bg-base-200 pt-4">
              <input
                type="file"
                className="file-input w-full max-w-xs text-base-content"
                accept="image/x-png, image/jpeg"
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? <LabelSkeleton labels={labels} /> : <Labels labels={labels} />}
    </section>
  );
}
