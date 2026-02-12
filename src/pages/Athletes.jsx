import { useState, useEffect } from 'react';
import { athletes as initialAthletes, levels, specialities, sports } from '../utils/helpers';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';

const Athletes = () => {
    // Local state for athletes, initialized from helpers but mutable
    const [athletesData, setAthletesData] = useState(() => {
        const saved = localStorage.getItem('sdb_athletes');
        return saved ? JSON.parse(saved) : initialAthletes;
    });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAthlete, setCurrentAthlete] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        gender: 'Male',
        age: '',
        levelID: '',
        specialityID: '',
        enrolledsports: [] // Array of IDs
    });

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('sdb_athletes', JSON.stringify(athletesData));
    }, [athletesData]);

    const getLevelName = (id) => levels.find(l => l.id === parseInt(id))?.name || 'Unknown';
    const getSpecialityName = (id) => specialities.find(s => s.id === parseInt(id))?.name || 'Unknown';
    const getSportNames = (ids) => {
        if (!ids || !Array.isArray(ids)) return '-';
        return ids.map(id => sports.find(s => s.id === parseInt(id))?.name).filter(Boolean).join(', ');
    };

    // Actions
    const handleAddClick = () => {
        setCurrentAthlete(null);
        setFormData({ name: '', gender: 'Male', age: '', levelID: levels[0]?.id, specialityID: specialities[0]?.id, enrolledsports: [] });
        setIsModalOpen(true);
    };

    const handleEditClick = (athlete) => {
        setCurrentAthlete(athlete);
        setFormData({
            name: athlete.name,
            gender: athlete.gender,
            age: athlete.age,
            levelID: athlete.levelID,
            specialityID: athlete.specialityID,
            enrolledsports: athlete.enrolledsports || []
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Delete this athlete?')) {
            setAthletesData(prev => prev.filter(a => a.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const processedData = {
            ...formData,
            age: parseInt(formData.age),
            levelID: parseInt(formData.levelID),
            specialityID: parseInt(formData.specialityID),
            // enrolledsports is already array
        };

        if (currentAthlete) {
            // Update
            setAthletesData(prev => prev.map(a => a.id === currentAthlete.id ? { ...processedData, id: a.id } : a));
        } else {
            // Add
            const newId = athletesData.length > 0 ? Math.max(...athletesData.map(a => a.id)) + 1 : 1;
            setAthletesData([...athletesData, { ...processedData, id: newId }]);
        }
        setIsModalOpen(false);
    };

    const handleSportChange = (e) => {
        const sportId = parseInt(e.target.value);
        const { checked } = e.target;

        setFormData(prev => {
            if (checked) {
                return { ...prev, enrolledsports: [...prev.enrolledsports, sportId] };
            } else {
                return { ...prev, enrolledsports: prev.enrolledsports.filter(id => id !== sportId) };
            }
        });
    };

    const columns = [
        { header: 'Name', accessor: 'name', render: (row) => <strong>{row.name}</strong> },
        { header: 'Gender', accessor: 'gender' },
        { header: 'Age', accessor: 'age' },
        { header: 'Level', accessor: 'levelID', render: (row) => <span className="badge bg-label-primary me-1">{getLevelName(row.levelID)}</span> },
        { header: 'Speciality', accessor: 'specialityID', render: (row) => getSpecialityName(row.specialityID) },
        { header: 'Sports', accessor: 'enrolledsports', render: (row) => getSportNames(row.enrolledsports) },
        { header: 'Actions', id: 'actions' }
    ];

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Management /</span> Athletes</h4>

            <DataTable
                title="Athletes List"
                data={athletesData}
                columns={columns}
                actions={<button className="btn btn-primary btn-sm" onClick={handleAddClick}>Add New Athlete</button>}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />

            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentAthlete ? "Edit Athlete" : "Add New Athlete"}
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-select" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Level</label>
                    <select className="form-select" value={formData.levelID} onChange={e => setFormData({ ...formData, levelID: e.target.value })}>
                        {levels.map(l => <option key={l.id} value={l.id}>{l.name} - {l.description}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Speciality</label>
                    <select className="form-select" value={formData.specialityID} onChange={e => setFormData({ ...formData, specialityID: e.target.value })}>
                        {specialities.map(s => <option key={s.id} value={s.id}>{s.name} - {s.description}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Enrolled Sports</label>
                    <div>
                        {sports.map(s => (
                            <div className="form-check form-check-inline" key={s.id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`sport-${s.id}`}
                                    value={s.id}
                                    checked={formData.enrolledsports.includes(s.id)}
                                    onChange={handleSportChange}
                                />
                                <label className="form-check-label" htmlFor={`sport-${s.id}`}>{s.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </ModalForm>
        </div>
    );
};

export default Athletes;
