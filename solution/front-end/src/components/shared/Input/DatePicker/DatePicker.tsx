import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import en from 'date-fns/locale/en-GB';
import * as styles from './DatePicker.module.scss';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('en', en);

interface DatePickerProps {
  id: string;
  name?: string;
  isValid?: boolean;
  dataTestId?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (date: Date) => void;
}

function DatePicker({ id, name, isValid, dataTestId, onChange }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const error = !isValid ? styles['error'] : '';

  function handleChange(date: Date) {
    if (date) {
      date.setHours((-1 * date.getTimezoneOffset()) / 60);
    }
    setSelectedDate(date);
  }

  useEffect(() => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  }, [selectedDate]);

  return (
    <ReactDatePicker
      id={id}
      name={name}
      className="ant-input"
      placeholderText="Select date"
      dateFormat="yyyy"
      maxDate={new Date()}
      locale={en}
      showYearPicker
      selected={selectedDate}
      onChange={(date: Date) => handleChange(date)}
      onSelect={(date: Date) => handleChange(date)}
      autoComplete="off"
      customInput={<input data-testid={dataTestId} />}
    />
  );
}

export default DatePicker;
