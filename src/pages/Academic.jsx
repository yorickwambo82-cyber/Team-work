import { useState, useEffect } from 'react';
import { levels as initialLevels, specialities as initialSpecialities } from '../utils/helpers';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';

const Academic = () => {
    // --- Levels State ---
    const [levelsData, setLevelsData] = useState(() => {
        const saved = localStorage.getItem('sdb_levels');
        return saved ? JSON.parse(saved) : initialLevels;
    });

    // --- Specialities State ---
    const [specialitiesData, setSpecialitiesData] = useState(() => {
        const saved = localStorage.getItem('sdb_specialities');
        return saved ? JSON.parse(saved) : initialSpecialities;
    });

    // --- Persistence ---
    useEffect(() => {
        localStorage.setItem('sdb_levels', JSON.stringify(levelsData));
    }, [levelsData]);

    useEffect(() => {
        localStorage.setItem('sdb_specialities', JSON.stringify(specialitiesData));
    }, [specialitiesData]);

    // --- Modals State ---
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(null);
    const [levelForm, setLevelForm] = useState({ name: '', description: '' });

    const [isSpecialityModalOpen, setIsSpecialityModalOpen] = useState(false);
    const [currentSpeciality, setCurrentSpeciality] = useState(null);
    const [specialityForm, setSpecialityForm] = useState({ name: '', description: '' });

    // --- Level Handlers ---
    const openAddLevel = () => {
        setCurrentLevel(null);
        setLevelForm({ name: '', description: '' });
        setIsLevelModalOpen(true);
    };

    const openEditLevel = (level) => {
        setCurrentLevel(level);
        setLevelForm({ name: level.name, description: level.description });
        setIsLevelModalOpen(true);
    };

    const handleDeleteLevel = (id) => {
        if (window.confirm('Delete this level?')) {
            setLevelData(prev => prev.filter(l => l.id !== id));
        }
    };

    // Fix: setLevelData -> setLevelsData typo in handleDeleteLevel
    const handleDeleteLevelFixed = (id) => {
        if (window.confirm('Delete this level?')) {
            setLevelsData(prev => prev.filter(l => l.id !== id));
        }
    };

    const handleLevelSubmit = (e) => {
        e.preventDefault();
        if (currentLevel) {
            // Update
            setLevelsData(prev => prev.map(l => l.id === currentLevel.id ? { ...l, ...levelForm } : l));
        } else {
            // Add
            const newId = levelsData.length > 0 ? Math.max(...levelsData.map(l => l.id)) + 1 : 1;
            setLevelsData([...levelsData, { id: newId, ...levelForm }]);
        }
        setIsLevelModalOpen(false);
    };

    // --- Speciality Handlers ---
    const openAddSpeciality = () => {
        setCurrentSpeciality(null);
        setSpecialityForm({ name: '', description: '' });
        setIsSpecialityModalOpen(true);
    };

    const openEditSpeciality = (spec) => {
        setCurrentSpeciality(spec);
        setSpecialityForm({ name: spec.name, description: spec.description });
        setIsSpecialityModalOpen(true);
    };

    const handleDeleteSpeciality = (id) => {
        if (window.confirm('Delete this speciality?')) {
            setSpecialitiesData(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleSpecialitySubmit = (e) => {
        e.preventDefault();
        if (currentSpeciality) {
            // Update
            setSpecialitiesData(prev => prev.map(s => s.id === currentSpeciality.id ? { ...s, ...specialityForm } : s));
        } else {
            // Add
            const newId = specialitiesData.length > 0 ? Math.max(...specialitiesData.map(s => s.id)) + 1 : 1;
            setSpecialitiesData([...specialitiesData, { id: newId, ...specialityForm }]);
        }
        setIsSpecialityModalOpen(false);
    };

    // --- Columns ---
    const levelColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Level Name', accessor: 'name', render: (row) => <strong>{row.name}</strong> },
        { header: 'Description', accessor: 'description' },
        { header: 'Actions', id: 'actions' }
    ];

    const specialityColumns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Speciality Name', accessor: 'name', render: (row) => <strong>{row.name}</strong> },
        { header: 'Description', accessor: 'description' },
        { header: 'Actions', id: 'actions' }
    ];

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Management /</span> Academic Info</h4>

            <div className="row">
                {/* Levels Table */}
                <div className="col-md-12 mb-4">
                    <DataTable
                        title="Levels"
                        data={levelsData}
                        columns={levelColumns}
                        actions={<button className="btn btn-primary btn-sm" onClick={openAddLevel}>Add Level</button>}
                        onEdit={openEditLevel}
                        onDelete={handleDeleteLevelFixed}
                    />
                </div>

                {/* Specialities Table */}
                <div className="col-md-12">
                    <DataTable
                        title="Specialities"
                        data={specialitiesData}
                        columns={specialityColumns}
                        actions={<button className="btn btn-primary btn-sm" onClick={openAddSpeciality}>Add Speciality</button>}
                        onEdit={openEditSpeciality}
                        onDelete={handleDeleteSpeciality}
                    />
                </div>
            </div>

            {/* Level Modal */}
            <ModalForm
                isOpen={isLevelModalOpen}
                onClose={() => setIsLevelModalOpen(false)}
                title={currentLevel ? "Edit Level" : "Add New Level"}
                onSubmit={handleLevelSubmit}
            >
                <div className="mb-3">
                    <label className="form-label">Level Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={levelForm.name}
                        onChange={e => setLevelForm({ ...levelForm, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={levelForm.description}
                        onChange={e => setLevelForm({ ...levelForm, description: e.target.value })}
                        required
                    />
                </div>
            </ModalForm>

            {/* Speciality Modal */}
            <ModalForm
                isOpen={isSpecialityModalOpen}
                onClose={() => setIsSpecialityModalOpen(false)}
                title={currentSpeciality ? "Edit Speciality" : "Add New Speciality"}
                onSubmit={handleSpecialitySubmit}
            >
                <div className="mb-3">
                    <label className="form-label">Speciality Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={specialityForm.name}
                        onChange={e => setSpecialityForm({ ...specialityForm, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={specialityForm.description}
                        onChange={e => setSpecialityForm({ ...specialityForm, description: e.target.value })}
                        required
                    />
                </div>
            </ModalForm>
        </div>
    );
};

export default Academic;
