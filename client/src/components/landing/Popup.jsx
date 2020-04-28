import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const Popup = props => {
    const info = () =>{
        Modal.info({
            'title': props.text,
            'content': props.content,
            onOk() {},
            width: '100vh',
            centered: true
        });
    }

    return (
        <Button type="link" onClick={info}>
            {props.text}
        </Button>
    );
}

export default Popup;