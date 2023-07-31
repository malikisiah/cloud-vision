"use client";
import { useEffect, useRef } from "react";

export default function ImageWithBox({ imageURL, boundingBox }: ImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    drawBoundingBox(boundingBox);
  });

  const drawBoundingBox = (box: BoundingBox) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error("Error");
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Error");
    }
    const img = new Image();

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 3; // You can set any width you want
      ctx.strokeStyle = "white"; // You can set any color you want
      ctx.rect(
        box.Left * canvas.width,
        box.Top * canvas.height,
        box.Width * canvas.width,
        box.Height * canvas.height
      );
      ctx.stroke();
    };
    img.src = imageURL;
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </>
  );
}
