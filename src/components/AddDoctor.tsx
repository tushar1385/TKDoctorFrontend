import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./AddDoctor.css";
import axios from "axios";

interface FormData {
    name: string;
    mobile: string;
    email: string;
    pan: string;
    address: string;
    dob: string;
    callDay: string;
    callTime: string;
    notes: string;
}

const AddDoctor: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        mobile: "",
        email: "",
        pan: "",
        address: "",
        dob: "",
        callDay: "",
        callTime: "",
        notes: "",
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
        // Print JSON to console
        console.log("Form Data:", JSON.stringify(formData, null, 2));

        const response = await axios.post(
            "http://your-backend-server.com/api/doctors",
            formData, // now just JSON
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Response:", response.data);
        alert("Doctor details saved!");

        // Reset form
        setFormData({
            name: "",
            mobile: "",
            email: "",
            pan: "",
            address: "",
            dob: "",
            callDay: "",
            callTime: "",
            notes: "",
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
                <div className="form-row">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />

                    <label>Mobile</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />

                    <label>PAN</label>
                    <input type="text" name="pan" value={formData.pan} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />

                    <label>DOB</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Call Day</label>
                    <select name="callDay" value={formData.callDay} onChange={handleChange}>
                        <option value="">(none)</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>

                    <label>Call Time</label>
                    <input type="time" name="callTime" value={formData.callTime} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>

                <div className="form-buttons">
                    <button type="submit">Save</button>
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                name: "",
                                mobile: "",
                                email: "",
                                pan: "",
                                address: "",
                                dob: "",
                                callDay: "",
                                callTime: "",
                                notes: "",
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
