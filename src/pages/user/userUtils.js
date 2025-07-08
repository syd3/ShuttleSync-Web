// Receives state and setState functions as needed

// Utility functions for User page
// Receives state and setState functions as needed
import { uploadToCloudinary } from '../../api/cloudinary';
// fix undefined fields in user object
const cleanUser = (user) => {
  const cleaned = {
    username: user.username || '',
    given_name: user.given_name || '',
    middle_initial: user.middle_initial || '',
    last_name: user.last_name || '',
    phone: user.phone || '',
    email: user.email || '',
    user_photo: user.user_photo || '', // Keep this as-is and don't delete
  };
  Object.keys(cleaned).forEach(key => {
    if (typeof cleaned[key] === 'undefined') delete cleaned[key];
  });
  return cleaned;
};

// fix undefined fields in driver object
const cleanDriver = (driver) => {
  const cleaned = {
    username: driver.username || '',
    given_name: driver.given_name || '',
    middle_initial: driver.middle_initial || '',
    last_name: driver.last_name || '',
    phone: driver.phone || '',
    email: driver.email || '',
    plate: driver.plate || '',
    user_photo: typeof driver.userPhoto === 'string' ? driver.userPhoto : (driver.userPhoto ? String(driver.userPhoto) : ''),
    vehiclePhoto: typeof driver.vehiclePhoto === 'string' ? driver.vehiclePhoto : (driver.vehiclePhoto ? String(driver.vehiclePhoto) : ''),
  };
  Object.keys(cleaned).forEach(key => {
    if (typeof cleaned[key] === 'undefined') delete cleaned[key];
  });
  return cleaned;
};

export const handleAddUser = async ({
  addType, newUser, setErrorMsg, setUsers, setDrivers, setShowAddModal, setNewUser, setAddType, addUser, addDriver, fetchUsers, fetchDrivers
}) => {
  setErrorMsg('');
  try {
    let userToSend = { ...newUser };
    // Handle userPhoto upload if it's a File
    if (userToSend.userPhoto instanceof File) {
      userToSend.user_photo = await uploadToCloudinary(userToSend.userPhoto);
    } else if (typeof userToSend.userPhoto === 'string') {
      userToSend.user_photo = userToSend.userPhoto;
    }
    delete userToSend.userPhoto;
    if (addType === 'regular') {
      await addUser(cleanUser(userToSend));
      setUsers(await fetchUsers());
    } else {
      await addDriver(cleanDriver(userToSend));
      setDrivers(await fetchDrivers());
    }
    setShowAddModal(false);
    setNewUser({ username: '', given_name: '', middle_initial: '', last_name: '', phone: '', email: '', plate: '', vehiclePhoto: '', userPhoto: '', type: 'regular' });
    setAddType('regular');
  } catch (err) {
    setErrorMsg(err.message);
  }
};

export const handleEditUser = async ({
  editData, setErrorMsg, setUsers, setDrivers, setShowEditModal, setEditData, editUser, editDriver, fetchUsers, fetchDrivers
}) => {
  setErrorMsg('');
  try {
    let userToSend = { ...editData };
    // Handle userPhoto upload if it's a File
    if (userToSend.userPhoto instanceof File) {
      userToSend.user_photo = await uploadToCloudinary(userToSend.userPhoto);
    } else if (typeof userToSend.userPhoto === 'string') {
      userToSend.user_photo = userToSend.userPhoto;
    }
    delete userToSend.userPhoto;
    if (userToSend.type === 'regular') {
      await editUser(userToSend.id, cleanUser(userToSend));
      setUsers(await fetchUsers());
    } else {
      await editDriver(userToSend.id, cleanDriver(userToSend));
      setDrivers(await fetchDrivers());
    }
    setShowEditModal(false);
    setEditData(null);
  } catch (err) {
    setErrorMsg(err.message);
  }
};

export const handleDelete = async ({
  id, type, setErrorMsg, setUsers, setDrivers, setShowMenu, deleteUser, deleteDriver, fetchUsers, fetchDrivers
}) => {
  setErrorMsg('');
  try {
    if (type === 'regular') {
      await deleteUser(id);
      setUsers(await fetchUsers());
    } else {
      await deleteDriver(id);
      setDrivers(await fetchDrivers());
    }
    setShowMenu({ id: null, type: null });
  } catch (err) {
    setErrorMsg(err.message);
  }
};

export const handleUserPhotoChange = (e, isEdit, editData, setEditData, newUser, setNewUser, setUserPhotoPreview) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    if (isEdit) {
      setEditData({ ...editData, userPhoto: file });
      setUserPhotoPreview(url);
    } else {
      setNewUser({ ...newUser, userPhoto: file });
      setUserPhotoPreview(url);
    }
  }
};

export const handleVehiclePhotoChange = (e, isEdit, editData, setEditData, newUser, setNewUser, setVehiclePhotoPreview) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    if (isEdit) {
      setEditData({ ...editData, vehiclePhoto: file });
      setVehiclePhotoPreview(url);
    } else {
      setNewUser({ ...newUser, vehiclePhoto: file });
      setVehiclePhotoPreview(url);
    }
  }
};
