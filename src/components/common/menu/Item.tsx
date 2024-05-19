import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import WebLink from '../WebLink';

export interface ItemProps {
  name: string;
  desc?: string;
  icon: React.ReactNode;
  href: string;
  isWebLink?: boolean;
  onPress?: () => void;
}

const Item = ({ name, desc, icon, href, onPress, isWebLink }: ItemProps) => {
  const router = useRouter();
  const { styles } = useStyles(styleSheet);

  const handlePress = () => {
    if (!href) {
      router.navigate(href);
      return;
    }

    if (onPress) {
      onPress();
    }
  };

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.left}>
          {icon}
          <View style={styles.content}>
            <Text style={styles.text}>{name}</Text>
            {desc && <Text style={styles.desc}>{desc}</Text>}
          </View>
        </View>
        <FontAwesome name="angle-right" size={20} />
      </TouchableOpacity>
    );
  };

  return <>{isWebLink ? <WebLink href={href}>{renderContent()}</WebLink> : renderContent()}</>;
};

export default Item;

const styleSheet = createStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    paddingLeft: theme.spacing.md
  },
  text: {
    fontSize: theme.size.md
  },
  desc: {
    fontSize: theme.size.sm,
    color: theme.colors.gray500,
    paddingTop: theme.spacing['2xs']
  }
}));
