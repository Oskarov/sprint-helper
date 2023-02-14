export const generateRandomString = (length: number = 5): string => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
}
