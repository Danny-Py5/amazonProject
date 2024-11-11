export function formatCurrency(priceCents){
    return typeof priceCents !== "string" ? (Math.round(priceCents) / 100).toFixed(2) : NaN;
}