
export interface ConvoyEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  description?: string;
  organizer: string;
  committees: string[];
}

export interface ConvoyRequirement {
  id: string;
  convoyId: string;
  committee: string;
  itemType: string;
  quantity: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description?: string;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  requestedBy: string;
  requestDate: string;
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
}

export const convoyStatuses = ['planning', 'active', 'completed', 'cancelled'];
export const requirementStatuses = ['pending', 'approved', 'rejected', 'fulfilled'];
export const priorityLevels = ['low', 'medium', 'high', 'urgent'];
