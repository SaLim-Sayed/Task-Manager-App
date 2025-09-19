// utils/dateUtils.ts
export const dateUtils = {
  // Format date for display
  formatDateTime: (date: Date): string => {
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  formatDate: (date: Date): string => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  formatTime: (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Get start of day
  startOfDay: (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },

  // Get end of day
  endOfDay: (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  },

  // Add time to date
  addTime: (date: Date, hours: number, minutes: number = 0): Date => {
    return new Date(date.getTime() + (hours * 60 + minutes) * 60 * 1000);
  },

  // Check if date is valid
  isValidDateRange: (startDate: Date, endDate: Date): boolean => {
    return startDate < endDate;
  },

  // Get duration between dates
  getDurationHours: (startDate: Date, endDate: Date): number => {
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  },

  // Get relative time string
  getRelativeTime: (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  },
};
