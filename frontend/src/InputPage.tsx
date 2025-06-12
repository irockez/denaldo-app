import React, { useState } from 'react';
import { parseRawData, ParsedField } from './utils/parser';
import { Link } from 'react-router-dom';


export const InputPage: React.FC = () => {
    const [id, setId] = useState('');
    const [rawData, setRawData] = useState('');
    const [parsed, setParsed] = useState<ParsedField[]>([]);
    const [additionalForms, setAdditionalForms] = useState<Record<string, string>>({});


    const handleSubmit = () => {
        // Получаем поля с 'Показать'
        const showFields = getShowFields();

        // Формируем финальный объект для отправки
        const fullPayload = {
            id, // Добавляем id в parsedData
            parsedData: {
                ...parsed.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as Record<string, any>),
                id, // Не забываем добавить id в parsedData
                ...showFields.reduce((acc, field) => {
                    const raw = additionalForms[field.key];

                    // Проверяем, если форма пуста
                    if (!raw || raw.trim() === '') {
                        acc[field.key] = ''; // Если пусто, передаем пустую строку
                    } else {
                        const parsedAdditional = parseRawData(raw);

                        // Если парсер возвращает массив, мы преобразуем его в объект
                        if (Array.isArray(parsedAdditional)) {
                            const parsedObject = parsedAdditional.reduce((obj, item) => {
                                if (item.key && item.value !== undefined) {
                                    obj[item.key] = item.value;
                                }
                                return obj;
                            }, {} as Record<string, any>);
                            acc[field.key] = parsedObject;
                        } else {
                            acc[field.key] = parsedAdditional;
                        }
                    }

                    return acc;
                }, {} as Record<string, any>),
            },
        };

        // Отправляем данные
        console.log("📦 Финальный объект перед отправкой на сервер:", fullPayload);

        fetch('http://localhost:3000/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullPayload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('✅ Сервер принял данные:', data);
                alert('Данные успешно сохранены!');
            })
            .catch((err) => {
                console.error('❌ Ошибка при отправке:', err);
                alert('Ошибка при сохранении!');
            });
    };

    // Фильтруем поля с "Показать"
    const getShowFields = () =>
        parsed.filter((field) => field.value.toLowerCase() === 'показать');

    // Обрабатываем изменения в доп. формах
    const handleAdditionalChange = (key: string, value: string) => {
        setAdditionalForms((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div style={{padding: '2rem'}}>
            <h1>Добавление результатов бектеста</h1>

            <div style={{marginBottom: '1rem'}}>
                <label>ID данных:</label>
                <br/>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    style={{width: '300px'}}
                />
            </div>

            <div style={{marginBottom: '1rem'}}>
                <label>Основные данные (вставьте блок):</label>
                <br/>
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
                <div key={index} style={{marginTop: '1rem'}}>
                    <label>Дополнительная форма: {field.key}</label>
                    <br/>
                    <textarea
                        rows={10}
                        cols={60}
                        placeholder={`Введите данные для "${field.key}"`}
                        value={additionalForms[field.key] || ''}
                        onChange={(e) => handleAdditionalChange(field.key, e.target.value)}
                    />
                </div>
            ))}

            {/* Новые формы */}
            <div style={{marginTop: '1rem'}}>
                <label>Настройки:</label>
                <br/>
                <textarea
                    rows={6}
                    cols={60}
                    placeholder="Введите настройки..."
                    value={additionalForms['Настройки'] || ''}
                    onChange={(e) => handleAdditionalChange('Настройки', e.target.value)}
                />
            </div>
            <div style={{marginTop: '1rem'}}>
                <label>Мани менеджмент:</label>
                <br/>
                <textarea
                    rows={6}
                    cols={60}
                    placeholder="Введите правила мани менеджмента..."
                    value={additionalForms['Мани менеджмент'] || ''}
                    onChange={(e) => handleAdditionalChange('Мани менеджмент', e.target.value)}
                />
            </div>
            <div style={{marginTop: '1rem'}}>
                <label>Риск менеджмент:</label>
                <br/>
                <textarea
                    rows={6}
                    cols={60}
                    placeholder="Введите правила риск менеджмента..."
                    value={additionalForms['Риск менеджмент'] || ''}
                    onChange={(e) => handleAdditionalChange('Риск менеджмент', e.target.value)}
                />
            </div>

            <div style={{marginTop: '2rem'}}>
                <button onClick={handleSubmit}>Сохранить</button>
            </div>

            <div>
                {/* Кнопка для перехода на страницу с отображением данных */}
                <Link to="/display">Посмотреть данные</Link>
            </div>

        </div>
    );
};
