import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../Sidebar';
import './User.css';
import {
  fetchUsers,
  fetchDrivers,
  addUser,
  editUser,
  deleteUser,
  addDriver,
  editDriver,
  deleteDriver
} from '../../api/users';
import { getToken } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import UserModal from './userModal';
import {
  handleAddUser,
  handleEditUser,
  handleDelete,
  handleUserPhotoChange,
  handleVehiclePhotoChange
} from './userUtils';

function User() {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('regular');
  const [showMenu, setShowMenu] = useState({ id: null, type: null });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [userPhotoPreview, setUserPhotoPreview] = useState('');
  const [vehiclePhotoPreview, setVehiclePhotoPreview] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    given_name: '',
    middle_initial: '',
    last_name: '',
    phone: '',
    email: '',
    plate: '',
    vehiclePhoto: '',
    userPhoto: '',
    type: 'regular',
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUsers().then(setUsers).catch(() => setUsers([]));
    fetchDrivers().then(setDrivers).catch(() => setDrivers([]));
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu({ id: null, type: null });
      }
    }
    if (showMenu.id !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  // Helper to reset newUser and previews
  const resetNewUser = () => {
    setNewUser({
      username: '',
      given_name: '',
      middle_initial: '',
      last_name: '',
      phone: '',
      email: '',
      plate: '',
      vehiclePhoto: '',
      userPhoto: '',
      type: 'regular',
    });
    setUserPhotoPreview('');
    setVehiclePhotoPreview('');
    setErrorMsg('');
  };

  // Modal close handler
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditData(null);
    resetNewUser();
  };

  // Validation for Add/Edit
  const validateUser = (user, isDriver = false) => {
    if (!user.username || !user.given_name || !user.last_name || !user.email) {
      return 'Username, Given Name, Last Name, and Email are required.';
    }
    if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      return 'Invalid email format.';
    }
    if (isDriver && !user.plate) {
      return 'Plate Number is required for drivers.';
    }
    return '';
  };

  // Handler wrappers for modular utils with validation
  const onAddUser = () => {
    const isDriver = addType === 'driver';
    const err = validateUser(newUser, isDriver);
    if (err) { setErrorMsg(err); return; }
    handleAddUser({
      addType, newUser, setErrorMsg, setUsers, setDrivers, setShowAddModal, setNewUser, setAddType, addUser, addDriver, fetchUsers, fetchDrivers
    });
    resetNewUser();
  };
  const onEditUser = () => {
    const isDriver = editData?.type === 'driver';
    const err = validateUser(editData, isDriver);
    if (err) { setErrorMsg(err); return; }
    handleEditUser({
      editData, setErrorMsg, setUsers, setDrivers, setShowEditModal, setEditData, editUser, editDriver, fetchUsers, fetchDrivers
    });
  };
  const onDelete = (id, type) => handleDelete({
    id, type, setErrorMsg, setUsers, setDrivers, setShowMenu, deleteUser, deleteDriver, fetchUsers, fetchDrivers
  });
  const onUserPhotoChange = (e, isEdit = false) => handleUserPhotoChange(e, isEdit, editData, setEditData, newUser, setNewUser, setUserPhotoPreview);
  const onVehiclePhotoChange = (e, isEdit = false) => handleVehiclePhotoChange(e, isEdit, editData, setEditData, newUser, setNewUser, setVehiclePhotoPreview);

  return (
    <>
      <Sidebar className={showAddModal || showEditModal ? 'sidebar-disabled' : ''} />
      <div className="user-mgmt-page" style={{ marginLeft: 240 }}>
        {/* Regular Users Table */}
        <section className="user-section">
          <div className="user-table-header">
            <h2>User Table</h2>
            <button className="add-user-btn" onClick={() => { resetNewUser(); setShowAddModal(true); setAddType('regular'); }}>
              <span className="add-icon">+</span> Add User
            </button>
          </div>
          <div className="table-scroll">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User Photo</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Phone number</th>
                  <th>Email</th>
                  <th>Date Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.userPhoto ? <img src={u.userPhoto} alt="user" className="user-photo" /> : null}</td>
                    <td>{u.name}</td>
                    <td>{[u.given_name, u.middle_initial, u.last_name].filter(Boolean).join(' ')}</td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                    <td>{u.date}</td>
                    <td className="actions-cell">
                      <button
                        className="dots-btn"
                        onClick={() => setShowMenu(showMenu.id === u.id && showMenu.type === 'regular' ? { id: null, type: null } : { id: u.id, type: 'regular' })}
                      >&#8942;</button>
                      {showMenu.id === u.id && showMenu.type === 'regular' && (
                        <div className="action-menu" ref={menuRef}>
                          <button onClick={() => { setEditData({ ...u, username: u.name, type: 'regular' }); setShowEditModal(true); setShowMenu({ id: null, type: null }); }}>Edit</button>
                          <button className="delete-btn" onClick={() => onDelete(u.id, 'regular')}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <hr className="table-separator" />
        {/* Drivers Table */}
        <section className="user-section">
          <div className="user-table-header">
            <h2>User(driver) Table</h2>
            <button className="add-user-btn" onClick={() => { resetNewUser(); setShowAddModal(true); setAddType('driver'); }}>
              <span className="add-icon">+</span> Add User
            </button>
          </div>
          <div className="table-scroll">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User Photo</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Plate Number</th>
                  <th>Date Created</th>
                  <th>Vehicle photo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {drivers.map(d => (
                  <tr key={d.id}>
                    <td>{d.userPhoto ? <img src={d.userPhoto} alt="user" className="user-photo" /> : null}</td>
                    <td>{d.name}</td>
                    <td>{[d.given_name, d.middle_initial, d.last_name].filter(Boolean).join(' ')}</td>
                    <td>{d.phone}</td>
                    <td>{d.email}</td>
                    <td>{d.plate}</td>
                    <td>{d.date}</td>
                    <td>
                      {d.vehiclePhoto ? <img src={d.vehiclePhoto} alt="vehicle" className="vehicle-photo" /> : null}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="dots-btn"
                        onClick={() => setShowMenu(showMenu.id === d.id && showMenu.type === 'driver' ? { id: null, type: null } : { id: d.id, type: 'driver' })}
                      >&#8942;</button>
                      {showMenu.id === d.id && showMenu.type === 'driver' && (
                        <div className="action-menu" ref={menuRef}>
                          <button onClick={() => { setEditData({ ...d, username: d.name, type: 'driver' }); setShowEditModal(true); setShowMenu({ id: null, type: null }); }}>Edit</button>
                          <button className="delete-btn" onClick={() => onDelete(d.id, 'driver')}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add/Edit Modal */}
        {(showAddModal || showEditModal) && (
          <UserModal
            showAddModal={showAddModal}
            showEditModal={showEditModal}
            addType={addType}
            editData={editData}
            newUser={newUser}
            setNewUser={setNewUser}
            setEditData={setEditData}
            errorMsg={errorMsg}
            handleAddUser={onAddUser}
            handleEditUser={onEditUser}
            setShowAddModal={setShowAddModal}
            setShowEditModal={setShowEditModal}
            userPhotoPreview={userPhotoPreview}
            vehiclePhotoPreview={vehiclePhotoPreview}
            handleUserPhotoChange={onUserPhotoChange}
            handleVehiclePhotoChange={onVehiclePhotoChange}
            closeModals={closeModals}
          />
        )}
      </div>
    </>
  );
}

export default User;