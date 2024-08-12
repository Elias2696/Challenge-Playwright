import * as XLSX from 'xlsx';
import crypto from 'crypto';

export class Helper {


    static async leerExcel(filePath: string): Promise<any[]> {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
    
            // Convertir la hoja en JSON, incluyendo la cabecera
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
            // Elimina la primera fila (cabecera)
            data.shift();
    
            return data.map(row => {
                const rowData = row as any[]; // Asumo que `row` es un array
                return {
                    id: rowData[0], // Asumiendo que la columna 1 es 'id'
                    name: rowData[1], // Asumiendo que la columna 2 es 'name'
                    abilities: rowData[2] // Asumiendo que la columna 3 es 'abilities'
                };
            });
        } catch (error) {
            console.error('Error leyendo el archivo XLSX:', error);
            return [];
        }
    }

    // Funcion para encriptar la clave secreta
    static encriptarClave(clave : string): string {
    return crypto.createHash('sha256').update(clave).digest('hex');
    }     

}
