const fmt = (iso: string ) => 
    new Intl.DateTimeFormat("en", { month:"short", day:"numeric", timeZone:"UTC"}).format(new Date(iso));

export function formatDateRange(start: string, end:string):string{
    return `${fmt(start)} - ${fmt(end)}`;

}