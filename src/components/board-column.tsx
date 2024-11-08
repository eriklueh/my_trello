import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Column as ColumnType, Task } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import { Button } from './ui/button';
import TaskCard from "@/components/task-card";

interface BoardColumnProps {
    column: ColumnType;
    onTaskClick: (task: Task) => void;
}

export default function BoardColumn({ column, onTaskClick }: BoardColumnProps) {
    return (
        <div className="bg-muted/50 rounded-lg p-4 w-80 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">{column.title}</h2>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] transition-colors rounded-md ${
                            snapshot.isDraggingOver ? 'bg-muted' : ''
                        }`}
                    >
                        {column.tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                onClick={() => onTaskClick(task)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}