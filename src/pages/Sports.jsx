import { useState, useEffect } from 'react';
import { sports as initialSports } from '../utils/helpers';
import DataTable from '../components/DataTable';
import ModalForm from '../components/ModalForm';

const Sports = () => {
    // --- State ---
    const [sportsData, setSportsData] = useState(() => {
        const saved = localStorage.getItem('sdb_sports');
        return saved ? JSON.parse(saved) : initialSports;
    });

    // --- Persistence ---
    useEffect(() => {
        localStorage.setItem('sdb_sports', JSON.stringify(sportsData));
    }, [sportsData]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSport, setCurrentSport] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', individual: false });

    // --- Handlers ---
    const handleAddClick = () => {
        setCurrentSport(null);
        setFormData({ name: '', description: '', individual: false });
        setIsModalOpen(true);
    };

    const handleEditClick = (sport) => {
        setCurrentSport(sport);
        setFormData({ name: sport.name, description: sport.description, individual: sport.individual });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Delete this sport?')) {
            setSportsData(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentSport) {
            setSportsData(prev => prev.map(s => s.id === currentSport.id ? { ...formData, id: s.id } : s));
        } else {
            const newId = sportsData.length > 0 ? Math.max(...sportsData.map(s => s.id)) + 1 : 1;
            setSportsData([...sportsData, { ...formData, id: newId }]);
        }
        setIsModalOpen(false);
    };

    // --- Columns ---
    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name', render: (row) => <strong>{row.name}</strong> },
        { header: 'Description', accessor: 'description' },
        { header: 'Type', accessor: 'individual', render: (row) => row.individual ? 'Individual' : 'Team' },
        { header: 'Actions', id: 'actions' }
    ];

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Management /</span> Sports</h4>

            <DataTable
                title="Sports List"
                data={sportsData}
                columns={columns}
                actions={<button className="btn btn-primary btn-sm" onClick={handleAddClick}>Add New Sport</button>}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />

            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentSport ? "Edit Sport" : "Add New Sport"}
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="individualCheck" checked={formData.individual} onChange={e => setFormData({ ...formData, individual: e.target.checked })} />
                        <label className="form-check-label" htmlFor="individualCheck">Individual Sport</label>
                    </div>
                </div>
            </ModalForm>
        </div>
    );
};

export default Sports;
