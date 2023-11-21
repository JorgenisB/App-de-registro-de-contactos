const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
  try {
 
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    const contactos = response.data;

    
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario y Lista de Contactos</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <style>
                

          .custom-container {
            display: flex;
            justify-content: space-between;
          }

          .custom-form {
            width: 40%; /* Ajusta el ancho del formulario según tus necesidades */
          }

          .custom-list {
            width: 50%;
            overflow-y: auto;
            max-height: 500px;
            background-color: #f2f2f2; /* Cambia este valor al color que prefieras */
          }

          
        </style>
      </head>
      <body>
        <div class="container mt-3 custom-container">
          <div class="custom-form">
            <h2>Formulario de Contacto</h2>
            <form action="/" method="post">
              <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
              </div>
              <div class="form-group">
                <label for="telefono">Teléfono:</label>
                <input type="text" class="form-control" id="telefono" name="telefono" required>
              </div>
              <button type="submit" class="btn btn-primary">Agregar Contacto</button>
            </form>
          </div>
          <div class="custom-list">
            <hr>
            <h2>Listado de Contactos</h2>
            <div id="contactos-list">
              <ul>
                ${contactos.map(contacto => `<li>${contacto.nombre}: ${contacto.telefono}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error al obtener la lista de contactos');
  }
});



app.post('/', async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    

    await axios.post('http://www.raydelto.org/agenda.php', { nombre, telefono });

  
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error al almacenar el contacto');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
