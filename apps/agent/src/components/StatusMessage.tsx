interface Props {
  text: string;
}

export function StatusMessage({ text }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="inline-flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span className="text-xs text-slate-400">{text}</span>
    </div>
  );
}
