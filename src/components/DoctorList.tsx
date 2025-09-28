import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorList.css";

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

interface DoctorListProps {
  onEditDoctor: (doctor: Doctor) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ onEditDoctor }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data || []);
    } catch (err) {
      console.error(err);
      setError(true);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    onEditDoctor(doctor);
  };

  const handleDeleteClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDoctor) return;

    try {
      await axios.delete(`http://localhost:5000/api/doctors/${selectedDoctor._id}`);
      // Refresh the list after deletion
      fetchDoctors();
      setDeleteModal(false);
      setSelectedDoctor(null);
      alert("Doctor deleted successfully!");
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("Failed to delete doctor!");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedDoctor(null);
  };

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
                <th>Doctor Name</th>
                <th>Doctor Code</th>
                <th>Mobile</th>
                <th>FFR MSL No.</th>
                <th>Email</th>
                <th>PAN</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Call Day</th>
                <th>Call Time</th>
                <th>Notes</th>
                <th>Chemist Details</th>
                <th>Medical Registration</th>
                <th>VisitingRX</th>
                <th>Active/Inactive</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.drName}</td>
                    <td>{doc.drCode}</td>
                    <td>{doc.mobile}</td>
                    <td>{doc.ffrmslno}</td>
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
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(doc)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteClick(doc)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 16 }).map((__, colIndex) => (
                      <td key={colIndex}></td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>
                Are you sure you want to delete doctor{" "}
                <strong>{selectedDoctor?.drName}</strong>?
              </p>
              <div className="modal-buttons">
                <button 
                  className="confirm-btn"
                  onClick={handleDeleteConfirm}
                >
                  Yes, Delete
                </button>
                <button 
                  className="cancel-btn"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;