import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Animated from 'react-native-reanimated';

interface FilterItemProps {
  name: string;
  onPress?: () => void;
}

const FilterItem: FC<FilterItemProps> = ({ name, onPress }) => {
  const [deg, setDeg] = useState(0);

  const handlePress = () => {
    setDeg(deg === 0 ? 180 : 0);
    onPress?.();
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <Text style={styles.text}>{name}</Text>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              {
                rotate: `${deg}deg`
              }
            ]
          }
        ]}
      >
        <Ionicons name="chevron-down" style={styles.icon} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const FilterBar = () => {
  return (
    <View style={styles.container}>
      <FilterItem name="人数" />
      <View style={styles.separate}></View>
      <FilterItem name="筛选" />
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor
  },
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separate: {
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor
  },
  text: {
    color: Colors.textColor
  },
  iconContainer: {
    backgroundColor: '#f7f7f7',
    padding: 2,
    marginLeft: 2,
    borderRadius: 10
  },
  icon: {
    color: '#8d8d8d',
    fontSize: 10
  }
});
