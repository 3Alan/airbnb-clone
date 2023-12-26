import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import GuestItem from './GuestItem';
import FilterModal from '../Modal';

import { GuestNumber } from '@/store/slices/filterSlice';

interface GuestModalProps {
  visible: boolean;
  onClose: () => void;
  date?: string[];
  value?: GuestNumber;
  onChange?: (guest: GuestNumber) => void;
}

const GuestModal: FC<GuestModalProps> = ({
  value = {
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  },
  visible,
  onChange,
  onClose
}) => {
  const [guestValue, setGuestValue] = useState<GuestNumber>({
    adultNumber: 0,
    childrenNumber: 0,
    infantNumber: 0
  });

  useEffect(() => {
    setGuestValue(value);
  }, [value]);

  const handleClear = () => {
    setGuestValue({
      adultNumber: 0,
      childrenNumber: 0,
      infantNumber: 0
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleSavePress = () => {
    onChange?.(guestValue);
    handleClose();
  };

  const onChangeGuest = (value: number, type: keyof GuestNumber) => {
    setGuestValue(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <FilterModal
      title="选择人数"
      visible={visible}
      onClear={handleClear}
      onSave={handleSavePress}
      onClose={handleClose}
      contentStyle={styles.modalContent}
      modalStyle={{
        bottom: '28%'
      }}
    >
      <GuestItem
        title="成人"
        description="13岁或以上"
        value={guestValue.adultNumber}
        onChange={value => {
          onChangeGuest(value, 'adultNumber');
        }}
      />
      <GuestItem
        title="儿童"
        description="2 - 12 岁"
        value={guestValue.childrenNumber}
        onChange={value => {
          onChangeGuest(value, 'childrenNumber');
        }}
      />
      <GuestItem
        title="婴儿"
        description="2岁以下"
        value={guestValue.infantNumber}
        onChange={value => {
          onChangeGuest(value, 'infantNumber');
        }}
      />
    </FilterModal>
  );
};

export default GuestModal;

const styles = StyleSheet.create({
  modalContent: {
    paddingHorizontal: 20
  }
});
