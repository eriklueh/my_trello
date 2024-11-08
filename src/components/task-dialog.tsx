import React from 'react';
import { Clock, Paperclip, Tag } from 'lucide-react';
import { Task } from '@/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
                                <h4 className="text-sm font-medium mb-1">Description</h4>
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-sm font-medium mb-1">Priority</h4>
                                <Badge variant="outline">{task.priority}</Badge>
                            </div>

                            {task.tags.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
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
                                </div>
                            )}

                            {task.dueDate && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Due Date</h4>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm">
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {task.attachments.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Attachments</h4>
                                    <div className="space-y-2">
                                        {task.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                            >
                                                <Paperclip className="h-4 w-4" />
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