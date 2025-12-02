import { ReactNode } from "react";

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
 * Contoh: "Paragraph 1\n\nParagraph 2" -> [<p>Paragraph 1</p>, <p>Paragraph 2</p>]
 */
export function parseTextWithParagraphs(text: string): ReactNode {
  const paragraphs = text.split("\n\n").filter((p) => p.trim());

  if (paragraphs.length === 1) {
    return parseTextWithBold(text);
  }

  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="leading-relaxed">
          {parseTextWithBold(paragraph)}
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
