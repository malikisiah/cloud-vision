"use client";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import Skeleton from "./Skeleton";
export default function LabelsDemo() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>("/wallhaven-eye92l.jpg");
  const [loading, setLoading] = useState<boolean>(false);

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
              <Skeleton />
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
              It is also possible to detect labels in a given image, such as
              glasses, objects in the background or anything else of the sort
              <br />
              Upload a jpg or png image to see for yourself!
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
    </section>
  );
}
