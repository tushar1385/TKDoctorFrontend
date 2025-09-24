import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorList.css";

interface Doctor {
  id: number;
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

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://your-backend-server.com/api/doctors"
        );
        setDoctors(response.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
        setDoctors([{id:12345,
            name: "Tushar",
            mobile: "1234",
            email: 'tusharwfl',
            pan: "bjfhbe",
            address: "Hell",
            dob: "14-01-2001",
            callDay: "Sunday",
            callTime: "06:77",
            notes: "Hello"
        }]);
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
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.name}</td>
                    <td>{doc.mobile}</td>
                    <td>{doc.email}</td>
                    <td>{doc.pan}</td>
                    <td>{doc.address}</td>
                    <td>{doc.dob}</td>
                    <td>{doc.callDay}</td>
                    <td>{doc.callTime}</td>
                    <td>{doc.notes}</td>
                  </tr>
                ))
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 9 }).map((__, colIndex) => (
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
