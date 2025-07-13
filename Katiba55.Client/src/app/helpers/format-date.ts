export function formatInputDate(date: Date | null | undefined): string | null {

    if (!date)
        return null;

    return new Date().toISOString().split('T')[0];
}