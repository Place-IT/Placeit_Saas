export default function getYear(dateString) {
    // Convert date string to Date object
    const dateObj = new Date(dateString);
    // Get month from Date object
    const month = dateObj.getMonth() + 1;
    // Calculate year based on month
    if (month <= 6) {
        const year = `${dateObj.getFullYear() - 1}-${dateObj.getFullYear()}`;
        return year;
    } else {
        const year = `${dateObj.getFullYear()}-${dateObj.getFullYear() + 1}`;
        return year;
    }
}