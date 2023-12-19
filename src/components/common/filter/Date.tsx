import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { FC, useState } from 'react';
import { CalendarModal } from '../calendar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { changeDateRange } from '../../../store/slices/filterSlice';
import Colors from '../../../constants/Colors';
import dayjs from 'dayjs';

interface FilterDateProps {
  contentStyle?: ViewStyle;
  dateFormat?: string;
  showDuration?: boolean;
  rangeStyle?: TextStyle;
}

const FilterDate: FC<FilterDateProps> = ({
  contentStyle,
  dateFormat = 'MM月DD日',
  showDuration = true,
  rangeStyle
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state: RootState) => state.filter);

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
          <Text style={styles.placeholder}>入住退房时间</Text>
        )}
      </Pressable>
      <CalendarModal
        date={dateRange}
        visible={showCalendar}
        onChange={date => {
          dispatch(changeDateRange(date));
        }}
        onClose={() => setShowCalendar(false)}
      />
    </>
  );
};

export default FilterDate;

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
    fontSize: 15,
    color: Colors.textGrey
  }
});
