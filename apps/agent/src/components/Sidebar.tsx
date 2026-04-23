import { useMemo, useState } from 'react';
import { Conversation } from '../api/agent';
import {
  CheckIcon,
  DotsIcon,
  LogoIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from './Icons';

interface Props {
  conversations: Conversation[];
  selectedId: string | null;
  isLoading: boolean;
  userEmail: string;
  sidebarOpen: boolean;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 60) return `${diffMin}m`;
  if (diffHr < 24) return `${diffHr}h`;
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  return date.toDateString() === now.toDateString();
}

function getInitials(email: string): string {
  const local = email.split('@')[0] ?? '';
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase();
}

export function Sidebar({
  conversations,
  selectedId,
  isLoading,
  userEmail,
  sidebarOpen,
  onSelect,
  onNew,
  onDelete,
  onClose,
}: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const grouped = useMemo(() => {
    const today: Conversation[] = [];
    const earlier: Conversation[] = [];
    filtered.forEach((c) => {
      if (isToday(c.updated_at)) today.push(c);
      else earlier.push(c);
    });
    return { Today: today, Earlier: earlier };
  }, [filtered]);

  function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (confirmDeleteId === id) {
      onDelete(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  }

  const initials = getInitials(userEmail);
  const displayName = userEmail.split('@')[0] ?? userEmail;

  return (
    <aside
      className={[
        'flex flex-col w-[264px] shrink-0 bg-bg-0 border-r border-line-2 h-full z-30',
        'fixed md:relative inset-y-0 left-0',
        'transition-transform duration-200',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ].join(' ')}
      style={{ boxShadow: sidebarOpen ? '30px 0 60px rgba(0,0,0,0.5)' : undefined }}
    >
      {/* Top section */}
      <div className="flex flex-col gap-2.5 px-3 pt-3.5 pb-2.5 border-b border-line-2 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-1.5 py-1">
          <LogoIcon />
          <span className="text-[13.5px] font-semibold tracking-tight">
            agent<span className="text-fg-3 font-normal">.parda.me</span>
          </span>
          <button
            className="ml-auto text-fg-2 hover:text-fg-0 p-1 rounded cursor-pointer md:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <MenuIcon />
          </button>
        </div>

        {/* New conversation */}
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-2.5 py-2 bg-bg-2 border border-line-2 text-fg-0 rounded-[10px] text-[13px] font-medium cursor-pointer hover:bg-bg-3 transition-colors text-left"
        >
          <PlusIcon />
          <span className="flex-1">New conversation</span>
          <span className="font-mono text-[10.5px] text-fg-3 border border-line px-1.5 py-0.5 rounded-[4px]">
            ⌘ K
          </span>
        </button>

        {/* Search */}
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-2.5 text-fg-3 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search threads"
            className="w-full bg-transparent border border-line-2 rounded-[10px] py-1.5 pl-8 pr-3 text-[12.5px] text-fg-0 placeholder:text-fg-3 outline-none focus:border-[var(--accent-line)]"
          />
        </div>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto py-2 px-1.5">
        {isLoading && (
          <p className="text-fg-3 text-xs px-3 py-2 font-mono">Loading…</p>
        )}

        {!isLoading && conversations.length === 0 && (
          <p className="text-fg-3 text-xs px-3 py-4">No conversations yet.</p>
        )}

        {Object.entries(grouped).map(([label, items]) =>
          items.length > 0 ? (
            <div key={label} className="py-1.5">
              <div className="text-[10.5px] tracking-[0.08em] uppercase text-fg-3 px-2 py-1.5 pb-1">
                {label}
              </div>
              {items.map((conv) => (
                <div
                  key={conv.id}
                  className={[
                    'flex items-center gap-2 px-2 py-1.5 rounded-[7px] cursor-pointer relative',
                    'hover:bg-bg-2 transition-colors',
                    conv.id === selectedId ? 'bg-bg-2' : '',
                  ].join(' ')}
                  onMouseEnter={() => setHoverId(conv.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => onSelect(conv.id)}
                >
                  {/* Active indicator */}
                  {conv.id === selectedId && (
                    <div className="absolute left-0 top-[7px] bottom-[7px] w-0.5 bg-accent rounded-r-[2px]" />
                  )}

                  <span
                    className={[
                      'flex-1 text-[12.5px] truncate',
                      conv.id === selectedId ? 'text-fg-0 font-medium' : 'text-fg-1',
                    ].join(' ')}
                  >
                    {conv.title}
                  </span>

                  <div className="shrink-0">
                    {hoverId === conv.id ? (
                      <div className="flex gap-0.5">
                        <button
                          className="p-0.5 rounded text-fg-2 hover:bg-bg-3 hover:text-fg-0 cursor-pointer"
                          title="Rename"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <PencilIcon />
                        </button>
                        <button
                          className={[
                            'p-0.5 rounded cursor-pointer',
                            confirmDeleteId === conv.id
                              ? 'text-red-400 bg-red-900/30'
                              : 'text-fg-2 hover:bg-bg-3 hover:text-fg-0',
                          ].join(' ')}
                          title={confirmDeleteId === conv.id ? 'Click again to confirm' : 'Delete'}
                          onClick={(e) => handleDelete(e, conv.id)}
                        >
                          {confirmDeleteId === conv.id ? <CheckIcon /> : <TrashIcon />}
                        </button>
                      </div>
                    ) : (
                      <span className="font-mono text-[10.5px] text-fg-3">
                        {formatRelativeTime(conv.updated_at)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-t border-line-2 shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hi) 100%)',
            color: 'var(--color-accent-ink)',
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-medium truncate">{displayName}</div>
          <div className="text-[10.5px] text-fg-3 font-mono truncate">{userEmail}</div>
        </div>
        <button className="text-fg-2 hover:text-fg-0 hover:bg-bg-2 p-1 rounded cursor-pointer shrink-0">
          <DotsIcon />
        </button>
      </div>
    </aside>
  );
}
