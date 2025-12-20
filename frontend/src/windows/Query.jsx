import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";

const Query = () => {
  const formRef = useRef(null);
  const firstInputRef = useRef(null);
  const [status, setStatus] = useState("idle");

  // 🔥 Force focus when window opens
  useEffect(() => {
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 80); // small delay for GSAP / WindowWrapper

    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_xxx",   // 🔴 replace
        "template_xxx",  // 🔴 replace
        formRef.current,
        "public_xxx"     // 🔴 replace
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
          firstInputRef.current?.focus(); // focus again after submit
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div id="window-header" className="flex items-center gap-3">
        <WindowControls target="query" />
        <h2 className="text-sm font-semibold">Contact Me</h2>
      </div>

      {/* ================= CONTENT ================= */}
      <div
        className="p-5 space-y-6 bg-white z-999 pointer-events-auto"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <img
          src="/me.jpg"
          alt="Satya"
          className="w-24 rounded-full select-none"
          draggable={false}
        />

        <div>
          <h3 className="text-lg font-semibold">Let’s Connect</h3>
          <p className="text-sm text-muted-foreground">
            Got a project, idea, or just want to say hi? Drop a message 👇
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-4"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <input
            ref={firstInputRef}
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full rounded-md border px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full rounded-md bg-black text-white py-2 hover:opacity-90 transition"
          >
            Send Message
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm">
              Message sent successfully ✅
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">
              Something went wrong ❌
            </p>
          )}
        </form>
      </div>
    </>
  );
};

const QueryWindow = WindowWrapper(Query, "query");
export default QueryWindow;
