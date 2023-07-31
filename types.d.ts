type BoundingBox = {
  Width: number;
  Height: number;
  Left: number;
  Top: number;
};

type ImageProps = {
  imageURL: string;
  boundingBox: BoundingBox;
};
