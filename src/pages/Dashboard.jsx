import { useState, useEffect } from 'react';
import { athletes, sports, users } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import AthletesBySportChart from '../components/Charts/AthletesBySportChart';
import AthletesByGenderChart from '../components/Charts/AthletesByGenderChart';

const Dashboard = () => {
    const { t } = useLanguage();
    const [athletesData, setAthletesData] = useState(athletes);
    const [sportsData, setSportsData] = useState(sports);

    useEffect(() => {
        const savedAthletes = localStorage.getItem('sdb_athletes');
        if (savedAthletes) {
            try {
                setAthletesData(JSON.parse(savedAthletes));
            } catch (e) { console.error("Error parsing saved athletes", e); }
        }

        const savedSports = localStorage.getItem('sdb_sports');
        if (savedSports) {
            try {
                setSportsData(JSON.parse(savedSports));
            } catch (e) { console.error("Error parsing saved sports", e); }
        }
    }, []);

    const stats = [
        { label: t('dashboard.totalAthletes'), value: athletesData.length, icon: 'bx-user', color: 'primary' },
        { label: t('dashboard.totalSports'), value: sportsData.length, icon: 'bx-football', color: 'success' },
        { label: t('dashboard.totalUsers'), value: users.length, icon: 'bx-group', color: 'info' },
    ];

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <div className="col-lg-12 mb-4 order-0">
                    <div className="card">
                        <div className="d-flex align-items-end row">
                            <div className="col-sm-12">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{t('dashboard.welcome')}</h5>
                                    <p className="mb-0">
                                        Welcome to the ISTAG Sports Management System. Here you can manage athletes, sports, and academic information.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {stats.map((stat, index) => (
                    <div className="col-lg-4 col-md-4 col-6 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex align-items-start justify-content-between">
                                    <div className={`avatar flex-shrink-0 bg-label-${stat.color} p-1`}>
                                        <i className={`bx ${stat.icon} fs-3`}></i>
                                    </div>
                                    <div className="dropdown">
                                        <button
                                            className="btn p-0"
                                            type="button"
                                            id="cardOpt3"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                            <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                            <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                                        </div>
                                    </div>
                                </div>
                                <span className="fw-semibold d-block mb-1">{stat.label}</span>
                                <h3 className="card-title mb-2">{stat.value}</h3>
                                <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                {/* Athletes by Sport Chart */}
                <div className="col-md-6 col-lg-6 mb-4">
                    <AthletesBySportChart athletes={athletesData} sports={sportsData} />
                </div>

                {/* Gender Distribution Chart */}
                <div className="col-md-6 col-lg-6 mb-4">
                    <AthletesByGenderChart athletes={athletesData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
