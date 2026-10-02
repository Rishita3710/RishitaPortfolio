// Turns "some **bold** text" into text with <strong> parts.
export default function Rich({ text }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-ink">{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
