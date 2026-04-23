import { useEffect, useRef, useState } from 'react';
import { ModelInfo } from '../api/agent';
import { ConfirmPayload } from '../hooks/useStreamingChat';
import { ConfirmCard } from './ConfirmCard';
import {
  AttachIcon,
  GlobeIcon,
  LogoIcon,
  MenuIcon,
  PencilIcon,
  SendIcon,
  SparkleIcon,
} from './Icons';
import { MessageBubble } from './MessageBubble';
import { ModelSelector } from './ModelSelector';
import { StatusMessage } from './StatusMessage';
import { Message } from '../api/agent';

interface Props {
  conversationTitle: string | null;
  messages: Message[];
  statusSteps: string[];
  pendingConfirm: ConfirmPayload | null;
  isStreaming: boolean;
  models: ModelInfo[];
  selectedModel: string;
  defaultModel: string;
  onModelChange: (model: string) => void;
  onSend: (content: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onMenuOpen: () => void;
}

const QUICK_EXAMPLES = [
  'Tailor my CV for a Senior Backend Engineer role at Stripe',
  'Make a preset for a Founding Design Engineer position at Linear',
  'Rewrite my summary for AI infrastructure roles',
  'Extract keywords from this job posting and match to my CV',
];

function EmptyState({ onQuick }: { onQuick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[640px] mx-auto px-7 pt-[60px] pb-6 gap-2">
      <div className="w-11 h-11 rounded-[12px] bg-bg-2 border border-line-2 flex items-center justify-center mb-2">
        <LogoIcon width="22" height="22" />
      </div>
      <div className="font-mono text-[11.5px] text-accent tracking-[0.02em]">agent.parda.me</div>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em] leading-[1.2] mt-1 mb-0.5">
        Paste a job offer. I'll tailor your CV.
      </h1>
      <p className="text-fg-2 text-[13.5px] max-w-[460px] mb-4">
        I read the posting, research the company, and rewrite your base CV into a preset you
        can open in the builder.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {QUICK_EXAMPLES.map((example) => (
          <button
            key={example}
            className="flex items-center gap-2.5 px-3 py-3 bg-bg-2 border border-line-2 rounded-[10px] text-[12.5px] text-fg-1 cursor-pointer hover:bg-bg-3 hover:border-line hover:text-fg-0 transition-colors text-left"
            onClick={() => onQuick(example)}
          >
            <span className="w-[22px] h-[22px] rounded-md flex items-center justify-center shrink-0 text-accent" style={{ background: 'var(--accent-soft)' }}>
              <SparkleIcon />
            </span>
            <span>{example}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[11.5px] text-fg-3">
        <span className="w-1.5 h-1.5 rounded-full bg-ok" style={{ boxShadow: '0 0 0 3px color-mix(in oklch, var(--color-ok) 20%, transparent)' }} />
        Base CV linked — paste a job offer to begin
      </div>
    </div>
  );
}

export function ChatThread({
  conversationTitle,
  messages,
  statusSteps,
  pendingConfirm,
  isStreaming,
  models,
  selectedModel,
  defaultModel,
  onModelChange,
  onSend,
  onConfirm,
  onCancel,
  onMenuOpen,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleVal, setTitleVal] = useState(conversationTitle ?? '');

  useEffect(() => {
    setTitleVal(conversationTitle ?? '');
    setEditingTitle(false);
  }, [conversationTitle]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusSteps, pendingConfirm]);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, [input]);

  function handleSend() {
    const value = input.trim();
    if (!value || isStreaming) return;
    setInput('');
    onSend(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const showEmptyState = !conversationTitle && messages.length === 0;
  const showConvEmpty = !!conversationTitle && messages.length === 0 && !isStreaming;

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-bg-1">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 border-b border-line-2 h-[52px] shrink-0">
        {/* Mobile menu button */}
        <button
          className="text-fg-1 hover:bg-bg-2 p-1.5 rounded-md cursor-pointer md:hidden"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          {editingTitle ? (
            <input
              autoFocus
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              className="bg-bg-2 border text-fg-0 text-[13.5px] font-medium px-2 py-1 rounded-md outline-none min-w-[280px]"
              style={{ borderColor: 'var(--accent-line)' }}
            />
          ) : (
            <button
              className="flex items-center gap-1.5 text-fg-0 text-[13.5px] font-medium px-1.5 py-1 rounded-md hover:bg-bg-2 cursor-pointer max-w-full group"
              onClick={() => conversationTitle && setEditingTitle(true)}
            >
              <span className="truncate">
                {conversationTitle ?? 'New conversation'}
              </span>
              {conversationTitle && (
                <PencilIcon className="text-fg-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              )}
            </button>
          )}
        </div>

        {/* Model selector */}
        <div className="shrink-0">
          <ModelSelector
            models={models}
            value={selectedModel}
            onChange={onModelChange}
            disabled={isStreaming}
          />
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto py-6">
        {showEmptyState && <EmptyState onQuick={(text) => setInput(text)} />}

        {showConvEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-fg-3 text-sm">
            Paste a job offer and I'll tailor your CV for it.
          </div>
        )}

        {messages.length > 0 && (
          <div className="max-w-[760px] mx-auto px-7 flex flex-col gap-[22px]">
            {messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
              />
            ))}

            {statusSteps.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-[26px] h-[26px] rounded-md bg-bg-2 border border-line-2 flex items-center justify-center shrink-0">
                  <LogoIcon width="14" height="14" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-fg-3 mb-1">agent</div>
                  <StatusMessage steps={statusSteps} />
                </div>
              </div>
            )}

            {pendingConfirm && (
              <div className="flex items-start gap-3">
                <div className="w-[26px] h-[26px] shrink-0" /> {/* ghost avatar */}
                <ConfirmCard
                  payload={pendingConfirm}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  disabled={isStreaming}
                />
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className="shrink-0 px-5 pb-[18px] pt-2 bg-bg-1">
        <div
          className="max-w-[760px] mx-auto bg-bg-2 border border-line-2 rounded-[14px] px-3 pt-2.5 pb-2 transition-[border-color,box-shadow] focus-within:border-[var(--accent-line)]"
          style={{ '--tw-shadow': '0 0 0 3px var(--accent-soft)' } as React.CSSProperties}
        >
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              showEmptyState
                ? 'Paste a job offer URL or description…'
                : 'Reply to agent…'
            }
            rows={1}
            disabled={isStreaming}
            className="w-full bg-transparent border-none outline-none resize-none text-fg-0 text-[13.5px] leading-[1.55] py-1 px-0.5 placeholder:text-fg-3 disabled:opacity-60 font-sans"
            style={{ minHeight: '22px' }}
          />

          <div className="flex items-center justify-between gap-2.5 pt-1.5">
            <div className="flex gap-1">
              <button className="flex items-center gap-1.5 px-2 py-1 border border-line-2 rounded-md text-fg-1 text-[11.5px] cursor-pointer hover:bg-bg-3 hover:text-fg-0 transition-colors">
                <AttachIcon />
                Base CV
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 border border-line-2 rounded-md text-fg-2 text-[11.5px] cursor-pointer hover:bg-bg-3 hover:text-fg-0 transition-colors">
                <GlobeIcon />
                Web search · on
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:flex items-center gap-1 text-[10.5px] text-fg-3">
                <kbd className="font-mono text-[10px] border border-line bg-bg-1 px-1.5 py-px rounded text-fg-2">⇧</kbd>
                <kbd className="font-mono text-[10px] border border-line bg-bg-1 px-1.5 py-px rounded text-fg-2">↵</kbd>
                newline
              </span>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                aria-label="Send"
                className="w-7 h-7 rounded-[7px] bg-accent text-accent-ink flex items-center justify-center cursor-pointer hover:bg-accent-hi transition-colors disabled:opacity-35 disabled:cursor-default"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
