export function addDays(base: Date, n: number): Date {
    return new Date(base.getFullYear(), base.getMonth(), base.getDate() + n);
}

export function dayKey(d: Date): number {
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export function toIsoDate(d: Date): string {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

export function Slots(fromMinutes: number, toMinutes: number): string[] {
    const slots: string[] = [];
    for (let m = fromMinutes; m <= toMinutes; m += 30) {
        const hh = String(Math.floor(m / 60)).padStart(2, '0');
        const mm = String(m % 60).padStart(2, '0');
        slots.push(`${hh}.${mm}`);
    }
    return slots;
}

export function slotToMinutes(slot: string): number {
    const [hh, mm] = slot.split('.').map(Number);
    return hh * 60 + mm;
}

export function chunk<T>(items: T[], size: number): T[][] {
    const rows: T[][] = [];
    for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
    return rows;
}

export function Rp(value: number): string {
    return `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

