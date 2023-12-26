import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';

interface GuestItemProps {
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

const GuestItem: FC<GuestItemProps> = ({ title, description, value, onChange }) => {
  const disabled = value === 0;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.control}>
        <Pressable
          style={[
            styles.button,
            {
              opacity: disabled ? 0.5 : 1
            }
          ]}
          disabled={disabled}
          onPress={() => {
            if (value > 0) {
              onChange(value - 1);
            }
          }}
        >
          <AntDesign name="minus" />
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            onChange(value + 1);
          }}
        >
          <Ionicons name="add" />
        </Pressable>
      </View>
    </View>
  );
};

export default GuestItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 12,
    color: Colors.grey
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    paddingHorizontal: 10,
    width: 40,
    textAlign: 'center'
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
