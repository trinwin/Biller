import React, { useState } from 'react';
import { Button } from 'antd';
import ModalForm from './ModalForm';
import './SetupForm.css';

const SetupFormInstance = ({ btnName }) => {
  const [visible, setVisible] = useState(false);
  const [finished, setFinished] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
    setFinished(true);
  };

  return (
    <span>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '55%', flex: 1 }}
        shape="round"
        block
      >
        {btnName}
      </Button>
      <ModalForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </span>
  );
};

export default SetupFormInstance;
