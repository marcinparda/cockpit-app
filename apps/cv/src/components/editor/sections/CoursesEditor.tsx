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
import { CVData } from '../../../types/cv.types';

interface CoursesEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

function SortableCourseItem({
  course,
  index,
  onUpdate,
  onRemove,
}: {
  course: string;
  index: number;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `course-${index}` });

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
        value={course}
        onChange={(e) => onUpdate(e.target.value)}
        className="flex-1 rounded border-0 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      <button onClick={onRemove} className="text-red-600 hover:text-red-700">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CoursesEditor({ cvData, setCVData }: CoursesEditorProps) {
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

      const newCourses = arrayMove(cvData.courses, oldIndex, newIndex);
      setCVData({ ...cvData, courses: newCourses });
    }
  }

  function updateCourse(index: number, value: string) {
    const newCourses = [...cvData.courses];
    newCourses[index] = value;
    setCVData({ ...cvData, courses: newCourses });
  }

  function addCourse() {
    setCVData({ ...cvData, courses: [...cvData.courses, ''] });
  }

  function removeCourse(index: number) {
    const newCourses = cvData.courses.filter((_, i) => i !== index);
    setCVData({ ...cvData, courses: newCourses });
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.courses.map((_, i) => `course-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {cvData.courses.map((course, index) => (
            <SortableCourseItem
              key={`course-${index}`}
              course={course}
              index={index}
              onUpdate={(value) => updateCourse(index, value)}
              onRemove={() => removeCourse(index)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={addCourse}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Course
      </button>
    </div>
  );
}
