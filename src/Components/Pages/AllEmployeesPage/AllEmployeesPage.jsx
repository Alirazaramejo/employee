import React, { useContext, useEffect, useState } from 'react'
import { getAllEmployees } from '../../../Services/Employee.services';
import LoaderContext from '../../../Context/Loader.context';
import LoaderComponent from '../../LoaderComponent/LoaderComponent';
import AllEmployeesTable from '../../AllEmployeesTable/AllEmployeesTable';

export default function AllEmployeesPage() {
    const [employees, setEmployees] = useState(null);
    const { loader, setLoader } = useContext(LoaderContext)

    useEffect(() => {
        setLoader(true)
        const unsubscribe = getAllEmployees((employeesList) => {
            setEmployees(employeesList);
            setLoader(false)
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className='mt-4'>
            <h1>All Employees</h1>

            {
                loader ? <LoaderComponent /> : <AllEmployeesTable employees={employees} />
            }
        </div>
    )
}