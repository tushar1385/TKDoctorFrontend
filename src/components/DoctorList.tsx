import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorList.css";

interface Doctor {
  _id: number;
  name: string;
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

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/doctors"
        );
        setDoctors(response.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>Doctors List</h2>

        {loading ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
        ) : (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>PAN</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Call Day</th>
                <th>Call Time</th>
                <th>Notes</th>
                <th>chemistDetails</th>
                <th>medReg</th>
                <th>visitingRx</th>
                <th>active/Inactive</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.name}</td>
                    <td>{doc.mobile}</td>
                    <td>{doc.email}</td>
                    <td>{doc.pan}</td>
                    <td>{doc.address}</td>
                    <td>{doc.dob}</td>
                    <td>{doc.callDay}</td>
                    <td>{doc.callTime}</td>
                    <td>{doc.notes}</td>
                    <td>{doc.chemistDetails}</td>
                    <td>{doc.medReg}</td>
                    <td>{doc.visitingRx}</td>
                    <td>{doc.activeInactive}</td>
                  </tr>
                ))
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 13 }).map((__, colIndex) => (
                      <td key={colIndex}></td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
