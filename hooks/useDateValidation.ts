import { useState, useEffect } from 'react';

interface DateValidationResult {
  isValid: boolean;
  error?: string;
}

export const useDateValidation = (
  startDate: Date,
  endDate: Date
): DateValidationResult => {
  const [validation, setValidation] = useState<DateValidationResult>({
    isValid: true,
  });

  useEffect(() => {
    const now = new Date();
    
    // Check if start date is in the past
    if (startDate < now) {
      setValidation({
        isValid: false,
        error: 'Start date cannot be in the past',
      });
      return;
    }

    // Check if end date is before start date
    if (endDate <= startDate) {
      setValidation({
        isValid: false,
        error: 'End date must be after start date',
      });
      return;
    }

    // Check maximum duration (e.g., 30 days)
    const maxDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    if (endDate.getTime() - startDate.getTime() > maxDuration) {
      setValidation({
        isValid: false,
        error: 'Task duration cannot exceed 30 days',
      });
      return;
    }

    setValidation({ isValid: true });
  }, [startDate, endDate]);

  return validation;
};