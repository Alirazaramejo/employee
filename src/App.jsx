import './App.css';
import { Button } from 'antd';
import ModalComponent from './Components/Modal/Modal';
import { useState } from 'react';
import AllEmployeesPage from './Components/Pages/AllEmployeesPage/AllEmployeesPage';

function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <div className='px-3 py-3'>
      <Button type="primary" onClick={handleShow}>
        Add Employee
      </Button>
      {show && <ModalComponent show={show} setShow={setShow} />}

      <AllEmployeesPage />
    </div>
  );
}

export default App;
