import { LinearGradient } from 'expo-linear-gradient';
import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { BasicDayProps } from 'react-native-calendars/src/calendar/day/basic';

export type CalendarDayProps = Omit<BasicDayProps, 'marking'> & {
  date: DateData;
  marking?: BasicDayProps['marking'] & {
    rangeDay?: boolean;
  };
};

function getMarkStyle(marketing: CalendarDayProps['marking']) {
  if (marketing?.selected) {
    return {
      containerStyle: null,
      dayStyle: styles.selectedDay,
      textStyle: styles.selectedText
    };
  }

  if (marketing?.startingDay) {
    return {
      containerStyle: null,
      dayStyle: styles.selectedDay,
      textStyle: styles.selectedText
    };
  }

  if (marketing?.endingDay) {
    return {
      containerStyle: null,
      dayStyle: styles.selectedDay,
      textStyle: styles.selectedText
    };
  }

  if (marketing?.rangeDay) {
    return {
      containerStyle: styles.rangeContainer,
      dayStyle: null,
      textStyle: null
    };
  }

  return {
    containerStyle: null,
    dayStyle: null,
    textStyle: null
  };
}

const CalendarDay: FC<CalendarDayProps> = ({ onPress, date, marking, state }) => {
  const { containerStyle, dayStyle, textStyle } = getMarkStyle(marking);
  const today = state === 'today';

  const handlePress = () => {
    if (marking?.disabled) {
      return;
    }

    onPress?.(date);
  };

  if (marking?.startingDay || marking?.endingDay) {
    return (
      <Pressable style={[styles.dayContainer, containerStyle]} onPress={handlePress}>
        <LinearGradient
          style={{ width: '100%', alignItems: 'center' }}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: marking.startingDay ? 1 : 0, y: 0.5 }}
          colors={['#fff', '#f9f9f9', '#f9f9f9']}
        >
          <View style={[styles.day, today && styles.today, dayStyle]}>
            <Text style={[textStyle, marking?.disabled && styles.disabled]}>{date.day}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.dayContainer, containerStyle]} onPress={handlePress}>
      <View style={[styles.day, today && styles.today, dayStyle]}>
        <Text style={[textStyle, marking?.disabled && styles.disabled]}>{date.day}</Text>
      </View>
    </Pressable>
  );
};

export default CalendarDay;

const styles = StyleSheet.create({
  dayContainer: {
    width: '100%',
    alignItems: 'center'
  },
  disabled: {
    textDecorationLine: 'line-through',
    color: '#b0b0b0'
  },
  day: {
    padding: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  today: {
    borderWidth: 1,
    borderColor: '#818181'
  },
  selectedDay: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#222'
  },
  selectedText: {
    color: '#fff'
  },
  rangeContainer: {
    backgroundColor: '#f9f9f9'
  }
});
