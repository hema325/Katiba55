export function fillDefaultObjectPropertiesWithNull(obj: any): any {
    const result = {} as any;
    for (const key in obj) {
        if (typeof obj[key] !== "boolean") {
            result[key] = obj[key] ? obj[key] : null;
        }
        else {
            result[key] = obj[key];
        }
    }
    return result;
}