import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DateTimePickerComponentProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  disabled?: boolean;
}

export const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  mode = 'datetime',
  disabled = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const formatDate = (date: Date): string => {
    if (mode === 'date') {
      return date.toLocaleDateString();
    } else if (mode === 'time') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selectedDate) {
        onChange(selectedDate); 
      }
      setShowPicker(false);  
    } else {
     
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };
  

  const handleConfirm = () => {
    onChange(tempDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempDate(value);
    setShowPicker(false);
  };

  const openPicker = () => {
    if (disabled) return;
    setTempDate(value);
    setShowPicker(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openPicker}
        disabled={disabled}
        style={[
          styles.dateButton,
          disabled && styles.disabledButton,
        ]}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.dateText, disabled && styles.disabledText]}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>{label}</Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode={mode}
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      ) : (
        showPicker && Platform.OS === "android" && (
            <DateTimePicker
              value={tempDate}
              mode={mode}
              display="default"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          )
          
      )}
    </View>
  );
};

// components/DateRangePicker.tsx
interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minimumDate = new Date(),
  maximumDate,
}) => {
  const handleStartDateChange = (date: Date) => {
    if (date >= endDate) {
      // Auto-adjust end date to be at least 1 hour after start date
      const newEndDate = new Date(date.getTime() + 60 * 60 * 1000);
      onEndDateChange(newEndDate);
    }
    onStartDateChange(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (date <= startDate) {
      Alert.alert(
        'Invalid Date',
        'End date must be after start date',
        [{ text: 'OK' }]
      );
      return;
    }
    onEndDateChange(date);
  };

  return (
    <View style={styles.dateRangeContainer}>
      <DateTimePickerComponent
        label="From"
        value={startDate}
        onChange={handleStartDateChange}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        mode="datetime"
      />
      
      <View style={styles.dateRangeSeparator}>
        <Text style={styles.separatorText}>to</Text>
      </View>
      
      <DateTimePickerComponent
        label="To"
        value={endDate}
        onChange={handleEndDateChange}
        minimumDate={startDate}
        maximumDate={maximumDate}
        mode="datetime"
      />
    </View>
  );
};



const styles = StyleSheet.create({
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disabledButton: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  disabledText: {
    color: '#999',
  },
  
  // iOS Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area for iPhone
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  confirmButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  picker: {
    height: 200,
  },
  
  // Date Range Picker Styles
  dateRangeContainer: {
    marginVertical: 8,
  },
  dateRangeSeparator: {
    alignItems: 'center',
    marginVertical: 8,
  },
  separatorText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

