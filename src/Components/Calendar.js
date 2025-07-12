import { useState, useEffect } from "react"; 
import "./Calendar.css";

function Calendar() {
     const [appointments, setAppointments] = useState([]); 
     const [currentDate, setCurrentDate] = useState(new Date()); 
     const [selectedDate, setSelectedDate] = useState(new Date()); 
     const [showModal, setShowModal] = useState(false); 
     const [formData, setFormData] = useState({ patientName: '', doctorName: '', time: '', type: '', notes: '' });

useEffect(() => { 
    const saved = localStorage.getItem('clinic_appointments');
     if (saved) { setAppointments(JSON.parse(saved)); } }, []);

useEffect(() => {
     localStorage.setItem('clinic_appointments', JSON.stringify(appointments)); }, [appointments]);

const addAppointment = () => {
     if (!formData.patientName || !formData.doctorName || !formData.time) { 
        alert("Please fill in all required fields."); 
        return;
     } 
const newAppointment = { id: Date.now(), date: selectedDate.toISOString().split('T')[0], ...formData }; 
setAppointments([...appointments, newAppointment]); 
setFormData({ patientName: '', doctorName: '', time: '', type: '', notes: '' });
setShowModal(false); };

const deleteAppointment = (id) => { 
    setAppointments(appointments.filter(apt => apt.id !== id));
 };

const getDaysInMonth = (date) => { 
    const year = date.getFullYear(); const month = date.getMonth();
    const firstDay = new Date(year, month, 1); 
    const lastDay = new Date(year, month + 1, 0); 
    const daysInMonth = lastDay.getDate(); 
    const startingDayOfWeek = firstDay.getDay();

const days = [];

for (let i = startingDayOfWeek - 1; i >= 0; i--) {
  const prevDate = new Date(year, month, -i);
  days.push({ date: prevDate, isCurrentMonth: false });
}

for (let day = 1; day <= daysInMonth; day++) {
  const date = new Date(year, month, day);
  days.push({ date, isCurrentMonth: true });
}

const remainingDays = 42 - days.length;
for (let day = 1; day <= remainingDays; day++) {
  const nextDate = new Date(year, month + 1, day);
  days.push({ date: nextDate, isCurrentMonth: false });
}

return days;

};

const getAppointmentsForDate = (date) => {
     const dateStr = date.toISOString().split('T')[0];
      return appointments.filter(apt => apt.date === dateStr).sort((a, b) => a.time.localeCompare(b.time)); };

const openModal = (date) => { 
    setSelectedDate(date); setShowModal(true); 
};

const days = getDaysInMonth(currentDate);
 const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

return ( 
<div className="app"> <header className="header"> 
    <h1>Medical Clinic Calendar</h1> <p>Manage patient appointments</p> </header>

<div className="calendar-container">
    <div className="calendar-header">
      <button 
        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        className="nav-button"
      >
        ‹
      </button>
      <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
      <button 
        onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
        className="nav-button"
      >
        ›
      </button>
    </div>

    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <div key={day} className="day-header">{day}</div>
      ))}

      {days.map((dayInfo, index) => {
        const dayAppointments = getAppointmentsForDate(dayInfo.date);
        const isToday = dayInfo.date.toDateString() === new Date().toDateString();
        const isSelected = dayInfo.date.toDateString() === selectedDate.toDateString();

        return (
          <div 
            key={index}
            className={`calendar-day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => dayInfo.isCurrentMonth && openModal(dayInfo.date)}
          >
            <span className="day-number">{dayInfo.date.getDate()}</span>
            {dayAppointments.map(apt => (
              <div key={apt.id} className="appointment-indicator">
                <small>{apt.patientName} - {apt.time}</small>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAppointment(apt.id);
                  }}
                  className="delete-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  </div>

  {showModal && (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>New Appointment - {selectedDate.toLocaleDateString()}</h3>

        <div className="form-group">
          <label>Patient Name:</label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            placeholder="Enter patient name"
          />
        </div>

        <div className="form-group">
          <label>Doctor:</label>
          <select
            value={formData.doctorName}
            onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Williams">Dr. Williams</option>
            <option value="Dr. Brown">Dr. Brown</option>
          </select>
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Appointment Type:</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="">Select Type</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Checkup">Checkup</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
            rows="3"
          />
        </div>

        <div className="modal-buttons">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            Cancel
          </button>
          <button onClick={addAppointment} className="save-btn">
            Save Appointment
          </button>
        </div>
      </div>
    </div>
  )}
</div>

); }

export default Calendar;