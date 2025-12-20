import { useEffect, useRef } from "react";
import gsap from "gsap";

const BarLoader = () => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 1.2,
        repeat: -1,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-3xl">
      <div className="w-[60%] h-2 backdrop-blur-2xl rounded overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-white rounded"
        />
      </div>
    </div>
  );
};

export default BarLoader;
