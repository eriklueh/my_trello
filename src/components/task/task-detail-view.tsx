import React from 'react';
import { Calendar, Clock, MessageSquare, Paperclip, Tag, User } from 'lucide-react';
import { Task, Comment } from '@/types';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { formatDate } from '@/lib/utils';

interface TaskDetailViewProps {
    task: Task;
    onClose: () => void;
    onEdit: () => void;
}

export function TaskDetailView({ task, onClose, onEdit }: TaskDetailViewProps) {
    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-background shadow-lg border-l">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Task Details</h2>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            ✕
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-6">
                            {/* Title and Description */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-2xl font-bold">{task.title}</h1>
                                    <Button variant="outline" size="sm" onClick={onEdit}>
                                        Edit
                                    </Button>
                                </div>
                                <p className="text-muted-foreground whitespace-pre-wrap">
                                    {task.description}
                                </p>
                            </div>

                            {/* Meta Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="h-4 w-4" />
                                        <span className="text-muted-foreground">Assignee:</span>
                                        <span>{task.assignee || 'Unassigned'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-muted-foreground">Created:</span>
                                        <span>{formatDate(task.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-muted-foreground">Due date:</span>
                                        <span>{task.dueDate ? formatDate(task.dueDate) : 'None'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Tag className="h-4 w-4" />
                                        <span className="text-muted-foreground">Priority:</span>
                                        <span className="capitalize">{task.priority}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {task.tags.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {task.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                                                style={{ backgroundColor: tag.color + '20', color: tag.color }}
                                            >
                        <Tag className="h-3 w-3" />
                                                {tag.name}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Attachments */}
                            {task.attachments.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Attachments</h3>
                                    <div className="space-y-2">
                                        {task.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className="flex items-center gap-2 p-2 rounded-md border bg-muted/50"
                                            >
                                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={attachment.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm hover:underline"
                                                >
                                                    {attachment.name}
                                                </a>
                                                <span className="text-xs text-muted-foreground ml-auto">
                          {formatDate(attachment.uploadedAt)}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Comments */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">Comments</h3>
                                </div>

                                <div className="space-y-4">
                                    {task.comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">

                                            <div className="flex-1">
                                                <div className="bg-muted/50 rounded-lg p-3">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium">{comment.author}</span>
                                                        <span className="text-xs text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </span>
                                                    </div>
                                                    <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex gap-3">

                                        <div className="flex-1">
                                            <Textarea
                                                placeholder="Add a comment..."
                                                className="min-h-[100px]"
                                            />
                                            <div className="mt-2 flex justify-end gap-2">
                                                <Button variant="outline" size="sm">
                                                    Cancel
                                                </Button>
                                                <Button size="sm">Comment</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}