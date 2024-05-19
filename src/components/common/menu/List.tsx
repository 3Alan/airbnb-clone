import { isEmpty } from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Item, { ItemProps } from './Item';
import Typography from '../Typography';

export interface ListProps {
  title?: string;
  options: ItemProps[];
}

const List = ({ title, options }: ListProps) => {
  const { styles } = useStyles(styleSheet);

  if (isEmpty(options)) {
    return null;
  }

  return (
    <View>
      {title && (
        <Typography style={styles.title} variant="h2">
          {title}
        </Typography>
      )}

      {options.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </View>
  );
};

export default List;

const styleSheet = createStyleSheet(theme => ({
  title: {
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing.xl
  }
}));
