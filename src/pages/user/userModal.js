import React from 'react';

const UserModal = ({
  showAddModal,
  showEditModal,
  addType,
  editData,
  newUser,
  setNewUser,
  setEditData,
  errorMsg,
  handleAddUser,
  handleEditUser,
  setShowAddModal,
  setShowEditModal,
  userPhotoPreview,
  vehiclePhotoPreview,
  handleUserPhotoChange,
  handleVehiclePhotoChange,
  closeModals
}) => {
  return (
    <div className="modal-overlay" onClick={closeModals}>
      <div
        className="modal modal-flex"
        onClick={e => e.stopPropagation()}
      >
        {/* Left: Image Preview */}
        <div className="image-preview-col" style={{ flex: '0 0 160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '2rem', minWidth: 140 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: 140 }}>
            <img
              src={
                showAddModal
                  ? (userPhotoPreview || (typeof newUser.userPhoto === 'string' && newUser.userPhoto) || 'https://via.placeholder.com/120?text=User+Photo')
                  : userPhotoPreview || (editData?.userPhoto && typeof editData.userPhoto === 'string' ? editData.userPhoto : (editData?.userPhoto && editData.userPhoto.name ? URL.createObjectURL(editData.userPhoto) : 'https://via.placeholder.com/120?text=User+Photo'))
              }
              alt="User"
              className="user-photo user-photo-preview"
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '2px solid #29b6f6', background: '#f5faff', maxWidth: '100%', maxHeight: 100 }}
            />
            <label style={{ fontSize: 13, color: '#888', marginTop: 4 }}>User Photo</label>
            <label className="file-upload-label">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={e => handleUserPhotoChange(e, showEditModal)}
              />
            </label>
          </div>
          {(showAddModal ? addType : editData?.type) === 'driver' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: 140 }}>
              <img
                src={
                  showAddModal
                    ? (vehiclePhotoPreview || (typeof newUser.vehiclePhoto === 'string' && newUser.vehiclePhoto) || 'https://via.placeholder.com/120x80?text=Vehicle+Photo')
                    : vehiclePhotoPreview || (editData?.vehiclePhoto && typeof editData.vehiclePhoto === 'string' ? editData.vehiclePhoto : (editData?.vehiclePhoto && editData.vehiclePhoto.name ? URL.createObjectURL(editData.vehiclePhoto) : 'https://via.placeholder.com/120x80?text=Vehicle+Photo'))
                }
                alt="Vehicle"
                className="vehicle-photo vehicle-photo-preview"
                style={{ width: 100, height: 70, borderRadius: 8, objectFit: 'cover', border: '2px solid #29b6f6', background: '#f5faff', maxWidth: '100%', maxHeight: 70 }}
              />
              <label style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Vehicle Photo</label>
              <label className="file-upload-label">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleVehiclePhotoChange(e, showEditModal)}
                />
              </label>
            </div>
          )}
        </div>
        {/* Right: Input Fields */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'flex-start' }}>
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 700, color: '#29b6f6' }}>
            {showAddModal
              ? `Add ${addType === 'regular' ? 'User' : 'Driver'}`
              : `Edit ${editData?.type === 'regular' ? 'User' : 'Driver'}`}
          </h2>
          <div className="modal-fields-grid">
            {/* Left column: Username, Phone, Email */}
            <div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={showAddModal ? newUser.username : editData?.username || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, username: e.target.value })
                  : setEditData({ ...editData, username: e.target.value })}
                maxLength={32}
              />
            </div>
            {/* Right column: Given Name */}
            <div>
              <label>Given Name</label>
              <input
                type="text"
                placeholder="Given Name"
                value={showAddModal ? newUser.given_name : editData?.given_name || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, given_name: e.target.value })
                  : setEditData({ ...editData, given_name: e.target.value })}
                maxLength={32}
              />
            </div>
            {/* Left column: Phone Number */}
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={showAddModal ? newUser.phone : editData?.phone || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, phone: e.target.value })
                  : setEditData({ ...editData, phone: e.target.value })}
                maxLength={20}
              />
            </div>
            {/* Right column: Middle Initial */}
            <div>
              <label>Middle Initial</label>
              <input
                type="text"
                placeholder="M.I."
                maxLength={2}
                value={showAddModal ? newUser.middle_initial : editData?.middle_initial || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, middle_initial: e.target.value })
                  : setEditData({ ...editData, middle_initial: e.target.value })}
                style={{ textAlign: 'center' }}
              />
            </div>
            {/* Left column: Email */}
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={showAddModal ? newUser.email : editData?.email || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, email: e.target.value })
                  : setEditData({ ...editData, email: e.target.value })}
                maxLength={64}
              />
            </div>
            {/* Right column: Last Name */}
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={showAddModal ? newUser.last_name : editData?.last_name || ''}
                onChange={e => showAddModal
                  ? setNewUser({ ...newUser, last_name: e.target.value })
                  : setEditData({ ...editData, last_name: e.target.value })}
                maxLength={32}
              />
            </div>
            {/* Plate Number row spans both columns */}
            {(showAddModal ? addType : editData?.type) === 'driver' && (
              <div className="plate-row">
                <label>Plate Number</label>
                <input
                  type="text"
                  placeholder="Plate Number"
                  value={showAddModal ? newUser.plate : editData?.plate || ''}
                  onChange={e => showAddModal
                    ? setNewUser({ ...newUser, plate: e.target.value })
                    : setEditData({ ...editData, plate: e.target.value })}
                />
              </div>
            )}
          </div>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <div className="modal-actions" style={{ marginTop: 16 }}>
            <button onClick={showAddModal ? handleAddUser : handleEditUser}>
              {showAddModal ? 'Add' : 'Save'}
            </button>
            <button onClick={closeModals}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
