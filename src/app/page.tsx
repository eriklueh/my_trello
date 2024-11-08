'use client';

import React, { useState } from 'react';
import { Project, Task } from '@/types';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import {ProjectSidebar} from "@/components/sidebar/project-sidebar";
import BoardColumn from "@/components/board-column";
import {TaskDetailView} from "@/components/task/task-detail-view";

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'Main development project',
    columns: [
      {
        id: '1',
        title: 'To Do',
        tasks: [
          {
            id: '1',
            title: 'Design new interface',
            description: 'Create mockups for the new user interface',
            priority: 'high',
            status: 'todo',
            dueDate: '2024-03-20',
            tags: [
              { id: '1', name: 'Design', color: '#2563eb' },
              { id: '2', name: 'UI/UX', color: '#7c3aed' }
            ],
            attachments: [
              {
                id: '1',
                name: 'mockup.png',
                url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
                type: 'image',
                uploadedAt: '2024-03-15T10:00:00Z'
              }
            ],
            comments: [
              {
                id: '1',
                content: 'Let\'s focus on mobile-first design',
                author: 'Jane Smith',
                createdAt: '2024-03-15T10:30:00Z',
                attachments: []
              }
            ],
            columnId: '1',
            projectId: '1',
            createdAt: '2024-03-15T09:00:00Z',
            updatedAt: '2024-03-15T09:00:00Z',
            reporter: 'John Doe',
            order: 0
          }
        ],
        projectId: '1',
        order: 0
      },
      {
        id: '2',
        title: 'In Progress',
        tasks: [],
        projectId: '1',
        order: 1
      },
      {
        id: '3',
        title: 'Done',
        tasks: [],
        projectId: '1',
        order: 2
      }
    ],
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId)!;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return;
    }

    const newProjects = projects.map(project => {
      if (project.id !== selectedProjectId) return project;

      const sourceColumn = project.columns.find(col => col.id === source.droppableId);
      const destColumn = project.columns.find(col => col.id === destination.droppableId);

      if (!sourceColumn || !destColumn) return project;

      const task = sourceColumn.tasks[source.index];

      const newColumns = project.columns.map(column => {
        if (column.id === source.droppableId) {
          const newTasks = [...column.tasks];
          newTasks.splice(source.index, 1);
          return { ...column, tasks: newTasks };
        }
        if (column.id === destination.droppableId) {
          const newTasks = [...column.tasks];
          newTasks.splice(destination.index, 0, {
            ...task,
            columnId: destination.droppableId,
            status: destination.droppableId === '3' ? 'done' :
                destination.droppableId === '2' ? 'in_progress' : 'todo'
          });
          return { ...column, tasks: newTasks };
        }
        return column;
      });

      return { ...project, columns: newColumns };
    });

    setProjects(newProjects);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
      <div className="flex h-screen bg-background">
        <ProjectSidebar
            projects={projects}
            selectedProjectId={selectedProjectId}
            onProjectSelect={setSelectedProjectId}
            onCreateProject={() => {}}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b">
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">{selectedProject.name}</h1>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                      type="text"
                      placeholder="Search tasks..."
                      className="pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <Button>
                  <Plus className="h-5 w-5 mr-2" />
                  New task
                </Button>

                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-auto p-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex gap-6">
                {selectedProject.columns.map(column => (
                    <BoardColumn
                        key={column.id}
                        column={column}
                        onTaskClick={handleTaskClick}
                    />
                ))}
              </div>
            </DragDropContext>
          </main>
        </div>

        {selectedTask && (
            <TaskDetailView
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onEdit={() => {}}
            />
        )}
      </div>
  );
}