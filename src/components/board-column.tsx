import React from 'react';
import { MoreHorizontal, Plus, Trash2, GripVertical } from 'lucide-react';
import { Column as ColumnType, Task } from '@/types';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import TaskCard from "@/components/task-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BoardColumnProps {
    column: ColumnType;
    onTaskClick: (task: Task) => void;
    onDeleteColumn: () => void;
    index: number;
}

export default function BoardColumn({ column, onTaskClick, onDeleteColumn, index }: BoardColumnProps) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, snapshot) => (
                <Card
                    className="w-80 flex-shrink-0"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                        <div {...provided.dragHandleProps} className="absolute top-0 left-0 w-full h-8 cursor-move" />
                        <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add task</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={onDeleteColumn}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete column</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Droppable droppableId={column.id} type="task">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`min-h-[200px] p-2 transition-colors rounded-md ${
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
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}