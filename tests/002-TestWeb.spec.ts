import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { WikipediaPage } from '../pages/wikipediaPage';
import { Helper } from '../utils/helper';


test.describe('Pruebas Web de datos de Pokémon', async () => {

  dotenv.config();

  const datosPrueba = await Helper.leerExcel("data/Datos-pruebas.xlsx");
  const claveSecreta = process.env.CLAVE_SECRETA;


  test.beforeAll(async () => {
    if (!claveSecreta) {
    throw new Error('CLAVE_SECRETA no está definida en las variables de entorno.');
    }
  });

  test.beforeEach(async () => {
    const claveEncriptada = Helper.encriptarClave(claveSecreta!);
    console.log(`Clave secreta encriptada: ${claveEncriptada}`);
  });


  datosPrueba.forEach(({ name }) => {
    test(`Validar informacion del pokemon: ${name}`, async ({ page }, testInfo) => {

      const wikiPage = new WikipediaPage(page);

      //Url dinamica, ingresa el nombre del pokemon segun la fila del excel.
      const url = `${wikiPage.getUrl()}${name}`;

      await page.goto(url);

      const pageTitle = await page.title();

      // Adjuntar screenshots de la wikki de cada Pokemon al reporte
      await testInfo.attach("Wikki", {body:await page.screenshot(), contentType: "image/png"});

      //Validar titulo.
      expect(pageTitle.toLowerCase()).toBe(`${name} - Wikipedia`.toLowerCase());

      // Extraer y logear el nombre del artista
      await wikiPage.logearNombreArtista();
  
      // Descargar la imagen y obtiene el tamaño del archivo y la extension
      const { tamanioImagen, extension } = await wikiPage.extraerYDescargarImagen(page);
        
      // Realiza las validaciones de la imagen descargada
      const ExtensionValida = wikiPage.getExtensionesValidas().includes(extension);

      expect(ExtensionValida).toBe(true);
      expect(tamanioImagen).toBeLessThan(500000);
    });
  });

});