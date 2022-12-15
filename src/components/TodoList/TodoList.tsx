import React from 'react';
import { Formik, useFormik } from 'formik';
import type { FormikProps } from 'formik';
import * as yup from 'yup';

import styles from './TodoList.module.css';

interface InitialValuesProps {
  title: string;
  completed: boolean;
}

interface FormikValuesProps {
  title: string;
  completed: boolean;
}

const initialValues: InitialValuesProps = {
  title: '',
  completed: false
};

export const TodoList = () => {
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

          <button className={styles.form_button} type='submit' disabled={formik.isSubmitting}>
            Сохранить
          </button>
        </div>
      </Formik>
    </div>
  );
};
