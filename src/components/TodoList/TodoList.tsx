import React, { useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import type { FormikProps } from 'formik';
import * as yup from 'yup';

import { Button } from '../Button/Button';

import { TodoState, fetchTodos } from '../../store/todo';
import {
  selectTodoInProgress,
  selectCompletedTodo,
  selectIncompletedTodo
} from '../../store/todo/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import styles from './TodoList.module.css';

interface FormikValuesProps {
  userId: number;
  id: number;
  title: string;
  description: string;
  duration: number;
  inProgress: boolean;
  completed: boolean;
}

const initialValues: TodoState = {
  userId: 1,
  id: 1,
  title: '',
  description: '',
  duration: 0,
  inProgress: false,
  completed: false
};

export const TodoList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todoInProgress = useAppSelector((state) => selectTodoInProgress(state));
  const completedTodo = useAppSelector((state) => selectCompletedTodo(state));
  const incompletedTodo = useAppSelector((state) => selectIncompletedTodo(state));

  const validationSchema = yup.object().shape({
    title: yup.string().typeError('Должно быть строкой').required('Обязательно')
  });

  const formik: FormikProps<FormikValuesProps> = useFormik<FormikValuesProps>({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className={styles.root}>
      <div>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          onSubmit={() => {
            formik.handleSubmit;
          }}
        >
          <div className={styles.form_container}>
            <p>
              <input
                className={styles.form_input}
                placeholder='Введите задачу'
                type='text'
                name='title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </p>
            {formik.touched.title && formik.errors.title && (
              <p className='error'>{formik.errors.title}</p>
            )}

            <Button color='blue' type='submit' disabled={formik.isSubmitting}>
              Сохранить
            </Button>
          </div>
        </Formik>
      </div>
      {completedTodo.map((todo) => (
        <div>
          <div>{todo?.title}</div>
          <div>{todo?.description}</div>
          <div>Duration: {todo?.duration} hours</div>
          <div>
            <Button color='orange'>EDIT</Button>
            <Button color='red'>DELETE</Button>
          </div>
        </div>
      ))}
      {todoInProgress.map((todo) => (
        <div>
          <div>{todo?.title}</div>
          <div>{todo?.description}</div>
          <div>Duration: {todo?.duration} hours</div>
          <div>
            <Button color='orange'>EDIT</Button>
            <Button color='red'>DELETE</Button>
          </div>
        </div>
      ))}
      {incompletedTodo.map((todo) => (
        <div>
          <div>{todo?.title}</div>
          <div>{todo?.description}</div>
          <div>Duration: {todo?.duration} hours</div>
          <div>
            <Button color='orange'>EDIT</Button>
            <Button color='red'>DELETE</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
