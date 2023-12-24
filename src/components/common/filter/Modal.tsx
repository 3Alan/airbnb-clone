import React, { FC, PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../Button';

interface FilterModalProps {
  title: string;
  visible: boolean;
  saveDisabled?: boolean;
  clearDisabled?: boolean;
  top?: number;
  bottom?: number;
  onClear: () => void;
  onClose: () => void;
  onSave: () => void;
}

const FilterModal: FC<PropsWithChildren<FilterModalProps>> = ({
  title,
  top,
  bottom,
  children,
  saveDisabled,
  clearDisabled,
  visible,
  onClear,
  onClose,
  onSave
}) => {
  return (
    <Modal
      onRequestClose={onClose}
      animationType="fade"
      visible={visible}
      transparent
      statusBarTranslucent
    >
      <Pressable style={styles.mask} onPress={onClose} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Pressable style={styles.close} disabled={clearDisabled} onPress={onClear}>
            <Text
              style={{
                color: clearDisabled ? '#999' : '#333'
              }}
            >
              清除
            </Text>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>{children}</View>

        <View style={styles.action}>
          <Button onPress={onSave} theme="secondary" disabled={saveDisabled}>
            保存
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
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
  contentContainer: {
    paddingHorizontal: 15
  }
});
