import React from 'react';
import styles from './CreateNewExperience.module.scss';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { FaMinus } from 'react-icons/fa';

interface Props {
  // on finish prop to pass up to parent
  form: any;
  inputValues?: any;
  // pass the on submit handler to the parent
  onSubmitHandler: (values) => void;
}
const CreateNewExperience = (props: Props) => {
  const [inputValues, setInputValues] = React.useState(['']); // Initial input value

  // Function to handle adding a new input field
  const handleAddInput = () => {
    setInputValues([...inputValues, '']);
  };

  // Function to handle changing input values
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const removeInput = (index) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  };

  return (
    <Form
      className={styles.container}
      form={props.form}
      onFinish={() => {
        props.onSubmitHandler({
          ...props.form.getFieldsValue(),
          jobDescription: [...inputValues],
        });
      }}
      initialValues={{
        isHidden: false,
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input a name!' }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        label="Job Title"
        name="jobTitle"
        rules={[{ required: true, message: 'Please input a job title!' }]}
      >
        <Input className={styles.input} />
      </Form.Item>
      <Form.Item
        label="Start Date"
        name="startDate"
        rules={[{ required: true, message: 'Please input a start date!' }]}
      >
        <DatePicker
          placeholder="Start Date"
          className={styles.input}
          name="startDate"
          // allow the user to type in the date
          format={'MM/DD/YYYY'}
        />
      </Form.Item>
      <Form.Item label="End Date" name="endDate">
        <DatePicker
          placeholder="End Date"
          className={styles.input}
          name="endDate"
          // allow the user to type in the date
          format={'MM/DD/YYYY'}
        />
      </Form.Item>
      {/* should display, is a slider button that will let frontend know not to publicly */}
      {/* display this experience */}
      <Form.Item label="Is Hidden" name="isHidden">
        <Select className={styles.input}>
          <Select.Option value={true}>Yes</Select.Option>
          <Select.Option value={false}>No</Select.Option>
        </Select>
      </Form.Item>
      {/* <Form.Item label="Job Description" name="jobDescription"> */}
      {inputValues.map((value, index) => (
        <>
          <Form.Item key={index} className={styles.inputContainer}>
            <Input
              placeholder="Enter a string"
              value={value}
              className={styles.input}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <Button
              type="dashed"
              onClick={() => removeInput(index)}
              className={styles.removeButton}
            >
              <FaMinus />
            </Button>
          </Form.Item>
        </>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={handleAddInput} block>
          + Add Input
        </Button>
      </Form.Item>
      {/* </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewExperience;
