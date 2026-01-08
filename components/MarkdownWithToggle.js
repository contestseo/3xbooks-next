import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownWithToggle({ text, limit = 350 }) {
  const [expanded, setExpanded] = useState(false);

  // Merge headings with the next paragraph inline:
  const mergeHeadingWithText = (input) => {
    return input.replace(/\*\*(.*?)\*\*\s*\n\s*/g, "**$1:** "); 
  };

  const formattedText = mergeHeadingWithText(text);

  const isLong = formattedText.length > limit;
  const shortText = isLong ? formattedText.slice(0, limit) + "..." : formattedText;

  return (
    <div style={{ lineHeight: "1.7", fontSize: "16px" }}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p style={{ marginBottom: "16px" }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ fontSize: "18px", fontWeight: "700" }}>
              {children}
            </strong>
          ),
        }}
      >
        {expanded ? formattedText : formattedText}
      </ReactMarkdown>

      {/* {isLong && (
        <p
          style={{
            color: "#fb944c",
            cursor: "pointer",
            fontWeight: 600,
            textAlign:"right",
            marginTop: "-20px",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less" : "Read More"}
        </p>
      )} */}
    </div>
  );
}
