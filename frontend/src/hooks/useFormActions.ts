import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';

export const useAddFormActions = (showForm: boolean, defaultValues: Record<string, unknown>) => {
  const form = useForm({
    defaultValues,
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showForm) {
      form.reset(defaultValues);
    }
  }, [form, showForm, defaultValues]);

  const handleCloseForm = (objKey: string) => {
    dispatch(resetSelectedObj(objKey));
    form.reset();
  };

  return { form, handleCloseForm };
};

export const useEditFormActions = (showEdit: boolean, currentData: Record<string, unknown>) => {
  const form = useForm({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showEdit && currentData && form) {
      form.reset(currentData);
    }
  }, [currentData, form, showEdit]);

  const handleCloseForm = (objKey: string) => {
    dispatch(resetSelectedObj(objKey));
    form.reset();
  };

  return { form, handleCloseForm };
};

export const useFormActions = (showForm: boolean, showEdit: boolean, defaultValues: Record<string, unknown>, currentData: Record<string, unknown>) => {
  const form = useForm({
    defaultValues,
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showForm || showEdit) {
      if (currentData && showEdit) {
        form.reset(currentData);
      } else if (!showEdit) {
        form.reset(defaultValues);
      }
    }
  }, [currentData, form, showForm, showEdit, defaultValues]);

  const handleCloseForm = (objKey: string) => {
    dispatch(resetSelectedObj(objKey));
    form.reset();
  };

  return { form, handleCloseForm };
};
