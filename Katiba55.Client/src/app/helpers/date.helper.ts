export function formatInputDate(date: Date | null | undefined): string | null {
    if (!date) return null;

    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getArabicMonthName(month: number): string {
    const date = new Date(2000, month - 1);
    return date.toLocaleString('ar', { month: 'long' });
}