import React, { useState } from 'react';
import { Form, Button, Select, DatePicker, Radio } from 'antd';

const RangeDatePicker = () => {
    const { Option } = Select;
    const [dateType, setDateType] = useState("none");
    const [dateFormat, setDateFormat] = useState("none");
    const [isDone, setIsDone] = useState(false);

    const onFormatChange = values => {
        console.log(values.target.value);
        setDateType(values.target.value);
        setIsDone(false);
    }
    
    const onDateChange = (date, dateString) => {
        console.log(dateString);
        setDateFormat(dateString);
        setIsDone(true);
    }

    const onWeeklyChange = (values) => {
        setDateFormat(values);
        setIsDone(true);
    }

    const onFinish = values => {
        console.log(values)
    };

    return (
        <Form onFinish = {onFinish} layout="inline">
            <p>This expense is due...</p>
            <Form.Item name="format">
                <Radio.Group onChange={onFormatChange}>
                    <Radio.Button value="Yearly">Yearly</Radio.Button>
                    <Radio.Button value="Monthly">Monthly</Radio.Button>
                    <Radio.Button value="Weekly">Weekly</Radio.Button>
                </Radio.Group>
            </Form.Item>

            {{
                Yearly: (
                    <Form.Item name="date">
                        <DatePicker
                            style={{ width: 100 }}
                            format="MM-DD"
                            onChange = {onDateChange}
                        />
                    </Form.Item>
                ),

                Monthly: (
                    <Form.Item name="date">
                        <DatePicker
                            style={{ width: 100 }}
                            format="DD"
                            onChange = {onDateChange}
                        />
                    </Form.Item>
                ),

                Weekly: (
                    <Form.Item name="day">
                        <Select style={{ width: 100 }} onChange={onWeeklyChange}>
                            <Option value="mon">Monday</Option>
                            <Option value="tue">Tuesday</Option>
                            <Option value="wed">Wednesday</Option>
                            <Option value="thu">Thursday</Option>
                            <Option value="fri">Friday</Option>
                            <Option value="sat">Saturday</Option>
                            <Option value="sun">Sunday</Option>
                        </Select>
                    </Form.Item>
                )
            }[dateType]}

            <Button 
                type="primary"
                htmlType="submit"
            > 
                submit 
            </Button>
            {isDone ? <p> This updates {dateType} on {dateFormat} </p>  : null }
            
        </Form>
    );
};

export default RangeDatePicker;