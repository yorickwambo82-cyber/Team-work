import { useState, useRef, useEffect } from 'react';

// Helper component for Dropdown in interactions
const ActionDropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`dropdown ${isOpen ? 'show' : ''}`} ref={dropdownRef}>
            <button
                type="button"
                className="btn p-0 dropdown-toggle hide-arrow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="bx bx-dots-vertical-rounded"></i>
            </button>
            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} style={isOpen ? { position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(0px, 27px)', zIndex: 1000 } : {}}>
                {children}
            </div>
        </div>
    );
};

const DataTable = ({ columns, data, title, actions, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{title}</h5>
                <div className="d-flex gap-2">
                    <div className="input-group input-group-merge">
                        <span className="input-group-text" id="basic-addon-search31"><i className="bx bx-search"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search..."
                            aria-describedby="basic-addon-search31"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {actions}
                </div>
            </div>
            <div className="table-responsive text-nowrap" style={{ minHeight: '200px' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {filteredData.length > 0 ? (
                            filteredData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.id === 'actions' ? (
                                                <ActionDropdown>
                                                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onEdit && onEdit(row); }}>
                                                        <i className="bx bx-edit-alt me-1"></i> Edit
                                                    </a>
                                                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDelete && onDelete(row.id); }}>
                                                        <i className="bx bx-trash me-1"></i> Delete
                                                    </a>
                                                </ActionDropdown>
                                            ) : (
                                                col.render ? col.render(row) : row[col.accessor]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
