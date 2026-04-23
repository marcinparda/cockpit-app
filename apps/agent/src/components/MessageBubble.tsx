import ReactMarkdown from 'react-markdown';
import { Message } from '../api/agent';
import { LogoIcon } from './Icons';

interface Props {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: Props) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[80%] px-3.5 py-2.5 rounded-[14px] rounded-br-[4px] text-[13.5px] leading-[1.55] text-fg-0 whitespace-pre-wrap"
          style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="w-[26px] h-[26px] rounded-md bg-bg-2 border border-line-2 flex items-center justify-center shrink-0">
        <LogoIcon width="14" height="14" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0" style={{ maxWidth: 'calc(100% - 38px)' }}>
        <div className="text-[11px] text-fg-3 mb-1 flex items-center gap-2">
          <span>agent</span>
          {isStreaming && (
            <span className="font-mono text-[10.5px] text-accent">streaming…</span>
          )}
        </div>
        <div className="text-[13.5px] leading-relaxed text-fg-0">
          <div className="prose prose-sm max-w-none [&_p]:mb-2.5 [&_p:last-child]:mb-0 [&_strong]:text-fg-0 [&_strong]:font-semibold [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-fg-1 [&_code]:bg-bg-2 [&_code]:px-1.5 [&_code]:py-px [&_code]:rounded [&_code]:border [&_code]:border-line-2">
            <ReactMarkdown>{message.content || '…'}</ReactMarkdown>
          </div>
          {isStreaming && (
            <span
              className="inline-block w-[7px] h-3.5 bg-accent ml-0.5 align-[-2px] animate-blink"
            />
          )}
        </div>
      </div>
    </div>
  );
}
