import React, { useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import type { FormikProps } from 'formik';
import * as yup from 'yup';

import { Button } from '../Button/Button';

import { TodoState, fetchTodos, addTodo } from '../../store/todo';
import {
  selectTodoInProgress,
  selectCompletedTodo,
  selectIncompletedTodo
} from '../../store/todo/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';

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
  id: Date.now() + Math.random(),
  title: '',
  description: '',
  duration: 0,
  inProgress: false,
  completed: false
};

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState(initialValues);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todoInProgress = useAppSelector((state) => selectTodoInProgress(state));
  const completedTodo = useAppSelector((state) => selectCompletedTodo(state));
  const incompletedTodo = useAppSelector((state) => selectIncompletedTodo(state));

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
                className={styles.form_input_title}
                placeholder='Введите название задачи'
                type='text'
                name='title'
                onChange={(event) => onChangeTodoTitle(event)}
                onBlur={formik.handleBlur}
              />
            </p>
            {formik.touched.title && formik.errors.title && (
              <p className='error'>{formik.errors.title}</p>
            )}

            <p>
              <input
                className={styles.form_input_description}
                placeholder='Введите задачу'
                type='text'
                name='description'
                onChange={(event) => onChangeTodoDescription(event)}
                onBlur={formik.handleBlur}
              />
            </p>
            {formik.touched.description && formik.errors.description && (
              <p className='error'>{formik.errors.description}</p>
            )}

            <Button color='blue' type='submit' onClick={onSubmit}>
              Сохранить
            </Button>
          </div>
        </Formik>
      </div>
      {completedTodo.map((todo) => (
        <TodoItem todo={todo} key={todo?.id} />
      ))}
      {todoInProgress.map((todo) => (
        <TodoItem todo={todo} key={todo?.id} />
      ))}
      {incompletedTodo.map((todo) => (
        <TodoItem todo={todo} key={todo?.id} />
      ))}
    </div>
  );
};
