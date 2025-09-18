'use client';

import { Clock, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { formatDate, formatDuration, getRecordingStatusColor } from '@/lib/utils';
import { ActionItemChip } from './ActionItemChip';
import type { Recording } from '@/lib/types';

interface RecordingListItemProps {
  recording: Recording;
  variant: 'processing' | 'completed' | 'error';
  onClick?: () => void;
}

export function RecordingListItem({ 
  recording, 
  variant, 
  onClick 
}: RecordingListItemProps) {
  const statusColor = getRecordingStatusColor(recording.status);

  const getStatusIcon = () => {
    switch (recording.status) {
      case 'processing':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-medium text-slate-900 line-clamp-1">
            {recording.meetingTitle}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-slate-600">
              {formatDate(recording.startTime)}
            </span>
            {recording.duration && (
              <>
                <span className="text-slate-600">•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span className="text-sm text-slate-600">
                    {formatDuration(recording.duration)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`
          flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
          ${statusColor}
        `}>
          {getStatusIcon()}
          <span className="capitalize">{recording.status}</span>
        </div>
      </div>

      {/* Action Items Preview */}
      {recording.actionItems.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-slate-600" />
            <span className="text-xs text-slate-600">
              {recording.actionItems.length} action item{recording.actionItems.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {recording.actionItems.slice(0, 2).map((item) => (
              <ActionItemChip
                key={item.id}
                actionItem={item}
                variant={item.assignee ? 'assigned' : 'unassigned'}
              />
            ))}
            {recording.actionItems.length > 2 && (
              <span className="text-xs text-slate-600 bg-gray-100 px-2 py-1 rounded-full">
                +{recording.actionItems.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Processing State */}
      {recording.status === 'processing' && (
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600">
            Transcribing and analyzing...
          </span>
        </div>
      )}

      {/* Summary Preview */}
      {recording.summary && recording.status === 'completed' && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-slate-600 line-clamp-2">
            {recording.summary}
          </p>
        </div>
      )}
    </div>
  );
}
