import React from 'react';
import ChecklistItem from './ChecklistItem';
import { fieldValues, ValidationChecklist } from '../../types';

const ChecklistContainer: React.FC<{
  checklist: ValidationChecklist,
  fieldValues: fieldValues,
}> = ({ checklist, fieldValues }) => {

  const confirmPasswordRegex = ((): RegExp => {
    const passwordEscapeSpecialCharacters: string =
      fieldValues.password.replaceAll(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/]/g, (unescaped) => `\\${unescaped}`);
    const regex: RegExp = new RegExp(`(${passwordEscapeSpecialCharacters})`);
    return regex;
  })();

  return (
    <ul id="validationChecklist">
      {
        checklist.map((item, index) => {
          const fieldType = item.field;
          console.log({confirmPasswordRegex})
          return (
            <
              ChecklistItem
              condition={item.condition}
              field={item.field}
              min={item.min}
              max={item.max}
              regex={item.field === 'confirmPassword' ? confirmPasswordRegex : item.regex}
              value={fieldValues[fieldType]}
            />)
        })
      }
    </ul>
  )
}

export default ChecklistContainer;