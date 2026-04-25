import ReactMarkdown from 'react-markdown';
import { Message } from '../api/agent';
import { LogoIcon } from './Icons';

interface Props {
  message: Message;
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
          <div className="prose prose-sm [&_strong]:text-fg-0 [&_code]:text-fg-1 [&_code]:bg-bg-2 [&_code]:border-line-2 max-w-none [&_code]:rounded [&_code]:border [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[12px] [&_p]:mb-2.5 [&_p:last-child]:mb-0 [&_strong]:font-semibold">
            {message.content ? (
              <ReactMarkdown>{message.content || null}</ReactMarkdown>
            ) : (
              <span className="bg-accent animate-blink ml-0.5 inline-block h-3.5 w-[7px] align-[-2px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
