export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'file' | 'link';
    uploadedAt: string;
    size?: number;
}

export interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt?: string;
    attachments: Attachment[];
}

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in_progress' | 'done';
    dueDate?: string;
    tags: Tag[];
    attachments: Attachment[];
    comments: Comment[];
    columnId: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
    assignee?: string;
    reporter: string;
    order: number;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
    projectId: string;
    order: number;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    columns: Column[];
    createdAt: string;
    updatedAt: string;
}