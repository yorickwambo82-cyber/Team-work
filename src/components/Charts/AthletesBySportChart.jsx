import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AthletesBySportChart = ({ athletes, sports }) => {
    const data = useMemo(() => {
        if (!athletes || !sports) return [];

        // Initialize counts for each sport
        const counts = {};
        sports.forEach(sport => {
            counts[sport.id] = {
                name: sport.name,
                count: 0
            };
        });

        // Count athletes
        athletes.forEach(athlete => {
            if (athlete.enrolledsports && Array.isArray(athlete.enrolledsports)) {
                athlete.enrolledsports.forEach(sportId => {
                    if (counts[sportId]) {
                        counts[sportId].count++;
                    }
                });
            }
        });

        return Object.values(counts);
    }, [athletes, sports]);

    return (
        <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title m-0 me-2">Athletes by Sport</h5>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#696cff" name="Athletes" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AthletesBySportChart;
