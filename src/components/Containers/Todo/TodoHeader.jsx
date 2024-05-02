// TodoHeader.js
import React from 'react';
import Text from '../../UIElements/Text';

const TodoHeader = ({ title, description }) => {
  return (
    <div>
     <h4><Text>{title}</Text></h4>
      <Text>{description}</Text>
    </div>
  );
};

export default TodoHeader;
