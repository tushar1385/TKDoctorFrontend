import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./AddDoctor.css";
import axios from "axios";

interface Doctor {
  _id: number;
  drName: string;
  drCode: string;
  mobile: number;
  ffrmslno: number;
  email: string;
  pan: string;
  address: string;
  dob: string;
  callDay: string;
  callTime: string;
  notes: string;
  chemistDetails: string;
  medReg: string;
  visitingRx: string;
  activeInactive: string;
}

interface FormData {
  drName: string;
  drCode: string;
  mobile: string;
  ffrmslno: string;
  email: string;
  pan: string;
  address: string;
  dob: string;
  callDay: string;
  callTime: string;
  notes: string;
  chemistDetails: string;
  medReg: string;
  visitingRx: string;
  activeInactive: string;
}

interface AddDoctorProps {
  editingDoctor: Doctor | null;
  onSave: () => void;
  onCancel: () => void;
}

const AddDoctor: React.FC<AddDoctorProps> = ({ editingDoctor, onSave, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    drName: "",
    drCode: "",
    mobile: "",
    ffrmslno: "",
    email: "",
    pan: "",
    address: "",
    dob: "",
    callDay: "",
    callTime: "",
    notes: "",
    chemistDetails: "",
    medReg: "",
    visitingRx: "",
    activeInactive: ""
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Populate form when editingDoctor changes
  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        drName: editingDoctor.drName || "",
        drCode: editingDoctor.drCode || "",
        mobile: editingDoctor.mobile?.toString() || "",
        ffrmslno: editingDoctor.ffrmslno?.toString() || "",
        email: editingDoctor.email || "",
        pan: editingDoctor.pan || "",
        address: editingDoctor.address || "",
        dob: editingDoctor.dob || "",
        callDay: editingDoctor.callDay || "",
        callTime: editingDoctor.callTime || "",
        notes: editingDoctor.notes || "",
        chemistDetails: editingDoctor.chemistDetails || "",
        medReg: editingDoctor.medReg || "",
        visitingRx: editingDoctor.visitingRx || "",
        activeInactive: editingDoctor.activeInactive || ""
      });
    } else {
      // Reset form when not editing
      setFormData({
        drName: "",
        drCode: "",
        mobile: "",
        ffrmslno: "",
        email: "",
        pan: "",
        address: "",
        dob: "",
        callDay: "",
        callTime: "",
        notes: "",
        chemistDetails: "",
        medReg: "",
        visitingRx: "",
        activeInactive: ""
      });
    }
  }, [editingDoctor]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDayChange = (day: string) => {
    const currentDays = formData.callDay ? formData.callDay.split(',') : [];
    
    let newDays;
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = [...currentDays, day];
    }
    
    setFormData({ 
      ...formData, 
      callDay: newDays.join(',') 
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        // Update existing doctor
        await axios.put(
          `http://localhost:5000/api/doctors/${editingDoctor._id}`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Doctor details updated!");
      } else {
        // Create new doctor
        await axios.post(
          "http://localhost:5000/api/doctors",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Doctor details saved!");
      }

      onSave(); // Notify parent component
      
      // Reset form
      setFormData({
        drName: "",
        drCode: "",
        mobile: "",
        ffrmslno: "",
        email: "",
        pan: "",
        address: "",
        dob: "",
        callDay: "",
        callTime: "",
        notes: "",
        chemistDetails: "",
        medReg: "",
        visitingRx: "",
        activeInactive: ""
      });

    } catch (error) {
      console.error("Error saving doctor:", error);
      alert(`Failed to ${editingDoctor ? 'update' : 'save'} doctor details!`);
    }
  };

  return (
    <div className="form-container">
      <div className="title-bar">Doctor Management</div>
      <h2>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>

      <form onSubmit={handleSubmit} className="doctor-form">
        <div className="form-item">
          <label>Doctor Name</label>
          <input
            type="text"
            name="drName"
            value={formData.drName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Doctor Code</label>
          <input
            type="text"
            name="drCode"
            value={formData.drCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>FFR MSL No.</label>
          <input
            type="text"
            name="ffrmslno"
            value={formData.ffrmslno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>PAN</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item" style={{ gridColumn: "span 3" }}>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-item">
          <label>Call Day</label>
          <div className="custom-dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
            <div 
              className="dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                color: formData.callDay ? '#1f2937' : '#9ca3af',
                minHeight: '42px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {formData.callDay ? formData.callDay.split(',').join(', ') : 'Select days...'}
            </div>
            
            {showDropdown && (
              <div 
                className="dropdown-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  marginTop: '4px',
                  padding: '8px',
                  zIndex: 1000,
                  width: '100%',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                {days.map(day => (
                  <label 
                    key={day}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      marginBottom: '2px',
                      fontSize: '14px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.callDay.includes(day)}
                      onChange={() => handleDayChange(day)}
                      style={{ 
                        marginRight: '12px',
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div style={{ 
            fontSize: '12px', 
            marginTop: '6px', 
            color: '#6b7280',
            minHeight: '16px'
          }}>
            <strong>Selected:</strong> {formData.callDay ? formData.callDay.split(',').join(', ') : 'No days selected'}
          </div>
        </div>

        <div className="form-item">
          <label>Call Time</label>
          <input
            type="time"
            name="callTime"
            value={formData.callTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Chemist Details</label>
          <input
            type="text"
            name="chemistDetails"
            value={formData.chemistDetails}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Medical Registration</label>
          <input
            type="text"
            name="medReg"
            value={formData.medReg}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Visiting / RX</label>
          <input
            type="text"
            name="visitingRx"
            value={formData.visitingRx}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-item">
          <label>Active / Inactive</label>
          <select
            name="activeInactive"
            value={formData.activeInactive}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'white',
              minHeight: '42px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-item" style={{ gridColumn: "span 3" }}>
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-buttons" style={{ gridColumn: "span 3" }}>
          <button type="submit">{editingDoctor ? 'Update' : 'Save'}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;