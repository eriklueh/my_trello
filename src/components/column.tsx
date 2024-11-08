import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Column as ColumnType } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from "@/components/task-card";
import {Button} from "@/components/ui/button";

interface ColumnProps {
    column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
    return (
        <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700">{column.title}</h2>
                <div className="flex items-center gap-2">
                    <Button className="p-1 hover:bg-gray-200 rounded">
                        <Plus size={20} className="text-gray-600" />
                    </Button>
                    <Button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal size={20} className="text-gray-600" />
                    </Button>
                </div>
            </div>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] transition-colors ${
                            snapshot.isDraggingOver ? 'bg-gray-200' : ''
                        }`}
                    >
                        {column.tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}