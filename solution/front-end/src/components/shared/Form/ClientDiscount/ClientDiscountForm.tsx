import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputCurrency from '../../Input/InputCurrency/InputCurrency';
import Button from '../../Input/Button/Button';
import InputNumber from '../../Input/InputNumber/InputNumber';
import * as styles from './ClientDiscountForm.module.scss';
import { Client } from '../../../Pages/ClientDiscountPage/ClientDiscountPage';

interface ClientDiscountFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: Client) => void;
}

function ClientDiscountForm({ handleSubmit }: ClientDiscountFormProps) {
  return (
    <span data-testid="client-discount-form-container">
      <h2>Specify discount details</h2>
      <Formik
        initialValues={{
          clientId: undefined,
          discount: undefined,
        }}
        validateOnChange={false}
        validationSchema={Yup.object().shape({
          discount: Yup.number()
            .typeError('Only numbers are allowed')
            .required('Discount is required'),
          clientId: Yup.number()
            .typeError('Only numbers are allowed')
            .required('Client ID is required'),
        })}
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
            <label htmlFor="discount">Discounted price in € (euros)</label>
            <InputCurrency
              id="discount"
              name="discount"
              placeholder="Enter the discount"
              disableGroupSeparators
              disableAbbreviations
              allowNegativeValue={false}
              isValid={!errors.discount}
              autoComplete="off"
              onChange={(e) => setFieldValue('discount', e.target.value)}
              data-testid="client-discount-form-discount"
            />
            <ErrorMessage name="discount" className={styles['error']} component="div" />
            <label htmlFor="clientId">Client ID</label>
            <InputNumber
              name="clientId"
              id="clientId"
              status={errors.clientId ? 'error' : ''}
              onValueChange={(value) => setFieldValue('clientId', value)}
              placeholder="Please enter client ID"
              data-testid="client-discount-form-client-id"
            />
            <ErrorMessage className={styles['error']} name="clientId" component="div" />
            <Button type="primary" onClick={submitForm} data-testid="client-discount-form-submit">
              Save discount
            </Button>
          </Form>
        )}
      </Formik>
    </span>
  );
}

export default ClientDiscountForm;
