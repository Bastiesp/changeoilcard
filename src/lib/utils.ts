import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/** --------------------------------
 * LocalStorage Helpers
 * -------------------------------- */
export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

/** --------------------------------
 * Date / Oil Change Helpers
 * -------------------------------- */

/**
 * Formatea la fecha actual a DD/MM/YYYY
 */
export function formatDate(): string {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Calcula el próximo cambio de aceite en km
 * @param currentKm - kilometraje actual
 */
export function calculateNextOilChange(currentKm: number): number {
  const INTERVAL_KM = 5000; // cada 5000 km
  return currentKm + INTERVAL_KM;
}

export async function generatePDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`No se encontró el elemento con id "${elementId}"`);

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}
