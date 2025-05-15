import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ParsedTable } from './utils/parsedTable';

export const DisplayPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/data');
                const result = await response.json();
                console.log("Полученные данные:", result);
                setData(result);
            } catch (err) {
                console.error('Ошибка при получении данных:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Страница с данными
            </h1>

            <div style={{ marginBottom: '1.5rem' }}>
                <Link to="/input" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                    ← Вернуться к вводу
                </Link>
            </div>

            {data.length > 0 ? (
                <ParsedTable data={data} />
            ) : (
                <p>Нет данных для отображения.</p>
            )}
        </div>
    );
};