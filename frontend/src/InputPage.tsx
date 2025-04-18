// frontend/src/InputPage.tsx
import React, { useState } from 'react';
import { parseRawData, ParsedField } from './utils/parser';

export const InputPage: React.FC = () => {
    const [id, setId] = useState('');
    const [rawData, setRawData] = useState('');
    const [parsed, setParsed] = useState<ParsedField[]>([]);
    const [additionalForms, setAdditionalForms] = useState<Record<string, string>>({});

    const handleSubmit = () => {
        const additional: { title: string; data: Record<string, string> }[] = Object.entries(additionalForms).map(
            ([key, value]) => ({
                title: key,
                data: parseRawData(value)
            })
        );

        const fullPayload = {
            id,
            rawData,
            parsedData: parsed.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as Record<string, string>),
            additional,
        };

        fetch('http://localhost:3000/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullPayload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Сервер принял данные:', data);
                alert('Данные успешно сохранены!');
            })
            .catch((err) => {
                console.error('Ошибка при отправке:', err);
                alert('Ошибка при сохранении!');
            });
    };

    const getShowFields = () =>
        parsed.filter((field) => field.value.toLowerCase() === 'показать');

    const handleAdditionalChange = (key: string, value: string) => {
        setAdditionalForms((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Добавление отчёта</h1>

            <div style={{ marginBottom: '1rem' }}>
                <label>ID данных:</label>
                <br />
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>Основные данные (вставьте блок):</label>
                <br />
                <textarea
                    value={rawData}
                    onChange={(e) => {
                        const text = e.target.value;
                        setRawData(text);
                        const fields = parseRawData(text);
                        setParsed(fields);
                    }}
                    rows={20}
                    cols={80}
                />
            </div>

            {parsed.length > 0 && (
                <>
                    <h2>Распарсенные данные</h2>
                    <ul>
                        {parsed.map((field, index) => (
                            <li key={index}>
                                <strong>{field.key}</strong>: {field.value}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {getShowFields().map((field, index) => (
                <div key={index} style={{ marginTop: '1rem' }}>
                    <label>Дополнительная форма: {field.key}</label>
                    <br />
                    <textarea
                        rows={10}
                        cols={60}
                        placeholder={`Введите данные для "${field.key}"`}
                        value={additionalForms[field.key] || ''}
                        onChange={(e) => handleAdditionalChange(field.key, e.target.value)}
                    />
                </div>
            ))}

            <div style={{ marginTop: '2rem' }}>
                <button onClick={handleSubmit}>Сохранить</button>
            </div>
        </div>
    );
};