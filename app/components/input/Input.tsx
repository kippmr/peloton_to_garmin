import React from 'react';

export type InputProps = {
  label: string;
  placeholder: string;
  type: string;
  onChange: (text: string) => void;
};

export const Input: React.FunctionComponent<InputProps> = ({
  label,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <div className={'mb-3'}>
      <label className={'form-label'} htmlFor="input">
        {label}
      </label>
      <input
        id={'input'}
        required
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={'form-control'}
      />
    </div>
  );
};
