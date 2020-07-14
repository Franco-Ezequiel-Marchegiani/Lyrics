import {
     API
} from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
     e.preventDefault();

     // Obtener datos del formulario
     const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

     if (artista === '' || cancion === '') {
          // Muestra error cuando no se llenan los campos
          UI.divMensajes.innerHTML = 'Error... Todos los campos se deben rellenar';
          UI.divMensajes.classList.add('error');
          setTimeout(() => {
               UI.divMensajes.innerHTML = '';
               UI.divMensajes.classList.remove('error');
          }, 3000);
     } else {
          // Realiza consulta cuando el formulario está completo
          const api = new API(artista, cancion);
          api.consultarAPI()
               .then(data => {
                    if (data.respuesta.lyrics) {
                         // La canción SÍ existe
                         const letra = data.respuesta.lyrics;
                         UI.divResultado.textContent = letra;

                    } else {
                         // La canción NO existe
                         UI.divMensajes.innerHTML = 'La canción no existe, prueba con otra búsqueda';
                         UI.divMensajes.classList.add('error');
                         setTimeout(() => {
                              UI.divMensajes.innerHTML = '';
                              UI.divMensajes.classList.remove('error');
                              UI.formularioBuscar.reset();
                         }, 3000);
                    }
               });
     }
})