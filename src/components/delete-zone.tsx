import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Trash2 } from 'lucide-react';

export default function DeleteZone() {
    return (
        <Droppable droppableId="delete-zone" type="column">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-20 h-full border-2 border-dashed rounded-md flex items-center justify-center ${
                        snapshot.isDraggingOver ? 'bg-red-100 border-red-500' : 'border-gray-300'
                    }`}
                >
                    <Trash2 className={`h-8 w-8 ${snapshot.isDraggingOver ? 'text-red-500' : 'text-gray-400'}`} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}