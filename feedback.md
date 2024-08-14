1. Existe un READ.md y un README.md, donde la única diferencia es el título.
2. No era necesario pushear las imágenes.
3. Se instaló `axios` por más que no sea necesario.
4. ¿Por qué se decidió ejecutar las pruebas en secuencia en vez de en paralelo?
5. `probarPokemon`: la función no realiza lo que su nombre sugiere, sino que lo que realiza es el GET a la API. Se hace una doble validación del status, una dentro de esta función con un if, y dentro del test con un assertion.
6. `leerExcel`: es una función asíncrona por más que no haya promesas dentro.
7. El assertion de la imagen es case sensitive.
8. Mejora: hacer uso fixture para poder usar una baseUrl para la web y otra para API. Ver: [https://playwright.dev/docs/test-fixtures#fixtures-options](https://playwright.dev/docs/test-fixtures#fixtures-options). También, con el uso de fixture se podría eliminar código duplicado entre ambos archivos de test, como ser la lectura del excel y el console.log con el hash al principio, o bien el console log con la hora de finalización.
9. Mejora: hacer uso de annotations [https://playwright.dev/docs/test-annotations#tag-tests](https://playwright.dev/docs/test-annotations#tag-tests).
