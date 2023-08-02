type LabelProps = {
  labels: Labels[];
};
export default function LabelSkeleton({ labels }: LabelProps) {
  return (
    <>
      {labels.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center justify-center animate-pulse"
          >
            <dl className="grid grid-cols-2 space-x-24 space-y-1">
              <dt className="">
                <div className="relative mt-3 h-2 w-32 rounded-full bg-gray-300"></div>
              </dt>

              <dd className="">
                <progress
                  className="progress bg-gray-300 w-56 mr-3"
                  value={0}
                  max="100"
                ></progress>
              </dd>
            </dl>
          </div>
        );
      })}
    </>
  );
}
