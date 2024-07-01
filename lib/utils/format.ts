export const formatDollar = (amount: number) => {
    // Ensure the input is a number
    if (isNaN(amount)) {
        return 'Invalid number';
    }
    return `$${Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}