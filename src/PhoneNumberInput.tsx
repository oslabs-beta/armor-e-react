import React from 'react';

interface PhoneNumberInputProps {
  phoneNumber: string;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ phoneNumber, onPhoneNumberChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="phone number">Phone Number:</label>
      <input
        type="text"
        id="Phone number"
        value={phoneNumber}
        onChange={onPhoneNumberChange}
        required
      />
    </div>
  );
};

export default PhoneNumberInput;