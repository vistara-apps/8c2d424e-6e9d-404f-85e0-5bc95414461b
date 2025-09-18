'use client';

import { User, Clock } from 'lucide-react';
import type { ActionItem } from '@/lib/types';

interface ActionItemChipProps {
  actionItem: ActionItem;
  variant: 'assigned' | 'unassigned';
}

export function ActionItemChip({ actionItem, variant }: ActionItemChipProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`
      inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border
      ${actionItem.completed 
        ? 'bg-green-50 text-green-700 border-green-200 line-through' 
        : getPriorityColor(actionItem.priority)
      }
    `}>
      {variant === 'assigned' && actionItem.assignee && (
        <>
          <User className="w-3 h-3" />
          <span className="font-medium">{actionItem.assignee}</span>
          <span>•</span>
        </>
      )}
      
      <span className="truncate max-w-24">
        {actionItem.text}
      </span>

      {actionItem.dueDate && (
        <>
          <Clock className="w-3 h-3" />
          <span>
            {new Intl.DateTimeFormat('en-US', { 
              month: 'short', 
              day: 'numeric' 
            }).format(actionItem.dueDate)}
          </span>
        </>
      )}
    </div>
  );
}
