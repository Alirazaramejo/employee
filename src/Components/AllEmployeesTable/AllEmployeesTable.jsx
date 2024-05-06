import React, { memo, useState } from 'react';
import { Button, Table, Image, Space, message } from 'antd'; // Import Ant Design components
import SuborderModal from '../SuborderModal/SuborderModal';
import './styles.css'; // Import CSS file
import { deleteEmployee } from '../../Services/Employee.services';

function AllEmployeesTable({ employees }) {
    const [show, setShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const openEmployeeDetailsModal = (id) => {
        setSelectedEmployee(id);
        setShow(true);
    }

    const deleteEmployeeHandler = async (id) => {
        try {
            await deleteEmployee(id);
            message.success('Employee deleted successfully');
            // You might want to refresh the employee list here if needed
        } catch (error) {
            message.error('Failed to delete employee');
            console.error('Delete employee error:', error);
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl', 
            render: (text, record) => (
                <Image src={text} alt={record.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> // Use record.name as alt text
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => openEmployeeDetailsModal(record.id)}>
                        View Details
                    </Button>
                
                    <Button danger onClick={() => deleteEmployeeHandler(record.id)}>Delete</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Table dataSource={employees} columns={columns} bordered={true} pagination={false} />
            {show && <SuborderModal show={show} setShow={setShow} selectedEmployee={selectedEmployee} />}
        </div>
    );
}

export default memo(AllEmployeesTable);
