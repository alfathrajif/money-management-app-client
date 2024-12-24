import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currencyCode: string,
  locale = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function formatNumber(value: string) {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, "");

  return numericValue.replace(/(\d{3})(?=\d)/g, "$1.");
}

export function cleanedAmount(amount: string) {
  return parseFloat(amount.replace(/\./g, ""));
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  // Mendapatkan nilai bulan, hari, dan tahun
  const month = date.getMonth() + 1; // Bulan (0-11), tambahkan 1
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Ambil dua digit terakhir tahun

  // Mendapatkan nama hari dalam seminggu
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = daysOfWeek[date.getDay()];

  // Memformat ke "MM/DD/YY (Day)"
  return `${month}/${day}/${year} (${dayName})`;
}

export function getRandomAmberHSL() {
  const hue = Math.floor(Math.random() * (60 - 30) + 30); // hue antara 30 dan 60 untuk tema amber
  const saturation = Math.floor(Math.random() * 100); // saturation antara 0 dan 100%
  const lightness = Math.floor(Math.random() * 100); // lightness antara 0 dan 100%
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}
