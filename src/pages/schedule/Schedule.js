import React, { useState, useRef, useEffect } from 'react';
import './Schedule.css';
import Sidebar from '../../Sidebar';

// Dummy data 
const initialSchedules = [
  { id: 1, route: 'Route 1', driver: 'Bong Revilla', schedule: ['M', 'W', 'F'] },
  { id: 2, route: 'Route 2', driver: 'Balbas S. Sarado', schedule: ['T', 'Th'] },
];

const WEEKDAYS = [
  { key: 'M', label: 'Mon' },
  { key: 'T', label: 'Tue' },
  { key: 'W', label: 'Wed' },
  { key: 'Th', label: 'Thu' },
  { key: 'F', label: 'Fri' },
  { key: 'Sa', label: 'Sat' },
  { key: 'Su', label: 'Sun' },
];

function Schedule() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showMenu, setShowMenu] = useState({ id: null });
  const menuRef = useRef(null);

  //placeholder for future API integration
  const fetchSchedules = () => {};
  const addScheduleAPI = (data) => {};
  const editScheduleAPI = (data) => {};
  const deleteScheduleAPI = (id) => {};

  //action menu disable if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu({ id: null });
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

  //statefor new/edit schedule
  const [newSchedule, setNewSchedule] = useState({
    route: '',
    driver: '',
    schedule: [],
  });

  //addschedule
  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      {
        id: Date.now(),
        route: newSchedule.route,
        driver: newSchedule.driver,
        schedule: newSchedule.schedule,
      },
    ]);
    setShowAddModal(false);
    setNewSchedule({ route: '', driver: '', schedule: [] });
    // addScheduleAPI(newSchedule); // For future API
  };

  //edit schedule
  const handleEditSchedule = () => {
    setSchedules(schedules.map(s => s.id === editData.id ? editData : s));
    setShowEditModal(false);
    setEditData(null);
    // editScheduleAPI(editData); // For future API
  };

  //delete schedule
  const handleDelete = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
    setShowMenu({ id: null });
    // deleteScheduleAPI(id); // For future API
  };

  //toggle weekday for add/edit modal
  const toggleWeekday = (day, isEdit = false) => {
    if (isEdit) {
      setEditData({
        ...editData,
        schedule: editData.schedule.includes(day)
          ? editData.schedule.filter(d => d !== day)
          : [...editData.schedule, day],
      });
    } else {
      setNewSchedule({
        ...newSchedule,
        schedule: newSchedule.schedule.includes(day)
          ? newSchedule.schedule.filter(d => d !== day)
          : [...newSchedule.schedule, day],
      });
    }
  };

  return (
    <>
      <Sidebar className={showAddModal || showEditModal ? 'sidebar-disabled' : ''} />
      <div className="shuttle-schedule-page" style={{ marginLeft: 240 }}>
        <section className="schedule-section">
          <div className="schedule-table-header">
            <h2>Shuttle Schedule Table</h2>
            <button className="add-schedule-btn" onClick={() => setShowAddModal(true)}>
              <span className="add-icon">+</span> Add Schedule
            </button>
          </div>
          <div className="table-scroll">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Driver</th>
                  <th>Schedule</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(s => (
                  <tr key={s.id}>
                    <td>{s.route}</td>
                    <td>{s.driver}</td>
                    <td>{s.schedule.join('/')}</td>
                    <td className="actions-cell">
                      <button
                        className="dots-btn"
                        onClick={() => setShowMenu(showMenu.id === s.id ? { id: null } : { id: s.id })}
                      >&#8942;</button>
                      {showMenu.id === s.id && (
                        <div className="action-menu" ref={menuRef}>
                          <button onClick={() => { setEditData(s); setShowEditModal(true); setShowMenu({ id: null }); }}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
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
              <h2>{showAddModal ? 'Add Schedule' : 'Edit Schedule'}</h2>
              <label>Route</label>
              <input
                type="text"
                placeholder="Route"
                value={showAddModal ? newSchedule.route : editData?.route || ''}
                onChange={e => showAddModal
                  ? setNewSchedule({ ...newSchedule, route: e.target.value })
                  : setEditData({ ...editData, route: e.target.value })}
              />
              <label>Driver</label>
              <input
                type="text"
                placeholder="Driver Name"
                value={showAddModal ? newSchedule.driver : editData?.driver || ''}
                onChange={e => showAddModal
                  ? setNewSchedule({ ...newSchedule, driver: e.target.value })
                  : setEditData({ ...editData, driver: e.target.value })}
              />
              <label>Schedule (Weekdays)</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {WEEKDAYS.map(day => (
                  <button
                    key={day.key}
                    type="button"
                    style={{
                      background: (showAddModal
                        ? newSchedule.schedule.includes(day.key)
                        : editData?.schedule?.includes(day.key)) ? '#29b6f6' : '#f5faff',
                      color: (showAddModal
                        ? newSchedule.schedule.includes(day.key)
                        : editData?.schedule?.includes(day.key)) ? '#fff' : '#222',
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                    onClick={() => toggleWeekday(day.key, !showAddModal)}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              <div className="modal-actions">
                <button onClick={showAddModal ? handleAddSchedule : handleEditSchedule}>
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

export default Schedule;