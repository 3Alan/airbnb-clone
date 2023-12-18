import React, { FC, useEffect, useMemo, useState } from 'react';
import { Calendar as BaseCalendar, LocaleConfig, DateData } from 'react-native-calendars';
import dayjs from 'dayjs';
import CalendarDay, { CalendarDayProps } from './Day';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Ionicons } from '@expo/vector-icons';

type MarkedDatesEnhanced = {
  [key: string]: CalendarDayProps['marking'];
} | null;

LocaleConfig.locales['zh'] = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  today: '今天'
};

LocaleConfig.defaultLocale = 'zh';

const getRangeMarking = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return {};
  }

  const rangeSize = dayjs(endDate).diff(startDate, 'day');
  const range: MarkedDatesEnhanced = {};
  // 设置开始日期
  range[dayjs(startDate).format('YYYY-MM-DD')] = {
    startingDay: true
  };
  // 设置中间日期
  for (let i = 0; i < rangeSize - 1; i++) {
    range[
      dayjs(startDate)
        .add(i + 1, 'day')
        .format('YYYY-MM-DD')
    ] = {
      rangeDay: true
    };
  }
  // 设置结束日期
  range[dayjs(startDate).add(rangeSize, 'day').format('YYYY-MM-DD')] = {
    endingDay: true
  };

  return range;
};

/**
 * 添加 disabled 的日期
 * @param initialDate
 * @param markedDates
 * @returns
 */
const getMergedMarkedDates = (initialDate?: string, markedDates?: MarkedDatesEnhanced) => {
  const mergedMarkedDates: MarkedDatesEnhanced = { ...markedDates };
  if (dayjs(initialDate).isSame(dayjs(), 'month')) {
    const startOfMonth = dayjs().startOf('month');
    const rangeSize = dayjs(initialDate).diff(startOfMonth, 'day');
    for (let i = 0; i < rangeSize; i++) {
      mergedMarkedDates[dayjs(startOfMonth).add(i, 'day').format('YYYY-MM-DD')] = {
        disabled: true
      };
    }
  }
  return mergedMarkedDates;
};

interface CalendarProps {
  date?: string[];
  onChange?: (date: string[]) => void;
}

const Calendar: FC<CalendarProps> = ({ onChange, date }) => {
  const [dateRange, setDateRange] = useState<MarkedDatesEnhanced>(null);
  const [disableArrowLeft, setDisableArrowLeft] = useState(false);

  useEffect(() => {
    setDateRange(getRangeMarking(date?.[0], date?.[1]));
  }, [date]);

  const handleDayPress = (date: DateData) => {
    // 一个也没有选中或者选中了2个，这时清空之前的选中，选中当前的
    if (!dateRange || Object.keys(dateRange).length >= 2) {
      setDateRange({
        [date.dateString]: {
          selected: true
        }
      });

      return;
    }

    // 选中的日期在之前选中的日期之前，这时清空之前的选中，选中当前的
    if (dayjs(date.dateString).isBefore(dayjs(Object.keys(dateRange)[0]))) {
      setDateRange({
        [date.dateString]: {
          selected: true
        }
      });

      return;
    }

    const startDate = Object.keys(dateRange)[0];
    const endDate = date.dateString;
    const range = getRangeMarking(startDate, endDate);

    onChange?.([dayjs(startDate).format('YYYY-MM-DD'), dayjs(endDate).format('YYYY-MM-DD')]);

    setDateRange({
      ...range
    });
  };

  const markedDates = getMergedMarkedDates(dayjs().format('YYYY-MM-DD'), dateRange);

  return (
    <BaseCalendar
      theme={{
        textSectionTitleColor: '#7d7d7d',
        selectedDayBackgroundColor: '#222222',
        dayTextColor: '#252525',
        weekVerticalMargin: 1
      }}
      monthFormat="yyyy 年 MM 月"
      initialDate={dayjs().format('YYYY-MM-DD')}
      onMonthChange={date => {
        setDisableArrowLeft(date.month === dayjs().month() + 1);
      }}
      disableArrowLeft={disableArrowLeft}
      renderArrow={direction =>
        direction === 'left' ? (
          <Ionicons color={disableArrowLeft ? '#ccc' : '#333'} name="chevron-back" size={20} />
        ) : (
          <Ionicons color="#333" name="chevron-forward" size={20} />
        )
      }
      hideExtraDays
      dayComponent={p => <CalendarDay {...(p as CalendarDayProps)} />}
      onDayPress={handleDayPress}
      markedDates={markedDates as MarkedDates}
    />
  );
};

export default Calendar;
