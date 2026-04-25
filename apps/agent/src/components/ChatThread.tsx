import { useEffect, useRef, useState } from 'react';
import { ModelInfo } from '../api/agent';
import { ConfirmPayload } from '../hooks/useStreamingChat';
import { ConfirmCard } from './ConfirmCard';
import {
  AttachIcon,
  CurrencyIcon,
  DocIcon,
  GlobeIcon,
  LogoIcon,
  MenuIcon,
  PencilIcon,
  SendIcon,
  SlashIcon,
  TaskCheckIcon,
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

// ── Domain card definitions ────────────────────────────────────────────────────

type DomainCardDef = {
  domain: string;
  text: string;
  color: string;
  iconBg: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const DOMAIN_CARDS: DomainCardDef[] = [
  {
    domain: 'CV',
    text: 'Tailor my CV for a Senior Backend role at Stripe',
    color: 'var(--color-accent)',
    iconBg: 'var(--accent-soft)',
    Icon: DocIcon,
  },
  {
    domain: 'BUDGET',
    text: 'Where did I overspend this month?',
    color: 'oklch(0.72 0.14 155)',
    iconBg: 'oklch(0.72 0.14 155 / 0.12)',
    Icon: CurrencyIcon,
  },
  {
    domain: 'TASKS',
    text: "What's on my plate this week?",
    color: 'oklch(0.78 0.15 55)',
    iconBg: 'oklch(0.78 0.15 55 / 0.12)',
    Icon: TaskCheckIcon,
  },
  {
    domain: 'BUDGET',
    text: 'Add transactions from my bank statement',
    color: 'oklch(0.72 0.14 155)',
    iconBg: 'oklch(0.72 0.14 155 / 0.12)',
    Icon: CurrencyIcon,
  },
];

// ── Empty state ────────────────────────────────────────────────────────────────

function EmptyState({ onQuick }: { onQuick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[660px] mx-auto px-7 pt-[72px] pb-6 gap-0 animate-[fade-in-up_0.4s_ease_both]">
      {/* Logo */}
      <div className="w-12 h-12 rounded-[13px] bg-bg-2 border border-line-2 flex items-center justify-center mb-4"
        style={{ boxShadow: '0 0 0 4px color-mix(in oklch, var(--color-accent) 8%, transparent)' }}>
        <LogoIcon width="24" height="24" />
      </div>

      {/* Subtitle */}
      <div className="font-mono text-[11px] text-accent tracking-[0.04em] mb-3">
        agent.parda.me · 3 apps connected
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-semibold tracking-[-0.025em] leading-[1.18] mb-3 text-fg-0">
        What can I help you with today?
      </h1>

      {/* Description */}
      <p className="text-fg-2 text-[13.5px] leading-[1.6] max-w-[440px] mb-7">
        I can work across your <span className="text-fg-1">CV</span>,{' '}
        <span className="text-fg-1">budget</span>, and{' '}
        <span className="text-fg-1">tasks</span>. Type{' '}
        <kbd className="font-mono text-[11px] border border-line bg-bg-2 px-1.5 py-0.5 rounded text-fg-1 mx-0.5">/</kbd>
        {' '}to target a specific app, or just describe what you need.
      </p>

      {/* Domain suggestion cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
        {DOMAIN_CARDS.map((card) => (
          <button
            key={card.domain + card.text}
            className="group flex items-start gap-3 px-3.5 py-3.5 bg-bg-2 border border-line-2 rounded-[11px] text-left cursor-pointer hover:bg-bg-3 hover:border-line transition-all duration-150"
            style={{
              '--hover-border': card.color,
            } as React.CSSProperties}
            onClick={() => onQuick(card.text)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `color-mix(in oklch, ${card.color} 40%, transparent)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '';
            }}
          >
            {/* Icon badge */}
            <div
              className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: card.iconBg, color: card.color }}
            >
              <card.Icon width="14" height="14" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div
                className="text-[10.5px] font-semibold tracking-[0.07em] uppercase mb-1"
                style={{ color: card.color }}
              >
                {card.domain}
              </div>
              <div className="text-[13px] text-fg-1 leading-snug group-hover:text-fg-0 transition-colors">
                {card.text}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Connected status */}
      <div className="flex items-center gap-2 text-[11.5px] text-fg-3">
        <span
          className="w-1.5 h-1.5 rounded-full bg-ok shrink-0"
          style={{ boxShadow: '0 0 0 3px color-mix(in oklch, var(--color-ok) 18%, transparent)' }}
        />
        Connected:
        <span className="text-fg-2">CV</span>
        <span className="text-fg-3">·</span>
        <span className="text-fg-2">Budget</span>
        <span className="text-fg-3">·</span>
        <span className="text-fg-2">Tasks</span>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

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

  function handleRouteToApp() {
    setInput('/');
    taRef.current?.focus();
  }

  const showEmptyState = !conversationTitle && messages.length === 0;
  const showConvEmpty = !!conversationTitle && messages.length === 0 && !isStreaming;

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full bg-bg-1">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 border-b border-line-2 h-[52px] shrink-0">
        <button
          className="text-fg-1 hover:bg-bg-2 p-1.5 rounded-md cursor-pointer md:hidden"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>

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
              <span className="truncate">{conversationTitle ?? 'New conversation'}</span>
              {conversationTitle && (
                <PencilIcon className="text-fg-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              )}
            </button>
          )}
        </div>

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
            Ask me anything, or type{' '}
            <kbd className="font-mono text-[11px] border border-line bg-bg-2 px-1.5 py-0.5 rounded text-fg-2 mx-1">/</kbd>
            to pick a domain.
          </div>
        )}

        {messages.length > 0 && (
          <div className="max-w-[760px] mx-auto px-7 flex flex-col gap-[22px]">
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isLastAssistant = isLast && msg.role === 'assistant';
              if (isLastAssistant && !msg.content && statusSteps.length > 0) return null;
              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={isStreaming && isLast && msg.role === 'assistant'}
                />
              );
            })}

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
                <div className="w-[26px] h-[26px] shrink-0" />
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
          className="max-w-[760px] mx-auto bg-bg-2 border border-line-2 rounded-[14px] overflow-hidden transition-[border-color,box-shadow] focus-within:border-[var(--accent-line)]"
          style={{ '--tw-shadow': '0 0 0 3px var(--accent-soft)' } as React.CSSProperties}
        >
          {/* Route hint row */}
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
            <button
              onClick={handleRouteToApp}
              className="flex items-center gap-1.5 text-fg-3 text-[11px] hover:text-fg-1 transition-colors cursor-pointer group"
              title="Type / to route to a specific app"
            >
              <span className="flex items-center justify-center w-4 h-4 rounded bg-bg-3 border border-line-2 group-hover:border-line transition-colors">
                <SlashIcon />
              </span>
              <span className="hidden sm:inline">Route to app</span>
              <span className="flex items-center justify-center w-4 h-4 rounded bg-bg-3 border border-line-2 group-hover:border-line transition-colors">
                <SlashIcon />
              </span>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={showEmptyState ? 'Ask anything, or type / to pick an app…' : 'Reply to agent…'}
            rows={1}
            disabled={isStreaming}
            className="w-full bg-transparent border-none outline-none resize-none text-fg-0 text-[13.5px] leading-[1.55] px-3 py-1 pb-2 placeholder:text-fg-3 disabled:opacity-60 font-sans"
            style={{ minHeight: '22px' }}
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2.5 px-3 pb-2.5">
            <div className="flex gap-1">
              <button className="flex items-center gap-1.5 px-2 py-1 border border-line-2 rounded-md text-fg-1 text-[11.5px] cursor-pointer hover:bg-bg-3 hover:text-fg-0 transition-colors">
                <AttachIcon />
                Attach
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 border border-line-2 rounded-md text-fg-2 text-[11.5px] cursor-pointer hover:bg-bg-3 hover:text-fg-0 transition-colors">
                <GlobeIcon />
                Web · on
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
