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
    <div className="mx-auto flex max-w-[660px] animate-[fade-in-up_0.4s_ease_both] flex-col items-center gap-0 px-7 pt-[72px] pb-6 text-center">
      {/* Logo */}
      <div
        className="bg-bg-2 border-line-2 mb-4 flex h-12 w-12 items-center justify-center rounded-[13px] border"
        style={{
          boxShadow:
            '0 0 0 4px color-mix(in oklch, var(--color-accent) 8%, transparent)',
        }}
      >
        <LogoIcon width="24" height="24" />
      </div>

      {/* Subtitle */}
      <div className="text-accent mb-3 font-mono text-[11px] tracking-[0.04em]">
        agent.parda.me · 3 apps connected
      </div>

      {/* Heading */}
      <h1 className="text-fg-0 mb-3 text-[28px] leading-[1.18] font-semibold tracking-[-0.025em]">
        What can I help you with today?
      </h1>

      {/* Description */}
      <p className="text-fg-2 mb-7 max-w-[440px] text-[13.5px] leading-[1.6]">
        I can work across your <span className="text-fg-1">CV</span>,{' '}
        <span className="text-fg-1">budget</span>, and{' '}
        <span className="text-fg-1">tasks</span>. Type{' '}
        <kbd className="border-line bg-bg-2 text-fg-1 mx-0.5 rounded border px-1.5 py-0.5 font-mono text-[11px]">
          /
        </kbd>{' '}
        to target a specific app, or just describe what you need.
      </p>

      {/* Domain suggestion cards */}
      <div className="mb-7 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
        {DOMAIN_CARDS.map((card) => (
          <button
            key={card.domain + card.text}
            className="group bg-bg-2 border-line-2 hover:bg-bg-3 hover:border-line flex cursor-pointer items-start gap-3 rounded-[11px] border px-3.5 py-3.5 text-left transition-all duration-150"
            style={
              {
                '--hover-border': card.color,
              } as React.CSSProperties
            }
            onClick={() => onQuick(card.text)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                `color-mix(in oklch, ${card.color} 40%, transparent)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '';
            }}
          >
            {/* Icon badge */}
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]"
              style={{ background: card.iconBg, color: card.color }}
            >
              <card.Icon width="14" height="14" />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div
                className="mb-1 text-[10.5px] font-semibold tracking-[0.07em] uppercase"
                style={{ color: card.color }}
              >
                {card.domain}
              </div>
              <div className="text-fg-1 group-hover:text-fg-0 text-[13px] leading-snug transition-colors">
                {card.text}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Connected status */}
      <div className="text-fg-3 flex items-center gap-2 text-[11.5px]">
        <span
          className="bg-ok h-1.5 w-1.5 shrink-0 rounded-full"
          style={{
            boxShadow:
              '0 0 0 3px color-mix(in oklch, var(--color-ok) 18%, transparent)',
          }}
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
  const showConvEmpty =
    !!conversationTitle && messages.length === 0 && !isStreaming;

  return (
    <div className="bg-bg-1 flex h-full min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="border-line-2 flex h-[52px] shrink-0 items-center gap-3 border-b px-5">
        <button
          className="text-fg-1 hover:bg-bg-2 cursor-pointer rounded-md p-1.5 md:hidden"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>

        <div className="min-w-0 flex-1">
          {editingTitle ? (
            <input
              autoFocus
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              className="bg-bg-2 text-fg-0 min-w-[280px] rounded-md border px-2 py-1 text-[13.5px] font-medium outline-none"
              style={{ borderColor: 'var(--accent-line)' }}
            />
          ) : (
            <button
              className="text-fg-0 hover:bg-bg-2 group flex max-w-full cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 text-[13.5px] font-medium"
              onClick={() => conversationTitle && setEditingTitle(true)}
            >
              <span className="truncate">
                {conversationTitle ?? 'New conversation'}
              </span>
              {conversationTitle && (
                <PencilIcon className="text-fg-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
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
          <div className="text-fg-3 flex h-full flex-col items-center justify-center text-sm">
            Ask me anything, or type{' '}
            <kbd className="border-line bg-bg-2 text-fg-2 mx-1 rounded border px-1.5 py-0.5 font-mono text-[11px]">
              /
            </kbd>
            to pick a domain.
          </div>
        )}

        {messages.length > 0 && (
          <div className="mx-auto flex max-w-[760px] flex-col gap-[22px] px-7">
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isLastAssistant = isLast && msg.role === 'assistant';
              if (isLastAssistant && !msg.content && statusSteps.length > 0)
                return null;
              return <MessageBubble key={msg.id} message={msg} />;
            })}

            {statusSteps.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="bg-bg-2 border-line-2 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border">
                  <LogoIcon width="14" height="14" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-fg-3 mb-1 text-[11px]">agent</div>
                  <StatusMessage steps={statusSteps} />
                </div>
              </div>
            )}

            {pendingConfirm && (
              <div className="flex items-start gap-3">
                <div className="h-[26px] w-[26px] shrink-0" />
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
      <div className="bg-bg-1 shrink-0 px-5 pt-2 pb-[18px]">
        <div
          className="bg-bg-2 border-line-2 mx-auto max-w-[760px] overflow-hidden rounded-[14px] border transition-[border-color,box-shadow] focus-within:border-[var(--accent-line)]"
          style={
            {
              '--tw-shadow': '0 0 0 3px var(--accent-soft)',
            } as React.CSSProperties
          }
        >
          {/* Route hint row */}
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-1">
            <button
              onClick={handleRouteToApp}
              className="text-fg-3 hover:text-fg-1 group flex cursor-pointer items-center gap-1.5 text-[11px] transition-colors"
              title="Type / to route to a specific app"
            >
              <span className="bg-bg-3 border-line-2 group-hover:border-line flex h-4 w-4 items-center justify-center rounded border transition-colors">
                <SlashIcon />
              </span>
              <span className="hidden sm:inline">Route to app</span>
              <span className="bg-bg-3 border-line-2 group-hover:border-line flex h-4 w-4 items-center justify-center rounded border transition-colors">
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
            placeholder={
              showEmptyState
                ? 'Ask anything, or type / to pick an app…'
                : 'Reply to agent…'
            }
            rows={1}
            disabled={isStreaming}
            className="text-fg-0 placeholder:text-fg-3 w-full resize-none border-none bg-transparent px-3 py-1 pb-2 font-sans text-[13.5px] leading-[1.55] outline-none disabled:opacity-60"
            style={{ minHeight: '22px' }}
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2.5 px-3 pb-2.5">
            <div className="flex gap-1">
              <button className="border-line-2 text-fg-1 hover:bg-bg-3 hover:text-fg-0 flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1 text-[11.5px] transition-colors">
                <AttachIcon />
                Attach
              </button>
              <button className="border-line-2 text-fg-2 hover:bg-bg-3 hover:text-fg-0 flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1 text-[11.5px] transition-colors">
                <GlobeIcon />
                Web · on
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-fg-3 hidden items-center gap-1 text-[10.5px] sm:flex">
                <kbd className="border-line bg-bg-1 text-fg-2 rounded border px-1.5 py-px font-mono text-[10px]">
                  ⇧
                </kbd>
                <kbd className="border-line bg-bg-1 text-fg-2 rounded border px-1.5 py-px font-mono text-[10px]">
                  ↵
                </kbd>
                newline
              </span>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                aria-label="Send"
                className="bg-accent text-accent-ink hover:bg-accent-hi flex h-7 w-7 cursor-pointer items-center justify-center rounded-[7px] transition-colors disabled:cursor-default disabled:opacity-35"
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
