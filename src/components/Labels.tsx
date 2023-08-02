type LabelProps = {
  labels: Labels[];
};

export default function Labels({ labels }: LabelProps) {
  return (
    <>
      {labels.map((item, idx) => {
        return (
          <div key={idx} className="flex items-center justify-center">
            {" "}
            <dl className="grid grid-cols-2 md:space-x-24 space-y-1">
              <dt className="font-semibold mt-2">{item.label}</dt>

              <dd className="">
                <progress
                  className="progress progress-primary w-56 mr-3"
                  value={item.confidence}
                  max="100"
                ></progress>
                {Math.floor(item.confidence)}%
              </dd>
            </dl>
          </div>
        );
      })}
    </>
  );
}
