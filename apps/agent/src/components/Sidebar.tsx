import { useState } from 'react';
import { Conversation } from '../api/agent';

interface Props {
  conversations: Conversation[];
  selectedId: string | null;
  isLoading: boolean;
  defaultModel: string;
  onSelect: (id: string) => void;
  onCreate: (title: string, model: string) => void;
  onDelete: (id: string) => void;
}

export function Sidebar({ conversations, selectedId, isLoading, defaultModel, onSelect, onCreate, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function handleNew() {
    const title = `Conversation ${new Date().toLocaleDateString()}`;
    onCreate(title, defaultModel);
  }

  function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (confirmDelete === id) {
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }

  return (
    <aside className="flex flex-col w-64 shrink-0 bg-slate-900 border-r border-slate-700 h-full">
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={handleNew}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + New conversation
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {isLoading && (
          <p className="text-slate-500 text-xs px-4 py-2">Loading...</p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`group w-full text-left px-4 py-3 flex items-center justify-between hover:bg-slate-800 transition-colors ${
              selectedId === conv.id ? 'bg-slate-800 border-l-2 border-indigo-500' : ''
            }`}
          >
            <span className="text-sm text-slate-200 truncate flex-1">{conv.title}</span>
            <span
              onClick={(e) => handleDelete(e, conv.id)}
              className={`ml-2 text-xs shrink-0 px-1 rounded transition-colors cursor-pointer ${
                confirmDelete === conv.id
                  ? 'text-red-400 bg-red-900/30'
                  : 'text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100'
              }`}
            >
              {confirmDelete === conv.id ? 'sure?' : '×'}
            </span>
          </button>
        ))}
        {!isLoading && conversations.length === 0 && (
          <p className="text-slate-500 text-xs px-4 py-4">No conversations yet.</p>
        )}
      </nav>
    </aside>
  );
}
