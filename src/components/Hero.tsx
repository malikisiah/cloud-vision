"use client";

export default function Hero() {
  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  return (
    <div
      className="hero min-h-screen text-neutral-content"
      style={{
        backgroundImage: "url(/wallhaven-4l76dy.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Cloud Vision</h1>
          <p className="mb-5">Using AI to detect and identify images</p>
          <button className="btn btn-primary" onClick={handleClick}>
            Check it Out
          </button>
        </div>
      </div>
    </div>
  );
}
