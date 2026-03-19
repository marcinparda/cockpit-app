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
import { CVData, PersonalProject } from '../../../types/cv.types';

interface PersonalProjectsEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

function SortableProjectItem({
  project,
  index,
  onUpdate,
  onRemove,
}: {
  project: PersonalProject;
  index: number;
  onUpdate: (field: keyof PersonalProject, value: string | string[]) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `project-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function updateDescription(descIndex: number, value: string) {
    const newDesc = [...project.description];
    newDesc[descIndex] = value;
    onUpdate('description', newDesc);
  }

  function addDescriptionItem() {
    onUpdate('description', [...project.description, '']);
  }

  function removeDescriptionItem(descIndex: number) {
    const newDesc = project.description.filter((_, i) => i !== descIndex);
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
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Live URL
              </label>
              <input
                type="text"
                value={project.liveUrl}
                onChange={(e) => onUpdate('liveUrl', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Code URL
              </label>
              <input
                type="text"
                value={project.code}
                onChange={(e) => onUpdate('code', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              type="text"
              value={project.date}
              onChange={(e) => onUpdate('date', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description Points
            </label>
            <div className="space-y-2">
              {project.description.map((desc, descIndex) => (
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

export function PersonalProjectsEditor({
  cvData,
  setCVData,
}: PersonalProjectsEditorProps) {
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

      const newProjects = arrayMove(
        cvData.personalProjects,
        oldIndex,
        newIndex
      );
      setCVData({ ...cvData, personalProjects: newProjects });
    }
  }

  function updateProject(
    index: number,
    field: keyof PersonalProject,
    value: string | string[]
  ) {
    const newProjects = [...cvData.personalProjects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    setCVData({ ...cvData, personalProjects: newProjects });
  }

  function addProject() {
    setCVData({
      ...cvData,
      personalProjects: [
        ...cvData.personalProjects,
        {
          name: '',
          liveUrl: '',
          code: '',
          date: '',
          description: [''],
        },
      ],
    });
  }

  function removeProject(index: number) {
    const newProjects = cvData.personalProjects.filter((_, i) => i !== index);
    setCVData({ ...cvData, personalProjects: newProjects });
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.personalProjects.map((_, i) => `project-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.personalProjects.map((project, index) => (
            <SortableProjectItem
              key={`project-${index}`}
              project={project}
              index={index}
              onUpdate={(field, value) => updateProject(index, field, value)}
              onRemove={() => removeProject(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={addProject}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </div>
  );
}
