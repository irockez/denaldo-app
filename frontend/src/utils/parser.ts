// frontend/src/utils/parser.ts

export interface ParsedField {
    key: string;
    value: string;
}

// Функция для преобразования даты в нужный формат
function formatDate(date: string): string {
    if (!date) return '';

    const [dayMonthYear, time] = date.split(' '); // <-- через пробел теперь
    if (!dayMonthYear || !time) return date; // если не можем распарсить, возвращаем как есть

    const [day, month, year] = dayMonthYear.split('.');
    const [hours, minutes, seconds] = time.split(':');

    if (!day || !month || !year || !hours || !minutes || !seconds) {
        return date; // если что-то не так, возвращаем как есть
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function parseRawData(text: string): ParsedField[] {
    const lines = text.split('\n');
    const fields: ParsedField[] = [];

    for (let i = 0; i < lines.length; i++) {
        const current = lines[i].trim();
        const next = lines[i + 1]?.trim();
        const next2 = lines[i + 2]?.trim();

        if (current === '') continue;

        // Если следующая строка пуста, но после неё есть ещё одна — это значение
        if (lines[i + 1] === '' && next2 !== undefined) {
            fields.push({ key: current, value: next2 });
            i += 2; // пропускаем 2 строки
        }
        // Если следующая строка не пуста — это значение
        else if (next !== undefined && next !== '') {
            fields.push({ key: current, value: next });
            i += 1; // пропускаем следующую строку
        }
        // Если следующая строка и через одну пустые — значения нет
        else if (lines[i + 1] === '' && lines[i + 2] === '') {
            fields.push({ key: current, value: '' });
            i += 2;
        }
        // В остальных случаях — ключ без значения
        else {
            fields.push({ key: current, value: '' });
        }
    }

    // Преобразуем даты, если они есть
    fields.forEach((field) => {
        if (field.key === 'Начало расчета' || field.key === 'Конец расчета') {
            field.value = formatDate(field.value);
        }
    });

    return fields;
}