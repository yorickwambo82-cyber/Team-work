import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const AthletesByGenderChart = ({ athletes }) => {
    const data = useMemo(() => {
        if (!athletes) return [];

        const counts = { Male: 0, Female: 0, Other: 0 };
        athletes.forEach(a => {
            if (counts[a.gender] !== undefined) {
                counts[a.gender]++;
            } else {
                counts['Other']++;
            }
        });

        return Object.keys(counts)
            .filter(key => counts[key] > 0)
            .map(key => ({ name: key, value: counts[key] }));
    }, [athletes]);

    return (
        <div className="card h-100">
            <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title m-0 me-2">Gender Distribution</h5>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AthletesByGenderChart;
