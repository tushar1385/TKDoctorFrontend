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
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Search states
  const [searchColumn, setSearchColumn] = useState("drName");
  const [searchValue, setSearchValue] = useState("");

  const searchableColumns = [
    { value: "drName", label: "Doctor Name" },
    { value: "drCode", label: "Doctor Code" },
    { value: "ffrmslno", label: "FFR MSL No." },
    { value: "pan", label: "PAN" }
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    // Apply search filter whenever search criteria or doctors list changes
    applySearchFilter();
  }, [searchColumn, searchValue, doctors]);

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

  const applySearchFilter = () => {
    if (!searchValue.trim()) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(doctor => {
      const columnValue = doctor[searchColumn as keyof Doctor]?.toString().toLowerCase() || "";
      const searchTerm = searchValue.toLowerCase().trim();
      
      return columnValue.includes(searchTerm);
    });

    setFilteredDoctors(filtered);
  };

  const handleSearchColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchColumn(e.target.value);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearchColumn("drName");
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

  const displayDoctors = searchValue ? filteredDoctors : doctors;

  return (
    <div className="page-container">
      <div className="card">
        <h2>Doctors List</h2>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-fields">
            <div className="search-field">
              <label>Search By:</label>
              <select 
                value={searchColumn} 
                onChange={handleSearchColumnChange}
                className="search-select"
              >
                {searchableColumns.map(column => (
                  <option key={column.value} value={column.value}>
                    {column.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="search-field">
              <label>Search Value:</label>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchValueChange}
                placeholder={`Enter ${searchableColumns.find(col => col.value === searchColumn)?.label.toLowerCase()}...`}
                className="search-input"
              />
            </div>

            <button 
              onClick={clearSearch}
              className="clear-search-btn"
            >
              Clear
            </button>
          </div>

          {searchValue && (
            <div className="search-results-info">
              Showing {filteredDoctors.length} of {doctors.length} doctors
            </div>
          )}
        </div>

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
              {displayDoctors.length > 0 ? (
                displayDoctors.map((doc) => (
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
                <tr>
                  <td colSpan={16} className="no-data">
                    {searchValue ? "No doctors found matching your search criteria." : "No doctors available."}
                  </td>
                </tr>
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