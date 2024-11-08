import React from 'react';
import { Clock, Paperclip, Tag } from 'lucide-react';
import { Task } from '@/types';
import { Draggable } from '@hello-pangea/dnd';

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
                    className={`bg-card text-card-foreground rounded-lg shadow-sm p-4 mb-3 cursor-pointer ${
                        snapshot.isDragging ? 'shadow-lg ring-2 ring-primary ring-opacity-50' : 'hover:shadow-md'
                    } transition-all`}
                >
                    <h3 className="font-semibold mb-2">{task.title}</h3>

                    {task.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {task.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                        {task.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                                style={{ backgroundColor: tag.color + '20', color: tag.color }}
                            >
                <Tag size={12} />
                                {tag.name}
              </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>

                        <div className="flex items-center gap-3 text-muted-foreground">
                            {task.dueDate && (
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span className="text-xs">{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                            )}

                            {task.attachments.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <Paperclip size={14} />
                                    <span className="text-xs">{task.attachments.length}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}