import { read, utils } from 'xlsx';
import type { FileRow } from '@/shared/files/csv/types';

/**
 * Converts an Excel/CSV file to JSON.
 * @param file File or Blob type file
 */
export default async function parseExcel(file: File | Blob): Promise<[FileRow[], string[]]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });

        const allData: FileRow[] = [];
        let headers: string[] = [];

        const sheetsToParse = workbook.SheetNames;

        sheetsToParse.forEach((sheetName, idx) => {
          const worksheet = workbook.Sheets[sheetName];
          if (!worksheet) return;

          if (idx === 0) {
            const rows = utils.sheet_to_json<string[]>(worksheet, { header: 1 });
            headers = (rows[0] || []).map((h) => String(h).trim());
          }

          const sheetData = utils.sheet_to_json<FileRow>(
            worksheet,
            { defval: null },
          );
          allData.push(...sheetData);
        });

        resolve([allData, headers]);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}
