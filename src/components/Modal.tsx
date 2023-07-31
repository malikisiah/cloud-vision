export default function Modal() {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-80"></div>
      <div className="flex items-center justify-center align-middle min-h-screen px-4 py-8">
        <div className="relative max-w-lg p-4 bg-transparent">
          <span className=" text-secondary loading loading-infinity w-24 h-24"></span>
        </div>
      </div>
    </div>
  );
}
