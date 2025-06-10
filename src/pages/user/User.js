import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../Sidebar';
import './User.css';

// dummy data xd. Will replace to API calls.
const initialUsers = [
  { id: 1, name: 'Juan Tamad', userPhoto: 'https://i.imgflip.com/7fx6ag.png', phone: '+123456', email: '123@gmail.com', date: '1/2/2025', type: 'regular' },
  { id: 2, name: 'Pridyider', userPhoto: 'https://i.imgflip.com/7fx6ag.png', phone: '+123478', email: '4314k@gmail.com', date: '1/2/2025', type: 'regular' },
  { id: 3, name: 'MAry grace piattos', userPhoto: 'https://i.imgflip.com/7fx6ag.png', phone: '+234234', email: 'iot@rocketmail.com', date: '1/2/2025', type: 'regular' },
  { id: 4, name: 'Ching chong', userPhoto: 'https://i.imgflip.com/7fx6ag.png', phone: '+8786586', email: 'mi12213@yahoo.com', date: '1/2/2025', type: 'regular' },
  { id: 5, name: 'Balbas sarado', userPhoto: 'https://i.imgflip.com/7fx6ag.png', phone: '+56785685', email: '8908@gmail.com', date: '1/2/2025', type: 'regular' },
  { id: 6, name: 'Nujabes', userPhoto: 'https://i.imgflip.com/7fx6ag.png', phone: '+565756567', email: 'Lsd@gmail.com', date: '1/2/2025', type: 'regular' },
];

const initialDrivers = [
  { id: 101, name: 'Bong Revilla', userPhoto:'https://i.imgflip.com/9fi9je.png?a485184', phone: '+79000010101', email: 'asdasd@gmail.com', plate: '123133', date: '1/2/2025', vehiclePhoto: 'https://static.wikia.nocookie.net/c88308f3-e20e-41ca-a94a-e715b56e2b6b', type: 'driver' },
  { id: 102, name: 'Balbas S. Sarado', userPhoto:'https://i.imgflip.com/9fi9je.png?a485184', phone: '+7900001101', email: 'asd2@gmail.com', plate: '123456', date: '1/2/2025', vehiclePhoto: 'https://static.wikia.nocookie.net/c88308f3-e20e-41ca-a94a-e715b56e2b6b', type: 'driver' },
];

