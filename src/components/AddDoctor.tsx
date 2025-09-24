import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./AddDoctor.css";
import axios from "axios";

interface FormData {
    drName: string;
    drCode: string;
    mobile: string;
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

const AddDoctor: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        drName: "",
        drCode: "",
        mobile: "",
        email: "",
        pan: "",
        address: "",
        dob: "",
        callDay: "",
        callTime: "",
        notes: "",
        chemistDetails:"",
        medReg: "",
        visitingRx: "",
        activeInactive: ""
    });

    const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        console.log("Form Data:", JSON.stringify(formData));

        const response = await axios.post(
            "http://localhost:5000/api/doctors",
            formData, 
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response:", response.data);
        alert("Doctor details saved!");

        // Reset form
        setFormData({
            drName: "",
            drCode: "",
            mobile: "",
            email: "",
            pan: "",
            address: "",
            dob: "",
            callDay: "",
            callTime: "",
            notes: "",
            chemistDetails:"",
            medReg: "",
            visitingRx: "",
            activeInactive: ""
        });
    } catch (error) {
        console.error("Error saving doctor:", error);
        alert("Failed to save doctor details!");
    }
};


   return (
  <div className="form-container">
    <div className="title-bar">Doctor Management</div>
    <h2>Add Doctor</h2>

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
        <select
          name="callDay"
          value={formData.callDay}
          onChange={handleChange}
        >
          <option value="">(none)</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
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
        <input
          type="text"
          name="activeInactive"
          value={formData.activeInactive}
          onChange={handleChange}
          required
        />
      </div>

        {/* === Row 4: Notes full width === */}
      <div className="form-item" style={{ gridColumn: "span 3" }}>
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* === Buttons full width === */}
      <div className="form-buttons" style={{ gridColumn: "span 3" }}>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() =>
            setFormData({
              drName: "",
              drCode: "",
              mobile: "",
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
              activeInactive: "",
            })
          }
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

};

export default AddDoctor;
