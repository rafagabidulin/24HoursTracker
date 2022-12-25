import React, { useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import type { FormikProps } from 'formik';
import * as yup from 'yup';

import { Button } from '../Button/Button';

import { fetchTodos, addTodo } from '../../store/todo';
import { useAppDispatch } from '../../hooks/hooks';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../../constants/colors';
import TodoState from '../../types';

import styles from './TodoPanel.module.css';

const initialValues: TodoState = {
  userId: 0,
  id: 0,
  title: '',
  description: '',
  duration: 0,
  inProgress: false,
  completed: false,
  backgroundColor: '',
  borderColor: ''
};

export const TodoPanel = () => {
  const [newTodo, setNewTodo] = useState(initialValues);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const onChangeTodoTitle = ({ target }: React.FormEvent<HTMLInputElement>) => {
    if ((target as HTMLInputElement).value === '') return;
    setNewTodo({
      ...newTodo,
      title: (target as HTMLInputElement).value
    });
  };

  const onChangeTodoDescription = ({ target }: React.FormEvent<HTMLInputElement>) => {
    if ((target as HTMLInputElement).value === '') return;
    setNewTodo({
      ...newTodo,
      description: (target as HTMLInputElement).value
    });
  };

  const onChangeTodoDuration = ({ target }: React.FormEvent<HTMLInputElement>) => {
    if ((target as HTMLInputElement).value === '') return;
    const index = Math.floor(Math.random() * BACKGROUND_COLORS.length);
    setNewTodo({
      ...newTodo,
      duration: Number((target as HTMLInputElement).value),
      backgroundColor: BACKGROUND_COLORS[index],
      borderColor: BORDER_COLORS[index]
    });
  };

  const onSubmit = () => {
    dispatch(addTodo(newTodo));
    setNewTodo(initialValues);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().typeError('Должно быть строкой').required('Обязательно')
  });

  const formik: FormikProps<TodoState> = useFormik<TodoState>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit
  });

  return (
    <div className={styles.todo_panel_container}>
      <div>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          onSubmit={() => {
            formik.handleSubmit;
          }}
        >
          <div className={styles.fields_container}>
            <div className={styles.field_container}>
              <input
                className={styles.form_input_title}
                placeholder='Enter task title'
                type='text'
                name='title'
                onChange={(event) => onChangeTodoTitle(event)}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.title && formik.errors.title && (
              <p className='error'>{formik.errors.title}</p>
            )}

            <div className={styles.field_container}>
              <input
                className={styles.form_input_description}
                placeholder='Enter task'
                type='text'
                name='description'
                onChange={(event) => onChangeTodoDescription(event)}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.description && formik.errors.description && (
              <p className='error'>{formik.errors.description}</p>
            )}

            <div className={styles.field_container}>
              <input
                type='number'
                id='time'
                name='time'
                min='1'
                max='24'
                placeholder='How long'
                onChange={(event) => onChangeTodoDuration(event)}
              />
            </div>
            <div className={styles.form_button}>
              <Button color='blue' type='submit' onClick={onSubmit}>
                ADD
              </Button>
            </div>
          </div>
        </Formik>
      </div>
    </div>
  );
};
