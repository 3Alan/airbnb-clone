import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import Calendar, { CalendarRef } from './Calendar';
import Button from '../Button';
import Tabs from './Tabs';

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

  const handleCleanDate = () => {
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
    <Modal
      onRequestClose={handleClose}
      animationType="fade"
      visible={visible}
      transparent
      statusBarTranslucent
    >
      <Pressable style={styles.mask} onPress={handleClose}></Pressable>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>选择日期</Text>
          <Pressable
            style={styles.close}
            disabled={currentTab === '月租'}
            onPress={handleCleanDate}
          >
            <Text
              style={{
                color: currentTab === '月租' ? '#999' : '#333'
              }}
            >
              清除
            </Text>
          </Pressable>
        </View>

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

        <View style={styles.action}>
          <Button onPress={handleSavePress} theme="secondary" disabled={tempValue.length === 1}>
            保存
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  tabPanel: {
    padding: 15,
    minHeight: 380
  },
  tabItem: {
    width: '100%'
  },
  action: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ebebeb'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    color: '#333'
  },
  close: {
    position: 'absolute',
    right: 18
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 100,
    left: 14,
    right: 14
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  }
});
