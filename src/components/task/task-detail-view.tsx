import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare, Paperclip, Tag, User, X } from 'lucide-react';
import { Task, Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';

interface TaskDetailViewProps {
    task: Task;
    onClose: () => void;
    onUpdate: (task: Task) => void;
}

export function TaskDetailView({ task, onClose, onUpdate }: TaskDetailViewProps) {
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [newComment, setNewComment] = useState('');

    const handleSave = () => {
        onUpdate(editedTask);
        setEditMode(false);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: uuidv4(),
                content: newComment,
                author: 'Current User',
                createdAt: new Date().toISOString(),
                attachments: []
            };
            onUpdate({
                ...editedTask,
                comments: [...editedTask.comments, comment]
            });
            setNewComment('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-background shadow-lg border-l">
                <div className="h-full flex flex-col">
                    <div className="px-6 py-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Task Details</h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    {editMode ? (
                                        <Input
                                            value={editedTask.title}
                                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                            className="text-2xl font-bold"
                                        />
                                    ) : (
                                        <h1 className="text-2xl font-bold">{task.title}</h1>
                                    )}
                                    <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
                                        {editMode ? 'Cancel' : 'Edit'}
                                    </Button>
                                </div>
                                {editMode ? (
                                    <Textarea
                                        value={editedTask.description}
                                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                        className="w-full min-h-[100px]"
                                    />
                                ) : (
                                    <p className="text-muted-foreground whitespace-pre-wrap">
                                        {task.description}
                                    </p>
                                )}
                            </div>

                            <Separator />

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
                                        {editMode ? (
                                            <Input
                                                type="date"
                                                value={editedTask.dueDate?.split('T')[0] || ''}
                                                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                                            />
                                        ) : (
                                            <span>{task.dueDate ? formatDate(task.dueDate) : 'None'}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Tag className="h-4 w-4" />
                                        <span className="text-muted-foreground">Priority:</span>
                                        {editMode ? (
                                            <select
                                                value={editedTask.priority}
                                                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                                                className="border rounded p-1"
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        ) : (
                                            <Badge variant="outline" className="capitalize">{task.priority}</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {task.tags.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Tags</h3>
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

                            <Separator />

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

                            <Separator />

                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="h-4 w-4" />
                                    <h3 className="text-sm font-medium">Comments</h3>
                                </div>

                                <div className="space-y-4">
                                    {task.comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://avatar.vercel.sh/${comment.author}`} alt={comment.author} />
                                                <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
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
                                        <Avatar>
                                            <AvatarImage src="https://avatar.vercel.sh/user" alt="User" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <Textarea
                                                placeholder="Add a comment..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="min-h-[100px]"
                                            />
                                            <div className="mt-2 flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => setNewComment('')}>
                                                    Cancel
                                                </Button>
                                                <Button size="sm" onClick={handleAddComment}>Comment</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {editMode && (
                        <div className="px-6 py-4 border-t">
                            <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}