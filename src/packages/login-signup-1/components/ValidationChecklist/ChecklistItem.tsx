import React, { useState } from 'react';
import { ChecklistItem, ValidationChecklist } from '../../types';

const ChecklistItem: React.FC<ChecklistItem> = ({ condition, value, min, max, regex }) => {

  // invalidate checklist item
  const isFulfilled = (() => {
    if (regex && !regex.test(value)) return false;
    if (max && value.length > max) return false;
    if (min && value.length < min) return false;
    return true;
  })()

  return (
    <li
      id="validationChecklist"
      style={{color: isFulfilled ? 'green' : 'red'}}
    >
      {condition}
    </li>
  )
}

export default ChecklistItem;