import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { Message } from '../api/agent';
import { LogoIcon } from './Icons';

interface Props {
  message: Message;
}

type ContentPart = { type: 'text'; value: string } | { type: 'plan'; value: string };

function parseContent(content: string): ContentPart[] {
  const parts: ContentPart[] = [];
  const planRegex = /<plan>([\s\S]*?)<\/plan>/g;
  let lastIndex = 0;
  let match;

  while ((match = planRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'plan', value: match[1].trim() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', value: content.slice(lastIndex) });
  }

  return parts;
}

function PlanBlock({ content }: { content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3 rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-line-2)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="text-fg-3 flex w-full items-center gap-2 px-3 py-2 text-[11.5px] font-medium transition-colors hover:text-fg-2"
        style={{ background: 'var(--color-bg-2)' }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-70">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span>Planning steps</span>
      </button>
      {open && (
        <div
          className="text-fg-3 px-3 py-2.5 text-[12px] leading-relaxed"
          style={{ background: 'var(--color-bg-1)' }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="text-fg-0 max-w-[80%] rounded-[14px] rounded-br-[4px] px-3.5 py-2.5 text-[13.5px] leading-[1.55] whitespace-pre-wrap"
          style={{
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent-line)',
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  const parts = message.content ? parseContent(message.content) : [];

  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="bg-bg-2 border-line-2 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border">
        <LogoIcon width="14" height="14" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1" style={{ maxWidth: 'calc(100% - 38px)' }}>
        <div className="text-fg-3 mb-1 flex items-center gap-2 text-[11px]">
          <span>agent</span>
        </div>
        <div className="text-fg-0 text-[13.5px] leading-relaxed">
          {parts.length > 0 ? (
            parts.map((part, i) =>
              part.type === 'plan' ? (
                <PlanBlock key={i} content={part.value} />
              ) : (
                <div key={i} className="prose prose-sm [&_strong]:text-fg-0 [&_code]:text-fg-1 [&_code]:bg-bg-2 [&_code]:border-line-2 max-w-none [&_code]:rounded [&_code]:border [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[12px] [&_p]:mb-2.5 [&_p:last-child]:mb-0 [&_strong]:font-semibold">
                  <ReactMarkdown>{part.value}</ReactMarkdown>
                </div>
              )
            )
          ) : (
            <span className="bg-accent animate-blink ml-0.5 inline-block h-3.5 w-[7px] align-[-2px]" />
          )}
        </div>
      </div>
    </div>
  );
}
