import { request } from '@playwright/test';

interface PokemonApiResponse {
  response: any;
  responseBody: any;
  abilitiesString: string;
  elapsedTime: number;
}

export class ApiService {

  static async probarPokemon(idOrName: string): Promise<PokemonApiResponse> {

    try {
      
      const apiContext = await request.newContext();

      const baseURL = 'https://pokeapi.co/api/v2';

      const endpoint = `/pokemon/${idOrName}`;
      const fullUrl = `${baseURL}${endpoint}`;

      const startTime = new Date().getTime();

      // Realiza la solicitud GET
      const response = await apiContext.get(fullUrl);
      const endTime = new Date().getTime();

      const elapsedTime = endTime - startTime; // Tiempo transcurrido en milisegundos

      // Verifica que el codigo de estado sea 200
      if (response.status() !== 200) {
        const errorBody = await response.text();
        throw new Error(`Error en la solicitud. Código de estado: ${response.status()}. Respuesta: ${errorBody}`);
      }

      const responseBody = await response.json();

      const { abilities: responseAbilities } = responseBody;

      // Convertir las habilidades de la respuesta de la API a un string para comparar con el excel
      const abilitiesString = responseAbilities
        .map((abilityObj: any) => abilityObj.ability.name)
        .join(', ');

      return {
        response,
        responseBody,
        abilitiesString,
        elapsedTime
      };

    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }
}