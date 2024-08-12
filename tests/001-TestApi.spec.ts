import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { ApiService } from '../pages/apiService';
import { Helper } from '../utils/helper';

test.describe('Pruebas de API de Pokémon', async () => {

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


  datosPrueba.forEach(lineFromExcel => {
    test(`Debería obtener datos de Pokémon ${lineFromExcel.name}`, async () => {

      // Llamar al metodo y obtener el response, responseBody, el tiempo transcurrido y el abilities transformado a string para comparar con el excel
      const { response, responseBody, elapsedTime, abilitiesString } = await ApiService.probarPokemon(lineFromExcel.id);

      // Verificar que el codigo de estado de la respuesta sea 200
      expect(response.status()).toBe(200);

      // Verificar que el tiempo transcurrido sea menor a 10 segundos
      expect(elapsedTime).toBeLessThan(10000);

      // Verificar que el id y nombre coincidan con los datos de prueba
      expect(responseBody.id).toBe(lineFromExcel.id);
      expect(responseBody.name).toBe(lineFromExcel.name);

      // Verificar que las habilidades coincidan con las esperadas
      expect(abilitiesString).toBe(lineFromExcel.abilities);

      console.log(`Test finalizado el: ${new Date().toLocaleString()}\n`);
    });
  });

});