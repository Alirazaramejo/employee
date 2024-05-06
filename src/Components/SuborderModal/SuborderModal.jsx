import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tree from 'react-d3-tree';
import "./SuborderModal.css";
import { getEmployeeData } from '../../Services/Employee.services';

function SuborderModal({ show, setShow, selectedEmployee }) {
    const handleClose = () => setShow(false);
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            setLoading(true);
            try {
                const data = await getEmployeeData(selectedEmployee);
                setEmployeeData(data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedEmployee) {
            fetchEmployeeData();
        }
    }, [selectedEmployee]);

    let orgChart = null;

    if (employeeData && employeeData.supervisorData) {
        orgChart = {
            name: employeeData.supervisorData.name,
            attributes: {
                Position: employeeData.supervisorData.position
            },
            children: [
                {
                    name: employeeData.name,
                    attributes: {
                        Position: employeeData.position,
                    },
                    children: employeeData.subordinates?.map((employee) => ({
                        name: employee.name,
                        attributes: {
                            Position: employee.position
                        }
                    })) || [] // Ensure children is not null
                }
            ]
        };
    } else {
        orgChart = {}; // Set an empty object if orgChart is null
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Suborders</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "79vh" }}>
                {loading ? <h2>Loading...</h2> : (
                    employeeData ? (
                        <Tree data={orgChart} orientation='vertical' />
                    ) : (
                        <p>No employee data available.</p>
                    )
                )}
            </Modal.Body>
        </Modal>
    );
}

export default SuborderModal;
