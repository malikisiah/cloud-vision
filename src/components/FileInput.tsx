"use client";
import { useState, ChangeEvent, useEffect } from "react";
import ImageWithBox from "./ImageWithBox";
export default function FileInput() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>("/20230722_1207371.jpg");
  const [loading, setLoading] = useState<boolean>(false);
  const [boundingBox, setBoundingBox] = useState<BoundingBox>({
    Width: 0.3820298910140991,
    Height: 0.5489766001701355,
    Left: 0.2164023071527481,
    Top: 0.16257436573505402,
  });

  useEffect(() => {
    const postRequest = async () => {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL as string;
      const requestBody = {
        action: "detectFace",
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
      setBoundingBox(data[0].BoundingBox);
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
    <div>
      <input
        type="file"
        className="file-input w-full max-w-xs text-black"
        accept="image/*"
        onChange={handleInput}
      />
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <span className="text-black loading loading-bars w-14 h-14" />{" "}
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <ImageWithBox imageURL={imageURL} boundingBox={boundingBox} />{" "}
        </div>
      )}
    </div>
  );
}
