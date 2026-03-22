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
import { CVData, Skill } from '../../../types/cv.types';

interface SkillsEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

function SortableSkillItem({
  skill,
  index,
  onUpdate,
  onRemove,
}: {
  skill: Skill;
  index: number;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `skill-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-2"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <input
        type="text"
        value={skill.name}
        onChange={(e) => onUpdate(e.target.value)}
        className="flex-1 rounded border-0 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      <button
        onClick={onRemove}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function SkillsEditor({ cvData, setCVData }: SkillsEditorProps) {
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

      const newSkills = arrayMove(cvData.skills, oldIndex, newIndex);
      setCVData({ ...cvData, skills: newSkills });
    }
  }

  function updateSkill(index: number, value: string) {
    const newSkills = [...cvData.skills];
    newSkills[index] = { ...newSkills[index], name: value };
    setCVData({ ...cvData, skills: newSkills });
  }

  function addSkill() {
    setCVData({ ...cvData, skills: [...cvData.skills, { name: '', years: 0, description: '' }] });
  }

  function removeSkill(index: number) {
    const newSkills = cvData.skills.filter((_, i) => i !== index);
    setCVData({ ...cvData, skills: newSkills });
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.skills.map((_, i) => `skill-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.skills.map((skill, index) => (
            <SortableSkillItem
              key={`skill-${index}`}
              skill={skill}
              index={index}
              onUpdate={(value) => updateSkill(index, value)}
              onRemove={() => removeSkill(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={addSkill}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Skill
      </button>
    </div>
  );
}
