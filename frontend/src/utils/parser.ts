// frontend/src/utils/parser.ts

// Интерфейс для описания распарсенных данных
export interface ParsedField {
    key: string; // Название поля
    value: string; // Значение поля
}

// Функция для преобразования даты в формат YYYY-MM-DD HH:MM:SS
function formatDate(date: string): string {
    if (!date) return '';

    const [dayMonthYear, time] = date.split(' ');
    if (!dayMonthYear || !time) return date;

    const [day, month, year] = dayMonthYear.split('.');
    const [hours, minutes, seconds] = time.split(':');

    if (!day || !month || !year || !hours || !minutes || !seconds) {
        return date;
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Основная функция парсинга текста
export function parseRawData(text: string): ParsedField[] {
    const lines = text.split('\n').map(line => line.trim());
    const fields: ParsedField[] = [];

    for (let i = 0; i < lines.length; i++) {
        const current = lines[i];
        const next = lines[i + 1];
        const next2 = lines[i + 2];

        if (!current) continue; // Пропуск пустых строк

        // Логика определения пары "ключ - значение"
        if (next !== undefined && next !== '') {
            fields.push({ key: current, value: next });
            i += 1;
        } else if (next === '' && next2 !== undefined && next2 !== '') {
            fields.push({ key: current, value: next2 });
            i += 2;
        } else {
            fields.push({ key: current, value: '' });
        }
    }

    // Обработка специальных полей
    fields.forEach((field) => {
        if (field.key === 'Начало расчета' || field.key === 'Конец расчета') {
            field.value = formatDate(field.value);
        }
    });

    return fields;
}