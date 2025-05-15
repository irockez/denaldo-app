import React, { useState } from 'react';

interface ParsedRow {
    id: string;
    content: Record<string, any>;
    created_at: string;
}

interface Props {
    data: ParsedRow[];
}

export const ParsedTable: React.FC<Props> = ({ data }) => {
    const [modalData, setModalData] = useState<Record<string, string> | null>(null);
    const [modalTitle, setModalTitle] = useState<string>('');

    const handleShowDetails = (title: string, obj: Record<string, string>) => {
        setModalTitle(title);
        setModalData(obj);
    };

    const closeModal = () => {
        setModalData(null);
        setModalTitle('');
    };

    if (!data || data.length === 0) return <p>Нет данных для отображения</p>;

    const columns = Object.keys(data[0].content);

    return (
        <div>
            <table className="table-auto border border-collapse w-full text-sm">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col} className="border p-2 bg-gray-100">{col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id} className="border-b">
                        {columns.map((col) => {
                            const value = row.content[col];
                            if (typeof value === 'object' && value !== null) {
                                return (
                                    <td key={col} className="border p-2 text-center">
                                        <button
                                            className="text-blue-600 underline"
                                            onClick={() => handleShowDetails(col, value)}
                                        >
                                            Показать
                                        </button>
                                    </td>
                                );
                            } else {
                                return <td key={col} className="border p-2">{value}</td>;
                            }
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Модальное окно */}
            {modalData && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4">{modalTitle}</h2>
                        <table className="w-full border text-sm">
                            <thead>
                            <tr>
                                <th className="border p-2 bg-gray-100">Ключ</th>
                                <th className="border p-2 bg-gray-100">Значение</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(modalData).map(([key, val]) => (
                                <tr key={key}>
                                    <td className="border p-2">{key}</td>
                                    <td className="border p-2">{val}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button
                            className="absolute top-2 right-3 text-gray-500 hover:text-black"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};