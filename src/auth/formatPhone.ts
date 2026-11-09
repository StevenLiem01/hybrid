export function phoneDigits(value: string): string{
    return value.replace(/\D/g, '');
}

export function formatPhone(raw: string): string{
    let digits = phoneDigits(raw);
    if(digits.startsWith('0')) digits = digits.slice(1);
    digits = digits.slice(0, 12);

    const parts = [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7, 12)];
    return parts.filter(Boolean).join(' ');
}