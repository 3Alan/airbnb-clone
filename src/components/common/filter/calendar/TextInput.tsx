import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import CalendarModal from './Modal';
import Colors from '../../../../constants/Colors';

import { useTrip } from '@/store/trip';

interface DateTextInputProps {
  contentStyle?: ViewStyle;
  dateFormat?: string;
  showDuration?: boolean;
  rangeStyle?: TextStyle;
}

const DateTextInput: FC<DateTextInputProps> = ({
  contentStyle,
  dateFormat = 'MM月DD日',
  showDuration = true,
  rangeStyle
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { dateRange, setDateRange } = useTrip(state => state);

  const handleDatePress = () => {
    setShowCalendar(true);
  };

  return (
    <>
      <Pressable style={contentStyle} onPress={handleDatePress}>
        {dateRange.length > 0 ? (
          <View style={styles.row}>
            <Text style={[styles.dateRange, rangeStyle]}>
              {dayjs(dateRange[0]).format(dateFormat)} - {dayjs(dateRange[1]).format(dateFormat)}
            </Text>

            {showDuration && (
              <Text style={styles.duration} numberOfLines={1}>
                共{dayjs(dateRange[1]).diff(dayjs(dateRange[0]), 'day')}晚
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.placeholder} numberOfLines={1}>
            入住退房时间
          </Text>
        )}
      </Pressable>
      <CalendarModal
        date={dateRange}
        visible={showCalendar}
        onChange={setDateRange}
        onClose={() => setShowCalendar(false)}
      />
    </>
  );
};

export default DateTextInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateRange: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textColor
  },
  duration: {
    paddingLeft: 3,
    fontSize: 12,
    color: Colors.textGrey
  },
  placeholder: {
    fontSize: 14,
    color: Colors.textGrey
  }
});
