import React, { useContext, useEffect, useState, useMemo } from "react";
import { Button, Form, Modal, Select } from "antd";
import { addEmployee, getAllEmployees } from "../../Services/Employee.services";
import LoaderContext from "../../Context/Loader.context";
import "./FormComponent.css"; // Import CSS file

const { Option } = Select;

function FormComponent({ handleClose, setShow }) {
  const [employees, setEmployees] = useState(null);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const { setLoader } = useContext(LoaderContext);

  useEffect(() => {
    const unsubscribe = getAllEmployees((employeesList) => {
      setEmployees(employeesList);
      console.log(employeesList);
      setLoadingEmployees(false);
    });
    return () => unsubscribe();
  }, []);

  const memoizedEmployees = useMemo(() => employees || [], [employees]);

  const filteredEmployees = memoizedEmployees.filter(
    (employee) => employee.role
  );

  const onFinish = async(data) => {
    setShow(false);
    setLoader(true);
    await addEmployee(data);
    setLoader(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-container modal-wrapper">
      {/* Apply CSS classes to the container */}
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <input className="ant-input" placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <input className="ant-input" type="email" placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: "Please enter your position" }]}
        >
          <input className="ant-input" placeholder="Enter position" />
        </Form.Item>
        <Form.Item
          label="Select your reporting supervisor"
          name="supervisorId"
          rules={[
            {
              required: true,
              message: "Please select your reporting supervisor",
            },
          ]}
        >
          <Select placeholder="Select your reporting supervisor">
            <Option disabled value="">
              Select your reporting supervisor
            </Option>
            {loadingEmployees ? (
              <Option>Loading...</Option>
            ) : (
              filteredEmployees.map((employee) => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name} / {employee.position}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 6, span: 18 }}
          className="button-wrapper"
        >
          {/* Apply CSS class to the button wrapper */}
          <Button onClick={handleClose}>Close</Button>
          <Button type="primary" htmlType="submit">
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormComponent;
