import { users } from '../utils/helpers';
import DataTable from '../components/DataTable';

const Users = () => {

    const columns = [
        { header: 'ID', accessor: 'id' },
        {
            header: 'User',
            accessor: 'username',
            render: (row) => (
                <div className="d-flex justify-content-start align-items-center user-name">
                    <div className="avatar-wrapper">
                        <div className="avatar me-2">
                            <img src={`https://ui-avatars.com/api/?name=${row.username}&background=random`} alt className="rounded-circle" />
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="text-truncate text-body fw-semibold">{row.username}</span>
                        <small className="text-muted">{row.role}</small>
                    </div>
                </div>
            )
        },
        { header: 'Role', accessor: 'role', render: (row) => <span className="badge bg-label-info">{row.role}</span> },
        { header: 'Language', accessor: 'language' },
        { header: 'Theme', accessor: 'defaultTheme' },
        { header: 'Actions', id: 'actions' }
    ];

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">System /</span> Users</h4>

            <DataTable
                title="Users List"
                data={users}
                columns={columns}
                actions={<button className="btn btn-primary btn-sm">Add User</button>}
            />
        </div>
    );
};

export default Users;
