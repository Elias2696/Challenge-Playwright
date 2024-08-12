import { Page } from 'playwright';
import * as fs from 'fs-extra';
import * as path from 'path';


export class WikipediaPage {

    private readonly url = "https://en.wikipedia.org/wiki/";
    private readonly imagenLocator = "img[src*='_art.png']";
    private readonly extensionesValidas = ['.jpg', '.jpeg', '.png', '.svg'];
    private readonly nombreArtistaLocator= '.infobox-caption';
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    public getUrl(){return this.url;}

    public getExtensionesValidas(){return this.extensionesValidas;}

    public getNombreArtista(){return this.nombreArtistaLocator;}

    public async logearNombreArtista(){
        const artista = await this.page.locator(this.getNombreArtista()).textContent();
        console.log(`Dibujo : ${artista}\n`);
    }


    async extraerYDescargarImagen(page: Page): Promise<{ tamanioImagen: number, extension: string }> {
        // Extraer el valor del atributo `src`
        const imgElement = await page.waitForSelector(this.imagenLocator);
        
        if (!imgElement) {
            throw new Error('No se encontró el elemento de imagen con el selector especificado.');
        }
    
        const src = await imgElement.getAttribute('src');
    
        if (!src) {
            throw new Error('No se pudo obtener el atributo src de la imagen.');
        }
    
        const imageUrl = `https:${src}`; 
    
        // Extraer el nombre del archivo de la URL
        const imageName = path.basename(imageUrl);
        
        // Define la ruta de la carpeta y el archivo
        const folderPath = path.join(__dirname, '..', 'images');
        const filePath = path.join(folderPath, imageName);
    
        // Crea la carpeta si no existe
        await fs.ensureDir(folderPath);
    
        // Navega a la URL de la imagen y descarga el contenido
        const response = await page.goto(imageUrl, { waitUntil: 'networkidle' });
        if (response && response.ok()) {
            const body = await response.body();
            if (body) {
                // Escribe la imagen en el archivo
                await fs.writeFile(filePath, body);
    
                // Obtener la extensión y tamaño del archivo
                const extension = path.extname(filePath).toLowerCase();
                const tamanioImagen = (await fs.stat(filePath)).size;
    
                return { tamanioImagen, extension };
            } else {
                throw new Error('No se pudo obtener el contenido de la imagen.');
            }
        } else {
            throw new Error('No se pudo acceder a la URL de la imagen.');
        }
    }
        
}