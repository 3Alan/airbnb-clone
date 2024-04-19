import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import request from '../../../utils/request';
import Button from '../Button';
import TextInput from '../TextInput';

export interface WishSheetRef {
  open: () => Promise<void>;
  close: () => void;
}

interface WishSheetProps {
  name?: string;
  listId: string;
}

const WishSheet = forwardRef(({ name, listId }: WishSheetProps, ref) => {
  const { styles } = useStyles(styleSheet);
  const toast = useToast();
  const createSheet = useRef<BottomSheetModal>(null);
  const listSheet = useRef<BottomSheetModal>(null);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: name ? `${name} ${dayjs().year()}` : ''
    }
  });

  const mutation = useMutation({
    mutationFn: data => {
      return request.post('/wishlists', data);
    }
  });

  const handleOpenListSheet = () => {
    listSheet.current?.present();
  };
  const handleCloseListSheet = () => {
    listSheet.current?.dismiss();
  };

  const handleOpenCreateSheet = () => {
    createSheet.current?.present();
  };

  const handleCloseCreateSheet = () => {
    createSheet.current?.dismiss();
    handleCloseListSheet();
  };

  const handleOpenModalSheet = async () => {
    handleOpenListSheet();
    const { data } = await request('/wishlists');

    if (isEmpty(data)) {
      handleOpenCreateSheet();
    }
  };

  const onCreateList = async (data: any) => {
    const res = await mutation.mutateAsync(data);
    if (res.data.success) {
      createSheet.current?.dismiss();
    } else {
      toast.show(res.data.message, {
        type: 'danger'
      });
    }
  };

  useImperativeHandle(ref, () => ({
    open: handleOpenModalSheet,
    close: handleCloseListSheet
  }));

  return (
    <>
      <BottomSheetModal
        ref={listSheet}
        handleComponent={() => (
          <View style={styles.handle}>
            <Ionicons size={22} name="close" onPress={handleCloseListSheet} />
            <Text style={styles.handleTitle}>添加至心愿单</Text>
          </View>
        )}
        enablePanDownToClose
        topInset={UnistylesRuntime.insets.top}
        snapPoints={['100%']}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Text>TODO</Text>
        </BottomSheetScrollView>
      </BottomSheetModal>

      <BottomSheetModal
        backdropComponent={() => <View style={styles.mask} />}
        handleComponent={() => (
          <View style={styles.handle}>
            <Ionicons size={22} name="close" onPress={handleCloseCreateSheet} />
            <Text style={styles.handleTitle}>创建心愿单</Text>
          </View>
        )}
        snapPoints={[300]}
        ref={createSheet}
      >
        <BottomSheetView style={styles.createContainer}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChangeText={onChange} />
              )}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Button theme="secondary" onPress={handleSubmit(onCreateList)}>
              创建
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
});

export default WishSheet;

const styleSheet = createStyleSheet(theme => ({
  mask: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  handle: {
    padding: theme.spacing.xl,
    flexDirection: 'row'
  },
  handleTitle: {
    fontSize: theme.size.lg,
    fontWeight: 'bold',
    paddingLeft: theme.spacing.md
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
    paddingHorizontal: theme.spacing.xl
  },
  createContainer: {
    justifyContent: 'space-between'
  },
  formContainer: {
    paddingHorizontal: theme.spacing.xl
  },
  bottomContainer: {
    flexDirection: 'row',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    marginTop: theme.spacing.xl,
    padding: theme.spacing.xl
  }
}));
