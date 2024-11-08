import React from 'react';
import { Clock, Paperclip, Tag } from 'lucide-react';
import { Task } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
    task: Task;
    index: number;
    onClick: () => void;
}

export default function TaskCard({ task, index, onClick }: TaskCardProps) {
    const priorityColors = {
        low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                >
                    <Card
                        className={`mb-3 cursor-pointer ${
                            snapshot.isDragging ? 'shadow-lg ring-2 ring-primary ring-opacity-50' : 'hover:shadow-md'
                        } transition-all`}
                    >
                        <CardHeader className="p-3 pb-0">
                            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                            {task.description && (
                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {task.description}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-2 mb-3">
                                {task.tags.map((tag) => (
                                    <Badge
                                        key={tag.id}
                                        variant="outline"
                                        style={{ backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color }}
                                    >
                                        <Tag className="h-3 w-3 mr-1" />
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <Badge variant="secondary" className={priorityColors[task.priority]}>
                                    {task.priority}
                                </Badge>

                                <div className="flex items-center gap-3 text-muted-foreground">
                                    {task.dueDate && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span className="text-xs">{new Date(task.dueDate).toLocaleDateString()}</span>
                                        </div>
                                    )}

                                    {task.attachments.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Paperclip className="h-3 w-3" />
                                            <span className="text-xs">{task.attachments.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}