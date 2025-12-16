export function cn(...classes: (string | undefined | false | null )[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
    
export function formatDate(date: Date, locale = "en-US"): string {
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.s@]+$/;
    return re.test(email.toLowerCase());
}
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}