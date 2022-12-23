import React, { useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import type { FormikProps } from 'formik';
import * as yup from 'yup';

import { Button } from '../Button/Button';

import { TodoState, fetchTodos, addTodo } from '../../store/todo';

import { useAppDispatch } from '../../hooks/hooks';

import styles from './TodoPanel.module.css';

interface FormikValuesProps {
  userId: number;
  id: number;
  title: string;
  description: string;
  duration: number;
  inProgress: boolean;
  completed: boolean;
  backgroundColor: string;
  borderColor: string;
}

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

const BACKGROUND_COLORS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const BORDER_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

export const TodoPanel = () => {
  const [newTodo, setNewTodo] = useState(initialValues);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const onChangeTodoTitle = ({ target }: any) => {
    if (target.value === '') return;
    setNewTodo({
      ...newTodo,
      title: target.value
    });
  };

  const onChangeTodoDescription = ({ target }: any) => {
    if (target.value === '') return;
    setNewTodo({
      ...newTodo,
      description: target.value
    });
  };

  const onChangeTodoDuration = ({ target }: any) => {
    if (target.value === '') return;
    const index = Math.floor(Math.random() * BACKGROUND_COLORS.length);
    setNewTodo({
      ...newTodo,
      duration: target.value,
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

  const formik: FormikProps<FormikValuesProps> = useFormik<FormikValuesProps>({
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
