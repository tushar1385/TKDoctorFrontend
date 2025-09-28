import React, { useState } from 'react';
import DoctorList from './DoctorList';
import AddDoctor from './AddDoctor';

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

const DoctorManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setCurrentView('add');
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setCurrentView('edit');
  };

  const handleSave = () => {
    setCurrentView('list');
    setEditingDoctor(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingDoctor(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingDoctor(null);
  };

  return (
    <div>
      {currentView === 'list' && (
        <div>
          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <button 
              onClick={handleAddDoctor}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Add New Doctor
            </button>
          </div>
          <DoctorList onEditDoctor={handleEditDoctor} />
        </div>
      )}
      
      {(currentView === 'add' || currentView === 'edit') && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={handleBackToList}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '10px'
              }}
            >
              ← Back to List
            </button>
          </div>
          <AddDoctor 
            editingDoctor={editingDoctor}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;