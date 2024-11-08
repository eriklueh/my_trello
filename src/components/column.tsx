import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Column as ColumnType } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ColumnProps {
    column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
    return (
        <Card className="w-80 flex-shrink-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add task</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[200px] p-2 transition-colors ${
                                snapshot.isDraggingOver ? 'bg-muted' : ''
                            }`}
                        >
                            {column.tasks.map((task, index) => (
                                <TaskCard key={task.id} task={task} index={index}  onClick={() => console.log("hello")}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </CardContent>
        </Card>
    );
}