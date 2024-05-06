import { employeesEntity } from "../lib/employeesEntity";
import { realtimeDb,imageDb } from "../Configurations/FirebaseConfigurations/Firebase.config";
import { ref, onValue, push, set, get, child, update, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';


export const addAllEmployees = async (data) => {
    console.log(data); 
    try {
        const imageFile = data.upload[0].originFileObj; 
        const storageImageRef = storageRef(imageDb, `employeeImages/${imageFile.name}`);
        await uploadBytes(storageImageRef, imageFile);
        const downloadUrl = await getDownloadURL(storageImageRef);
        const productKey = push(ref(realtimeDb, 'employees')).key;
        const productRef = ref(realtimeDb, `employees/${productKey}`);
        await set(productRef, {
            id: productKey,
            imageUrl: downloadUrl,
            ...data
        });
        console.log('Product added successfully!');
        return { success: true, productId: productKey };
    } catch (error) {
        console.error('Error adding product:', error);
        console.warn('Failed to add product.');
        return { success: false, error };
    }
};

export const getAllEmployees = (callback) => {
    try {
        const employeesRef = ref(realtimeDb, employeesEntity);
        const unsubscribe = onValue(employeesRef, (snapshot) => {
            const employeesList = [];
            snapshot.forEach((childSnapshot) => {
                employeesList.push({ ...childSnapshot.val(), id: childSnapshot.key });
            });
            callback(employeesList);
        }, (error) => {
            console.error("Error fetching employees:", error);
            callback(null, error);
        });
        return unsubscribe;
    } catch (error) {
        console.error("Error fetching employees:", error);
        callback(null, error);
    }
}
export const getAllEmployeesData = (callback) => {
    try {
        const employeesRef = ref(realtimeDb, "employee");
        const unsubscribe = onValue(employeesRef, (snapshot) => {
            const employeesList = [];
            snapshot.forEach((childSnapshot) => {
                employeesList.push({ ...childSnapshot.val(), id: childSnapshot.key });
            });
            callback(employeesList);
        }, (error) => {
            console.error("Error fetching employees:", error);
            callback(null, error);
        });
        return unsubscribe;
    } catch (error) {
        console.error("Error fetching employees:", error);
        callback(null, error);
    }
}

export const addEmployee = async (data) => {
    const employeesRef = ref(realtimeDb, employeesEntity);
    try {
        const newEmployeeRef = await push(employeesRef, {
            ...data,
            subordinates: []
        });
        if (data.supervisorId) {
            const supervisorRef = child(employeesRef, `${data.supervisorId}/subordinates`);
            await update(supervisorRef, { [newEmployeeRef.key]: true });
        }
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
}

export const getEmployeeData = async (employeeId) => {
    const employeeRef = ref(realtimeDb, `${employeesEntity}/${employeeId}`);
    try {
        const snapshot = await get(employeeRef);
        if (snapshot.exists()) {
            const employeeData = snapshot.val();
            if (employeeData.supervisorId) {
                const supervisorRef = ref(realtimeDb, `${employeesEntity}/${employeeData.supervisorId}`);
                const supervisorSnapshot = await get(supervisorRef);
                if (supervisorSnapshot.exists()) {
                    return { ...employeeData, supervisorData: supervisorSnapshot.val() };
                }
            } else {
                return employeeData;
            }
        } else {
            throw new Error("Employee data not found");
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        throw error;
    }
}






export const deleteEmployee = async(id) => {
    const dbRef = ref(realtimeDb);
    const EmployeeRef = child(dbRef, `${employeesEntity}/${id}`);
    const snapshot = await get(EmployeeRef);
    
    if (snapshot.exists()) {
        await remove(EmployeeRef);
        console.log(`Blog with ID ${id} deleted successfully.`);
    } else {
        console.log(`Blog with ID ${id} does not exist.`);
    }
}