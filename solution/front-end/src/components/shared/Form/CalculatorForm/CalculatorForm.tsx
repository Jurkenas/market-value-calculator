import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import Button from '../../Input/Button/Button';
import * as styles from './CalculatorForm.module.scss';
import { Client } from '../../../Pages/ClientDiscountPage/ClientDiscountPage';
import DatePicker from '../../Input/DatePicker/DatePicker';
import InputAutoComplete from '../../Input/AutoComplete/AutoComplete';
import Select from '../../Input/Select/Select';

interface CalculatorFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: Client) => void;
}

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
        {({ setFieldValue, submitForm }) => (
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
              onChange={(value) => setFieldValue('make', value)}
              placeholder="Įrašykite"
            />
            <label htmlFor="model">Modelis:</label>
            <InputAutoComplete
              onChange={(value) => setFieldValue('model', value)}
              placeholder="Įrašykite"
            />
            <div className="year-selection">
              <label htmlFor="yearFrom">Metai nuo:</label>
              <label htmlFor="yearTo">Metai iki:</label>
              <DatePicker
                id="year-from"
                onChange={(value) => setFieldValue('yearFrom', +value.toISOString().slice(0, 4))}
              />
              <DatePicker
                id="year-to"
                onChange={(value) => setFieldValue('yearTo', +value.toISOString().slice(0, 4))}
              />
            </div>
            <label htmlFor="gearBox">Pavarų dėžė:</label>
            <Select
              placeholder="Pasirinkite"
              options={[
                { value: 'Mechaninė', label: 'Mechaninė' },
                { value: 'Automatinė', label: 'Automatinė' },
              ]}
              id="gearBox"
              onChange={(value) => setFieldValue('gearBox', value)}
            />
            <label htmlFor="fuel">Kuro tipas:</label>
            <Select
              placeholder="Pasirinkite"
              options={[
                { value: 'Dyzelinas', label: 'Dyzelinas' },
                { value: 'Benzinas', label: 'Benzinas' },
                { value: 'Benzinas/Dujos', label: 'Benzinas/Dujos' },
                { value: 'Benzinas/Elektra', label: 'Benzinas/Elektra' },
                { value: 'Elektra', label: 'Elektra' },
                { value: 'Dyzelinas/Elektra', label: 'Dyzelinas/Elektra' },
                { value: 'Etanolis', label: 'Etanolis' },
                { value: 'Kitas', label: 'Kitas' },
              ]}
              id="fuel"
              onChange={(value) => setFieldValue('fuel', value)}
            />
            <label htmlFor="body-type">Kebulo tipas:</label>
            <Select
              placeholder="Pasirinkite"
              options={[
                { value: 'Sedanas', label: 'Sedanas' },
                { value: 'Hečbekas', label: 'Hečbekas' },
                { value: 'Universalas', label: 'Universalas' },
                { value: 'Visureigis', label: 'Visureigis' },
                { value: 'Vienatūris', label: 'Vienatūris' },
                { value: 'Coupe', label: 'Coupe' },
                { value: 'Kabrioletas', label: 'Kabrioletas' },
              ]}
              id="body-type"
              onChange={(value) => setFieldValue('bodyType', value)}
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
