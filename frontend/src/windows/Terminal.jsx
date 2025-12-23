import { useEffect, useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag, AlertTriangle } from "lucide-react";
import api from "../lib/axios";

const Terminal = () => {
  const [techStack, setTechStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderTime, setRenderTime] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await api.get("/tech-stack");
        if (!ignore) {
          setTechStack(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load tech stack", err);
        if (!ignore) setTechStack([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const start = performance.now();

    (async () => {
      try {
        const res = await api.get("/tech-stack");
        if (!ignore) {
          setTechStack(res.data || []);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setTechStack([]);
      } finally {
        if (!ignore) {
          const end = performance.now();
          setRenderTime(Math.round(end - start));
          setLoading(false);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        {/* Command */}
        <p>
          <span className="font-bold">@satya %</span>
          show tech stack
        </p>

        {/* Table header */}
        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        {/* Content */}
        <ul className="content">
          {/* Loading */}
          {loading && (
            <li className="opacity-60">Fetching tech stack from server...</li>
          )}

          {/* Empty state */}
          {!loading && techStack.length === 0 && (
            <li className="flex items-center gap-2 opacity-70">
              <AlertTriangle size={18} />
              No tech stack available
            </li>
          )}

          {/* Data */}
          {!loading &&
            techStack.map(({ _id, category, items }) => (
              <li key={_id} className="tech-row">
                <Check className="check" size={18} />
                <h3>{category}</h3>
                <p className="skills">{items.join(", ")}</p>
              </li>
            ))}
        </ul>

        {/* Footer */}
        <div className="footnote">
          <p>
            <Check size={20} />{" "}
            {loading
              ? "Loading stacks..."
              : `${techStack.length} stack${
                  techStack.length !== 1 ? "s" : ""
                } loaded`}
          </p>

          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time: {loading ? "--" : `${renderTime}ms`}
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
