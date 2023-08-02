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

type Labels = {
  label: string;
  confidence: number;
};