function User() {
  const [users, setUsers] = useState(initialUsers);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('regular');
  const [showMenu, setShowMenu] = useState({ id: null, type: null });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const menuRef = useRef(null);

  //action menu disable if clicked outside
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
  //user state
  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    email: '',
    plate: '',
    vehiclePhoto: '',
    userPhoto: '',
    type: 'regular',
  });

  //add user
  const handleAddUser = () => {
    if (addType === 'regular') {
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: newUser.name,
          phone: newUser.phone,
          email: newUser.email,
          userPhoto: newUser.userPhoto,
          date: new Date().toLocaleDateString(),
          type: 'regular',
        },
      ]);
    } else {
      setDrivers([
        ...drivers,
        {
          id: Date.now(),
          name: newUser.name,
          phone: newUser.phone,
          email: newUser.email,
          plate: newUser.plate,
          vehiclePhoto: newUser.vehiclePhoto,
          userPhoto: newUser.userPhoto,
          date: new Date().toLocaleDateString(),
          type: 'driver',
        },
      ]);
    }
    setShowAddModal(false);
    setNewUser({ name: '', phone: '', email: '', plate: '', vehiclePhoto: '', userPhoto: '', type: 'regular' });
    setAddType('regular');
  };

  //edit user
  const handleEditUser = () => {
    if (editData.type === 'regular') {
      setUsers(users.map(u => u.id === editData.id ? editData : u));
    } else {
      setDrivers(drivers.map(d => d.id === editData.id ? editData : d));
    }
    setShowEditModal(false);
    setEditData(null);
  };

  //delete . In action-menu modal
  const handleDelete = (id, type) => {
    if (type === 'regular') setUsers(users.filter(u => u.id !== id));
    else setDrivers(drivers.filter(d => d.id !== id));
    setShowMenu({ id: null, type: null });
  };

  return (
    <>
      <Sidebar className={showAddModal || showEditModal ? 'sidebar-disabled' : ''} />
      <div className="user-mgmt-page" style={{ marginLeft: 240 }}>
        {/* Regular Users Table */}
        <section className="user-section">
          <div className="user-table-header">
            <h2>User Table</h2>
            <button className="add-user-btn" onClick={() => { setShowAddModal(true); setAddType('regular'); }}>
              <span className="add-icon">+</span> Add User
            </button>
          </div>
          <div className="table-scroll">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User Photo</th>
                  <th>User</th>
                  <th>Phone number</th>
                  <th>Email</th>
                  <th>Date Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><img src={u.userPhoto} alt="user" className="user-photo" /></td>
                    <td>{u.name}</td>
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
                          <button onClick={() => { setEditData(u); setShowEditModal(true); setShowMenu({ id: null, type: null }); }}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(u.id, 'regular')}>Delete</button>
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
            <button className="add-user-btn" onClick={() => { setShowAddModal(true); setAddType('driver'); }}>
              <span className="add-icon">+</span> Add User
            </button>
          </div>
          <div className="table-scroll">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User Photo</th>
                  <th>User</th>
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
                    <td><img src={d.userPhoto} alt="user" className="user-photo" /></td>
                    <td>{d.name}</td>
                    <td>{d.phone}</td>
                    <td>{d.email}</td>
                    <td>{d.plate}</td>
                    <td>{d.date}</td>
                    <td>
                      <img src={d.vehiclePhoto} alt="vehicle" className="vehicle-photo" />
                    </td>
                    <td className="actions-cell">
                      <button
                        className="dots-btn"
                        onClick={() => setShowMenu(showMenu.id === d.id && showMenu.type === 'driver' ? { id: null, type: null } : { id: d.id, type: 'driver' })}
                      >&#8942;</button>
                      {showMenu.id === d.id && showMenu.type === 'driver' && (
                        <div className="action-menu" ref={menuRef}>
                          <button onClick={() => { setEditData(d); setShowEditModal(true); setShowMenu({ id: null, type: null }); }}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(d.id, 'driver')}>Delete</button>
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
          <div className="modal-overlay" onClick={() => { setShowAddModal(false); setShowEditModal(false); setEditData(null); }}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>{showAddModal ? `Add ${addType === 'regular' ? 'User' : 'Driver'}` : `Edit ${editData?.type === 'regular' ? 'User' : 'Driver'}`}</h2>
              <label>URL muna</label>
              <input
                type="text"
                placeholder="User Photo URL"
                value={showAddModal ? newUser.userPhoto : editData?.userPhoto || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, userPhoto: e.target.value })
                  : setEditData({ ...editData, userPhoto: e.target.value })}
              />
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={showAddModal ? newUser.name : editData?.name || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, name: e.target.value })
                  : setEditData({ ...editData, name: e.target.value })}
              />
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={showAddModal ? newUser.phone : editData?.phone || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, phone: e.target.value })
                  : setEditData({ ...editData, phone: e.target.value })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={showAddModal ? newUser.email : editData?.email || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, email: e.target.value })
                  : setEditData({ ...editData, email: e.target.value })}
              />
              {(showAddModal ? addType : editData?.type) === 'driver' && (
                <>
                  <label>Plate Number</label>
                  <input
                    type="text"
                    placeholder="Plate Number"
                    value={showAddModal ? newUser.plate : editData?.plate || ''}
                    onChange={e => showAddModal
                      ? setNewUser({ ...newUser, plate: e.target.value })
                      : setEditData({ ...editData, plate: e.target.value })}
                  />
                  <label>URL muna</label>
                  <input
                    type="text"
                    placeholder="Vehicle Photo URL"
                    value={showAddModal ? newUser.vehiclePhoto : editData?.vehiclePhoto || ''}
                    onChange={e => showAddModal
                      ? setNewUser({ ...newUser, vehiclePhoto: e.target.value })
                      : setEditData({ ...editData, vehiclePhoto: e.target.value })}
                  />
                </>
              )}
              <div className="modal-actions">
                <button onClick={showAddModal ? handleAddUser : handleEditUser}>
                  {showAddModal ? 'Add' : 'Save'}
                </button>
                <button onClick={() => { setShowAddModal(false); setShowEditModal(false); setEditData(null); }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default User;