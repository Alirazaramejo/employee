import { Modal } from 'antd'; // Import Ant Design Modal component
import FormComponent from '../Form/Form';

const ModalComponent = ({ show, setShow }) => {
    const handleClose = () => setShow(false);

    return (
        <Modal
            visible={show}
            onCancel={handleClose}
            title="Add Employee"
            footer={null}
        >
            <FormComponent handleClose={handleClose} setShow={setShow}/>
        </Modal>
    );
}

export default ModalComponent;
