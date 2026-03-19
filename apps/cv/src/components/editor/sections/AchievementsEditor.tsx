import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { CVData, Achievement } from '../../../types/cv.types';

interface AchievementsEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

function SortableAchievementItem({
  achievement,
  index,
  onUpdate,
  onRemove,
}: {
  achievement: Achievement;
  index: number;
  onUpdate: (field: keyof Achievement, value: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `achievement-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="space-y-3 rounded-lg border border-slate-300 bg-white p-4"
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="flex-1 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={achievement.title}
              onChange={(e) => onUpdate('title', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={achievement.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <button onClick={onRemove} className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AchievementsEditor({
  cvData,
  setCVData,
}: AchievementsEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString().split('-')[1]);
      const newIndex = parseInt(over.id.toString().split('-')[1]);

      const newAchievements = arrayMove(
        cvData.achievements,
        oldIndex,
        newIndex
      );
      setCVData({ ...cvData, achievements: newAchievements });
    }
  }

  function updateAchievement(
    index: number,
    field: keyof Achievement,
    value: string
  ) {
    const newAchievements = [...cvData.achievements];
    newAchievements[index] = {
      ...newAchievements[index],
      [field]: value,
    };
    setCVData({ ...cvData, achievements: newAchievements });
  }

  function addAchievement() {
    setCVData({
      ...cvData,
      achievements: [
        ...cvData.achievements,
        { title: '', description: '' },
      ],
    });
  }

  function removeAchievement(index: number) {
    const newAchievements = cvData.achievements.filter((_, i) => i !== index);
    setCVData({ ...cvData, achievements: newAchievements });
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.achievements.map((_, i) => `achievement-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.achievements.map((achievement, index) => (
            <SortableAchievementItem
              key={`achievement-${index}`}
              achievement={achievement}
              index={index}
              onUpdate={(field, value) =>
                updateAchievement(index, field, value)
              }
              onRemove={() => removeAchievement(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={addAchievement}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Achievement
      </button>
    </div>
  );
}
