// Utility functions for User page
// Receives state and setState functions as needed

export const handleAddUser = async ({
  addType, newUser, setErrorMsg, setUsers, setDrivers, setShowAddModal, setNewUser, setAddType, addUser, addDriver, fetchUsers, fetchDrivers
}) => {
  setErrorMsg('');
  try {
    if (addType === 'regular') {
      await addUser({
        username: newUser.username,
        given_name: newUser.given_name,
        middle_initial: newUser.middle_initial,
        last_name: newUser.last_name,
        phone: newUser.phone,
        email: newUser.email,
        userPhoto: typeof newUser.userPhoto === 'string' ? newUser.userPhoto : '',
      });
      setUsers(await fetchUsers());
    } else {
      await addDriver({
        username: newUser.username,
        given_name: newUser.given_name,
        middle_initial: newUser.middle_initial,
        last_name: newUser.last_name,
        phone: newUser.phone,
        email: newUser.email,
        plate: newUser.plate,
        userPhoto: typeof newUser.userPhoto === 'string' ? newUser.userPhoto : '',
        vehiclePhoto: typeof newUser.vehiclePhoto === 'string' ? newUser.vehiclePhoto : '',
      });
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
    if (editData.type === 'regular') {
      await editUser(editData.id, {
        username: editData.username,
        given_name: editData.given_name,
        middle_initial: editData.middle_initial,
        last_name: editData.last_name,
        phone: editData.phone,
        email: editData.email,
        userPhoto: typeof editData.userPhoto === 'string' ? editData.userPhoto : '',
      });
      setUsers(await fetchUsers());
    } else {
      await editDriver(editData.id, {
        username: editData.username,
        given_name: editData.given_name,
        middle_initial: editData.middle_initial,
        last_name: editData.last_name,
        phone: editData.phone,
        email: editData.email,
        plate: editData.plate,
        userPhoto: typeof editData.userPhoto === 'string' ? editData.userPhoto : '',
        vehiclePhoto: typeof editData.vehiclePhoto === 'string' ? editData.vehiclePhoto : '',
      });
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
