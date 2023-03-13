var map = L.map('mapid').setView([36.7201600, -4.4203400], 15);

    // crea una capa de OpenStreetMap y agrégala al mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(obj => {
      var x = obj.properties.x;
      var y = obj.properties.y;

      var table = document.getElementById('listado');
      var row = table.insertRow(-1);
      
      var celdaInfo = row.insertCell(0);
      var informacion = '<b class="display-1">' + obj.properties.nombre + '</b><br/>' +
                         + obj.properties.horario + '<br/>' +
                         '<span class="bg-dark">' + obj.properties.direccion + '</span>';
      celdaInfo.innerHTML = informacion;

      var marker = L.marker([x, y]).addTo(map);

      var label = '<b>' + obj.properties.nombre + '</b><br/>' + obj.properties.direccion;
      marker.bindPopup(label);

      row.addEventListener('click', function () {
        marker.openPopup();
        map.setView(marker.getLatLng(), 15); 
      });
    });
    // Agrega clases Bootstrap a la tabla
    document.getElementById('listado').classList.add('table-bordered', 'mb-3');
  });
    function listado(nombre, direccion) {
      var table = document.getElementById('listado');

      var row = table.insertRow(-1);

      var celdaDireccion = row.insertCell(1);
      var celdaHorario = row.insertCell(2);
      var celdaNombre = row.insertCelll(0);
      


      celdaNombre.innerHTML = nombre;
      celdaDireccion.innerHTML = direccion;
    }
