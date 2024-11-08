import React from 'react';
import { ChevronDown, Layout, Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Project } from '@/types';

interface ProjectSidebarProps {
    projects: Project[];
    selectedProjectId: string;
    onProjectSelect: (projectId: string) => void;
    onCreateProject: () => void;
}

export function ProjectSidebar({
                                   projects,
                                   selectedProjectId,
                                   onProjectSelect,
                                   onCreateProject,
                               }: ProjectSidebarProps) {
    return (
        <div className="w-64 h-screen bg-muted/50 border-r flex flex-col">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold">Projects</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onCreateProject}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-8 pr-3 py-1.5 text-sm bg-background border rounded-md"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        onClick={() => onProjectSelect(project.id)}
                        className={cn(
                            "w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-accent/50",
                            project.id === selectedProjectId && "bg-accent"
                        )}
                    >
                        <span className="truncate">{project.name}</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                ))}
            </div>
        </div>
    );
}