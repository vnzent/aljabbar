import { ReactNode } from "react";
import Link from "next/link";
import { whatsappContacts } from "@/lib/data";

/**
 * Parse text with markdown-style links [text](url)
 * Supports:
 * - Internal links: [text](/path)
 * - WhatsApp: [text](whatsapp)
 */
export function parseTextWithLinks(text: string): ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link (with bold support but no link parsing)
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      // Parse bold without checking for links again
      const boldParts = beforeText.split(/(\*\*.*?\*\*)/g);
      boldParts.forEach((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldText = part.slice(2, -2);
          parts.push(
            <span
              key={`bold-${keyIndex}-${idx}`}
              className="font-semibold text-black"
            >
              {boldText}
            </span>
          );
        } else if (part) {
          parts.push(part);
        }
      });
    }

    const linkText = match[1];
    const linkUrl = match[2];

    // Handle WhatsApp links
    if (linkUrl === "whatsapp") {
      parts.push(
        <a
          key={`link-${keyIndex}`}
          href={whatsappContacts.kemang}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline underline-offset-2 transition-colors cursor-pointer inline-block"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(whatsappContacts.kebayoranBaru, "_blank");
          }}
        >
          {linkText}
        </a>
      );
    }
    // Handle internal links
    else {
      parts.push(
        <a
          key={`link-${keyIndex}`}
          href={linkUrl}
          className="text-primary font-medium hover:underline underline-offset-2 transition-colors cursor-pointer inline-block"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.location.href = linkUrl;
          }}
        >
          {linkText}
        </a>
      );
    }

    lastIndex = linkRegex.lastIndex;
    keyIndex++;
  }

  // Add remaining text (with bold support but no link parsing)
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    const boldParts = remainingText.split(/(\*\*.*?\*\*)/g);
    boldParts.forEach((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        parts.push(
          <span key={`bold-end-${idx}`} className="font-semibold text-black">
            {boldText}
          </span>
        );
      } else if (part) {
        parts.push(part);
      }
    });
  }

  return <>{parts}</>;
}

/**
 * Parse text dengan markdown-style bold (**text**)
 * Contoh: "This is **bold** text" -> "This is <span class="font-semibold">bold</span> text"
 */
export function parseTextWithBold(text: string): ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return (
        <span key={index} className="font-semibold text-black">
          {boldText}
        </span>
      );
    }
    return part;
  });
}

/**
 * Parse text dengan multiple paragraphs (split by \n\n)
 * Dengan support untuk links dan bold
 * Contoh: "Paragraph 1\n\nParagraph 2" -> [<p>Paragraph 1</p>, <p>Paragraph 2</p>]
 */
export function parseTextWithParagraphs(text: string): ReactNode {
  // Check if text contains links
  const hasLinks = /\[([^\]]+)\]\(([^)]+)\)/.test(text);

  const paragraphs = text.split("\n\n").filter((p) => p.trim());

  if (paragraphs.length === 1) {
    return hasLinks ? parseTextWithLinks(text) : parseTextWithBold(text);
  }

  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="leading-relaxed">
          {hasLinks
            ? parseTextWithLinks(paragraph)
            : parseTextWithBold(paragraph)}
        </p>
      ))}
    </div>
  );
}

/**
 * Parse array of paragraphs dengan bold support
 */
export function parseParagraphs(paragraphs: string[]): ReactNode[] {
  return paragraphs.map((paragraph) => parseTextWithBold(paragraph));
}

/**
 * Parse text dengan line breaks (\n)
 * Contoh: "Line 1\nLine 2" -> <>Line 1<br />Line 2</>
 */
export function parseTextWithLineBreaks(text: string): ReactNode {
  const lines = text.split("\n");

  return lines.map((line, index) => (
    <span key={index}>
      {parseTextWithBold(line)}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}
