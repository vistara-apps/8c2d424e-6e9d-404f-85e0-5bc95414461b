'use client';

import { useState } from 'react';
import { Clock, FileText, CheckSquare, Users } from 'lucide-react';
import { RecordingListItem } from './RecordingListItem';
import { Button } from './ui/Button';
import type { Recording } from '@/lib/types';

// Mock data for demonstration
const mockRecordings: Recording[] = [
  {
    recordingId: '1',
    userId: '0x123',
    meetingTitle: 'Product Strategy Meeting',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    duration: 3600, // 1 hour
    status: 'completed',
    actionItems: [
      {
        id: '1',
        text: 'Review competitor analysis by Friday',
        assignee: 'Sarah',
        completed: false,
        priority: 'high',
      },
      {
        id: '2',
        text: 'Schedule user interviews',
        assignee: 'Mike',
        completed: false,
        priority: 'medium',
      },
    ],
    decisions: [
      {
        id: '1',
        text: 'Move forward with mobile-first approach',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        participants: ['Sarah', 'Mike', 'Alex'],
      },
    ],
    cost: 60, // $0.60
  },
  {
    recordingId: '2',
    userId: '0x123',
    meetingTitle: 'Weekly Team Standup',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    endTime: new Date(Date.now() - 23.5 * 60 * 60 * 1000),
    duration: 1800, // 30 minutes
    status: 'processing',
    actionItems: [],
    decisions: [],
    cost: 30, // $0.30
  },
  {
    recordingId: '3',
    userId: '0x123',
    meetingTitle: 'Client Presentation Prep',
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(Date.now() - 47 * 60 * 60 * 1000),
    duration: 2700, // 45 minutes
    status: 'completed',
    actionItems: [
      {
        id: '3',
        text: 'Finalize slide deck',
        assignee: 'Alex',
        completed: true,
        priority: 'high',
      },
    ],
    decisions: [],
    cost: 50, // $0.50
  },
];

export function RecentRecordings() {
  const [recordings] = useState<Recording[]>(mockRecordings);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);

  const completedRecordings = recordings.filter(r => r.status === 'completed');
  const processingRecordings = recordings.filter(r => r.status === 'processing');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Recordings
        </h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      {/* Processing Recordings */}
      {processingRecordings.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600">Processing</h3>
          {processingRecordings.map((recording) => (
            <RecordingListItem
              key={recording.recordingId}
              recording={recording}
              variant="processing"
              onClick={() => setSelectedRecording(recording)}
            />
          ))}
        </div>
      )}

      {/* Completed Recordings */}
      {completedRecordings.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600">Completed</h3>
          {completedRecordings.map((recording) => (
            <RecordingListItem
              key={recording.recordingId}
              recording={recording}
              variant="completed"
              onClick={() => setSelectedRecording(recording)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {recordings.length === 0 && (
        <div className="text-center py-8 space-y-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p className="text-slate-900 font-medium">No recordings yet</p>
            <p className="text-sm text-slate-600">
              Start your first meeting recording to see it here
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {recordings.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
          <h3 className="text-sm font-medium text-slate-600 mb-3">
            This Week
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {Math.floor(recordings.reduce((acc, r) => acc + (r.duration || 0), 0) / 60)}m
              </div>
              <div className="text-xs text-slate-600">Total Time</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-1">
                <CheckSquare className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {recordings.reduce((acc, r) => acc + r.actionItems.length, 0)}
              </div>
              <div className="text-xs text-slate-600">Action Items</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-1">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {recordings.length}
              </div>
              <div className="text-xs text-slate-600">Meetings</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
