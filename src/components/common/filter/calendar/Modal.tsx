import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import Calendar, { CalendarRef } from './Calendar';
import Tabs from './Tabs';
import FilterModal from '../Modal';

function isDateSame(prev?: string[], next?: string[]) {
  if (!prev || !next) {
    return false;
  }

  if (prev.length !== next.length) {
    return false;
  }

  return prev.every((item, index) => item === next[index]);
}

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  date?: string[];
  onChange?: (date: string[]) => void;
}

const CalendarModal: FC<CalendarModalProps> = ({ visible, date, onClose, onChange }) => {
  const calendarRef = useRef<CalendarRef>(null);
  const [currentTab, setCurrentTab] = useState<string>('短租');
  const [tempValue, setTempValue] = useState<string[]>(date || []);

  useEffect(() => {
    setTempValue(date || []);
  }, [date]);

  const handleClearDate = () => {
    calendarRef.current?.clean();
    setTempValue([]);
  };

  const handleDateChange = (date: string[]) => {
    setTempValue(date);
  };

  const handleClose = () => {
    setTempValue([]);
    onClose();
  };

  const handleSavePress = () => {
    onChange?.(tempValue);
    handleClose();
  };

  return (
    <FilterModal
      title="选择日期"
      visible={visible}
      saveDisabled={tempValue.length === 1}
      clearDisabled={currentTab === '月租'}
      onClear={handleClearDate}
      onSave={handleSavePress}
      onClose={handleClose}
    >
      <Tabs
        currentTab={currentTab}
        tabs={[
          {
            label: '短租',
            children: <Calendar ref={calendarRef} date={date} onChange={handleDateChange} />
          },
          { label: '月租', children: <Text>开发中</Text> }
        ]}
        onChange={setCurrentTab}
        tabContainerStyle={styles.tabPanel}
      />
    </FilterModal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  tabPanel: {
    minHeight: 360
  }
});
