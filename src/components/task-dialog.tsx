import React from 'react';
import {Clock, Paperclip, Tag} from 'lucide-react';
import {Task} from '@/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

interface TaskDialogProps {
    task: Task | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskDialog({task, open, onOpenChange}: TaskDialogProps) {
    if (!task) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                    <DialogDescription>
                        <div className="mt-4 space-y-4">
                            <div>
                                <h4 className="text-sm font-medium">Description</h4>
                                <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium">Priority</h4>
                                <span
                                    className="mt-1 inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  {task.priority}
                </span>
                            </div>

                            {task.tags.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium">Tags</h4>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {task.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                                                style={{backgroundColor: tag.color + '20', color: tag.color}}
                                            >
                        <Tag size={12}/>
                                                {tag.name}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {task.dueDate && (
                                <div>
                                    <h4 className="text-sm font-medium">Due Date</h4>
                                    <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                        <Clock size={14}/>
                                        <span className="text-sm">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                                    </div>
                                </div>
                            )}

                            {task.attachments.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium">Attachments</h4>
                                    <div className="mt-1 space-y-2">
                                        {task.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                            >
                                                <Paperclip size={14}/>
                                                <a
                                                    href={attachment.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary"
                                                >
                                                    {attachment.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}