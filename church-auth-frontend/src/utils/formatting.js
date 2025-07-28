export function formatCurrency(amount, currencyCode) {
    // Return a default value if amount is not a valid number
    if (isNaN(amount) || amount === null) {
        amount = 0;
    }

    try {
        return new Intl.NumberFormat('en-US', { // You can adjust the locale
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (error) {
        // Fallback for invalid currency code
        console.error("Invalid currency code provided:", currencyCode);
        return `$${amount.toFixed(2)}`; // Simple fallback
    }
}