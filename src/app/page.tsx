'use client';

import React, { useState } from 'react';
import { Column, Project, Task } from '@/types';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { ProjectSidebar } from "@/components/sidebar/project-sidebar";
import BoardColumn from "@/components/board-column";
import { TaskDetailView } from "@/components/task/task-detail-view";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import DeleteZone from "@/components/delete-zone";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Project A',
    columns: [
      {
        id: 'col1',
        title: 'To Do',
        tasks: [
          {
            id: 'task1',
            title: 'Task 1',
            description: 'Description for Task 1',
            priority: 'medium',
            status: 'todo',
            tags: [{id: 'tag1', name: 'Frontend', color: '#3498db'}],
            attachments: [],
            comments: [],
            columnId: 'col1',
            projectId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            reporter: 'John Doe',
            order: 0
          },
          {
            id: 'task2',
            title: 'Task 2',
            description: 'Description for Task 2',
            priority: 'high',
            status: 'todo',
            tags: [{id: 'tag2', name: 'Backend', color: '#2ecc71'}],
            attachments: [],
            comments: [],
            columnId: 'col1',
            projectId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            reporter: 'Jane Smith',
            order: 1
          }
        ],
        projectId: '1',
        order: 0
      },
      {
        id: 'col2',
        title: 'In Progress',
        tasks: [],
        projectId: '1',
        order: 1
      },
      {
        id: 'col3',
        title: 'Done',
        tasks: [],
        projectId: '1',
        order: 2
      }
    ],
    createdAt: '',
    updatedAt: ''
  }
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewColumnDialogOpen, setIsNewColumnDialogOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'task' | 'column', id: string } | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId)!;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === 'delete-zone') {
      // @ts-ignore
      setItemToDelete({ type, id: draggableId });
      setIsDeleteDialogOpen(true);
      return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
      return;
    }

    const newProjects = [...projects];
    const projectIndex = newProjects.findIndex(p => p.id === selectedProjectId);

    if (type === 'column') {
      const newColumns = Array.from(newProjects[projectIndex].columns);
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);
      newProjects[projectIndex] = { ...newProjects[projectIndex], columns: newColumns };
    } else {
      const sourceColumn = newProjects[projectIndex].columns.find(col => col.id === source.droppableId);
      const destColumn = newProjects[projectIndex].columns.find(col => col.id === destination.droppableId);

      if (!sourceColumn || !destColumn) return;

      if (source.droppableId === destination.droppableId) {
        const newTasks = Array.from(sourceColumn.tasks);
        const [removed] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, removed);
        const newColumn = { ...sourceColumn, tasks: newTasks };
        newProjects[projectIndex].columns = newProjects[projectIndex].columns.map(col =>
            col.id === newColumn.id ? newColumn : col
        );
      } else {
        const sourceTasks = Array.from(sourceColumn.tasks);
        const [removed] = sourceTasks.splice(source.index, 1);
        const destTasks = Array.from(destColumn.tasks);
        destTasks.splice(destination.index, 0, { ...removed, columnId: destColumn.id });
        newProjects[projectIndex].columns = newProjects[projectIndex].columns.map(col => {
          if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
          if (col.id === destColumn.id) return { ...col, tasks: destTasks };
          return col;
        });
      }
    }

    setProjects(newProjects);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const addNewColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: Column = {
        id: uuidv4(),
        title: newColumnTitle.trim(),
        tasks: [],
        projectId: selectedProjectId,
        order: selectedProject.columns.length
      };
      setProjects(projects.map(project =>
          project.id === selectedProjectId
              ? { ...project, columns: [...project.columns, newColumn] }
              : project
      ));
      setNewColumnTitle('');
      setIsNewColumnDialogOpen(false);
    }
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() && newTaskColumnId) {
      const newTask: Task = {
        id: uuidv4(),
        title: newTaskTitle.trim(),
        description: '',
        priority: 'medium',
        status: 'todo',
        tags: [],
        attachments: [],
        comments: [],
        columnId: newTaskColumnId,
        projectId: selectedProjectId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reporter: 'Current User',
        order: 0
      };
      setProjects(projects.map(project =>
          project.id === selectedProjectId
              ? {
                ...project,
                columns: project.columns.map(column =>
                    column.id === newTaskColumnId
                        ? { ...column, tasks: [...column.tasks, newTask] }
                        : column
                )
              }
              : project
      ));
      setNewTaskTitle('');
      setNewTaskColumnId(null);
      setIsNewTaskDialogOpen(false);
    }
  };

  const deleteColumn = (columnId: string) => {
    setProjects(projects.map(project =>
        project.id === selectedProjectId
            ? { ...project, columns: project.columns.filter(col => col.id !== columnId) }
            : project
    ));
  };

  const updateTask = (updatedTask: Task) => {
    setProjects(projects.map(project =>
        project.id === selectedProjectId
            ? {
              ...project,
              columns: project.columns.map(column =>
                  column.id === updatedTask.columnId
                      ? { ...column, tasks: column.tasks.map(task => task.id === updatedTask.id ? updatedTask : task) }
                      : column
              )
            }
            : project
    ));
    setSelectedTask(updatedTask);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;

    const newProjects = [...projects];
    const projectIndex = newProjects.findIndex(p => p.id === selectedProjectId);

    if (itemToDelete.type === 'column') {
      newProjects[projectIndex].columns = newProjects[projectIndex].columns.filter(col => col.id !== itemToDelete.id);
    } else if (itemToDelete.type === 'task') {
      newProjects[projectIndex].columns = newProjects[projectIndex].columns.map(col => ({
        ...col,
        tasks: col.tasks.filter(task => task.id !== itemToDelete.id)
      }));
    }

    setProjects(newProjects);
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
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

                <Button onClick={() => setIsNewTaskDialogOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  New task
                </Button>

                <Button onClick={() => setIsNewColumnDialogOpen(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  New column
                </Button>

                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-auto p-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex gap-6">
                <Droppable droppableId="board" direction="horizontal" type="column">
                  {(provided) => (
                      <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex gap-6"
                      >
                        {selectedProject.columns.map((column, index) => (
                            <BoardColumn
                                key={column.id}
                                column={column}
                                onTaskClick={handleTaskClick}
                                onDeleteColumn={() => deleteColumn(column.id)}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                      </div>
                  )}
                </Droppable>
                <DeleteZone />
              </div>
            </DragDropContext>
          </main>
        </div>

        {selectedTask && (
            <TaskDetailView
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onUpdate={updateTask}
            />
        )}

        <Dialog open={isNewColumnDialogOpen} onOpenChange={setIsNewColumnDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
            </DialogHeader>
            <Input
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Enter column title"
            />
            <DialogFooter>
              <Button onClick={addNewColumn}>Add Column</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
            />
            <select
                value={newTaskColumnId || ''}
                onChange={(e) => setNewTaskColumnId(e.target.value)}
                className="mt-2 w-full p-2 border rounded-md"
            >
              <option value="">Select a column</option>
              {selectedProject.columns.map(column => (
                  <option key={column.id} value={column.id}>{column.title}</option>
              ))}
            </select>
            <DialogFooter>
              <Button onClick={addNewTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente {itemToDelete?.type === 'column' ? 'la columna' : 'la tarea'} y todos sus datos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
}