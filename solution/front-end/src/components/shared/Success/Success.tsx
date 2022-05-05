import React from 'react';
import Button from '../Input/Button/Button';

interface SuccessProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (e: React.FormEvent) => void;
  testId?: string;
}

function Success({ onSubmit, testId }: SuccessProps) {
  return (
    <>
      <h2>Success!</h2>
      <Button type="primary" onClick={onSubmit} data-testid={testId}>
        Go back
      </Button>
    </>
  );
}

export default Success;
