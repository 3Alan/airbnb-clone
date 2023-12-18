import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useState } from 'react';
import Calendar from './Calendar';
import Button from '../Button';
import Tabs from './Tabs';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  date?: string[];
  onChange?: (date: string[]) => void;
  onCleanDate?: () => void;
}

const CalendarModal: FC<CalendarModalProps> = ({
  visible,
  date,
  onClose,
  onChange,
  onCleanDate
}) => {
  const [currentTab, setCurrentTab] = useState<string>('短租');

  return (
    <Modal animationType="fade" visible={visible} transparent statusBarTranslucent>
      <Pressable style={styles.mask} onPress={onClose}></Pressable>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>选择日期</Text>
          <Pressable style={styles.close} disabled={currentTab === '月租'} onPress={onCleanDate}>
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
            { label: '短租', children: <Calendar date={date} onChange={onChange} /> },
            { label: '月租', children: <Text>开发中</Text> }
          ]}
          onChange={setCurrentTab}
          tabContainerStyle={styles.tabPanel}
        />

        {/* <View style={styles.tabPanel}>
          <View
            style={[
              styles.tabItem,
              {
                display: currentTab === '短租' ? 'flex' : 'none'
              }
            ]}
          >
            <Calendar date={date} onChange={onChange} />
          </View>

          <View
            style={[
              styles.tabItem,
              {
                display: currentTab === '月租' ? 'flex' : 'none'
              }
            ]}
          >
            <Text>开发中</Text>
          </View>
        </View> */}

        <View style={styles.action}>
          <Button theme="secondary" disabled={date?.length === 0}>
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
