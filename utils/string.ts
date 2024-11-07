export function turnStringNice(str: string) {
    return str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function filterString(str: string) {
    return str.replace(/[^a-zA-Z ]/g, "");
}

export function turnDateNice(date: string) {
    return new Date(date).toLocaleDateString();
}