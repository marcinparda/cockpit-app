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
import { CVData, Experience } from '../../../types/cv.types';

interface ExperienceEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

function SortableExperienceItem({
  experience,
  index,
  onUpdate,
  onRemove,
}: {
  experience: Experience;
  index: number;
  onUpdate: (
    field: keyof Experience,
    value: string | string[]
  ) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `experience-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function updateDescription(descIndex: number, value: string) {
    const newDesc = [...experience.description];
    newDesc[descIndex] = value;
    onUpdate('description', newDesc);
  }

  function addDescriptionItem() {
    onUpdate('description', [...experience.description, '']);
  }

  function removeDescriptionItem(descIndex: number) {
    const newDesc = experience.description.filter((_, i) => i !== descIndex);
    onUpdate('description', newDesc);
  }

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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => onUpdate('title', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Company
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => onUpdate('company', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Details (optional)
            </label>
            <input
              type="text"
              value={experience.details || ''}
              onChange={(e) => onUpdate('details', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="text"
                value={experience.date}
                onChange={(e) => onUpdate('date', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => onUpdate('location', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description Points
            </label>
            <div className="space-y-2">
              {experience.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex gap-2">
                  <textarea
                    value={desc}
                    onChange={(e) =>
                      updateDescription(descIndex, e.target.value)
                    }
                    rows={2}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    onClick={() => removeDescriptionItem(descIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addDescriptionItem}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add point
              </button>
            </div>
          </div>
        </div>
        <button onClick={onRemove} className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ExperienceEditor({
  cvData,
  setCVData,
}: ExperienceEditorProps) {
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

      const newExperience = arrayMove(cvData.experience, oldIndex, newIndex);
      setCVData({ ...cvData, experience: newExperience });
    }
  }

  function updateExperience(
    index: number,
    field: keyof Experience,
    value: string | string[]
  ) {
    const newExperience = [...cvData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    setCVData({ ...cvData, experience: newExperience });
  }

  function addExperience() {
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          title: '',
          company: '',
          date: '',
          location: '',
          description: [''],
        },
      ],
    });
  }

  function removeExperience(index: number) {
    const newExperience = cvData.experience.filter((_, i) => i !== index);
    setCVData({ ...cvData, experience: newExperience });
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.experience.map((_, i) => `experience-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.experience.map((exp, index) => (
            <SortableExperienceItem
              key={`experience-${index}`}
              experience={exp}
              index={index}
              onUpdate={(field, value) => updateExperience(index, field, value)}
              onRemove={() => removeExperience(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={addExperience}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Experience
      </button>
    </div>
  );
}
