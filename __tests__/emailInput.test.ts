import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import EmailInput from '../src/EmailInput.tsx'

//email input
//error message
//phone number
//user input

describe('Unit testing email input components', () => {
    it('renders with initial email value', () => {
        const { getByLabelText } = render(<EmailInput email="test@test.com" onEmailChange={() => {}} />);
        const inputElement = getByLabelText(/email/i);
        expect(inputElement.value).toBe('test@test.com');
    })

})