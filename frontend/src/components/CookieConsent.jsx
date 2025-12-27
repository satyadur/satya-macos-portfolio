import { useEffect, useState } from "react";
import api from "../lib/axios";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = async () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
      await api.post("/visit");
    } catch (err) {
      console.error(err);
    } finally {
      setVisible(false);
    }
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[720px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4
        rounded-2xl border border-white/20
        bg-white/10 backdrop-blur-xl
        shadow-2xl px-6 py-4 text-white">

        <p className="text-sm text-white/90 leading-relaxed">
          This portfolio uses <span className="font-medium">anonymous analytics</span>{" "} 
          to understand how visitors interact with the site. No personal data is stored.
        </p>

        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 cursor-pointer py-2 rounded-xl text-sm
              bg-white/10 hover:bg-white/20
              border border-white/20
              transition-all"
          >
            Reject
          </button>

          <button
            onClick={acceptCookies}
            className="px-5 py-2 cursor-pointer rounded-xl text-sm font-medium
              bg-linear-to-b from-white/90 to-white/70
              text-black hover:from-white hover:to-white
              transition-all shadow"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
