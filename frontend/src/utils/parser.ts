// frontend/src/utils/parser.ts

export interface ParsedField {
    key: string;
    value: string;
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

    return fields;
}