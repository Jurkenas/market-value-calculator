import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
// import * as Yup from 'yup';
import Button from '../../Input/Button/Button';
import * as styles from './CalculatorForm.module.scss';
import { Client } from '../../../Pages/ClientDiscountPage/ClientDiscountPage';
import DatePicker from '../../Input/DatePicker/DatePicker';
import InputAutoComplete from '../../Input/AutoComplete/AutoComplete';

interface CalculatorFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: Client) => void;
}

// const options = [
//   { value: 'Burns Bay Road' },
//   { value: 'Downing Street' },
//   { value: 'Wall Street' },
// ];

function CalculatorForm({ handleSubmit }: CalculatorFormProps) {
  return (
    <span data-testid="client-discount-form-container">
      <h2>Paskaičiuokite automobilio vertę</h2>
      <Formik
        initialValues={{
          make: undefined,
          model: undefined,
          yearFrom: undefined,
          yearTo: undefined,
        }}
        validateOnChange={false}
        // validationSchema={Yup.object().shape({
        //   discount: Yup.number()
        //     .typeError('Only numbers are allowed')
        //     .required('Discount is required'),
        //   clientId: Yup.number()
        //     .typeError('Only numbers are allowed')
        //     .required('Client ID is required'),
        // })}
        onSubmit={(values: Client) => {
          handleSubmit(values);
        }}
      >
        {({ setFieldValue, submitForm, errors }) => (
          <Form
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitForm();
              }
            }}
          >
            <ErrorMessage name="discount" className={styles['error']} component="div" />
            <label htmlFor="make">Markė:</label>
            <InputAutoComplete
              // name="make"
              // options={options}
              // filterOption={(inputValue, option) =>
              //   option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              // }
              onChange={(value) => setFieldValue('make', value)}
            />
            <label htmlFor="model">Modelis:</label>
            <InputAutoComplete
              // name="model"
              // options={options}
              // filterOption={(inputValue, option) =>
              //   option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              // }
              onChange={(value) => setFieldValue('model', value)}
            />
            <label htmlFor="yearFrom">Metai nuo:</label>
            <DatePicker
              id="year-from"
              onChange={(value) => setFieldValue('yearFrom', +value.toISOString().slice(0, 4))}
            />
            <label htmlFor="yearTo">Metai iki:</label>
            <DatePicker
              id="year-to"
              onChange={(value) => setFieldValue('yearTo', +value.toISOString().slice(0, 4))}
            />
            <ErrorMessage className={styles['error']} name="clientId" component="div" />
            <Button type="primary" onClick={submitForm} data-testid="client-discount-form-submit">
              Skaičiuoti
            </Button>
          </Form>
        )}
      </Formik>
    </span>
  );
}

export default CalculatorForm;
