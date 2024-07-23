import React from 'react';
import { ValidationChecklist } from '../../types';

const ValidationChecklistContainer: React.FC<{checklist: ValidationChecklist}> = ({checklist}) => {
  const { username, password, confirmPassword, phoneNumber, email} = checklist;
  // console.log(Object.values(checklist));
  // [[a], [b, c], [d, e]]
  //

  return (
    <div id="validationChecklist">
      
    </div>
  )
}

export default ValidationChecklistContainer;