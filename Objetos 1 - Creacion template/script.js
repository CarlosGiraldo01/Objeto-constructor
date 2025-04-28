function Carro(marca, modelo, anio, color) {
this.marca = marca;
this.modelo = modelo;
this.anio = anio;
this.color = color;
}


let listaCarros = [];

const form = document.getElementById('carForm');
const carsContainer = document.getElementById('carsContainer');

function renderCarList() {
    carsContainer.innerHTML = '';
    
    if (listaCarros.length === 0) {
        carsContainer.innerHTML = '<p class="no-cars">No hay carros en la lista</p>';
        return;
    }
    
    listaCarros.forEach((carro, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        carCard.innerHTML = `
            <div class="car-info">
                <h3>${carro.marca} ${carro.modelo}</h3>
                <p>Año: ${carro.anio}</p>
                <p>Color: ${carro.color}</p>
            </div>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
        
        carsContainer.appendChild(carCard);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            eliminarCarro(index);
        });
    });
}

function agregarCarro(event) {
    event.preventDefault();

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anio = parseInt(document.getElementById('anio').value);
    const color = document.getElementById('color').value;

    const nuevoCarro = new Carro(marca, modelo, anio, color);

    listaCarros.push(nuevoCarro);

    renderCarList();
}

function eliminarCarro(index) {
    listaCarros.splice(index)
   renderCarList()
}

form.addEventListener('submit', agregarCarro);

listaCarros.push(new Carro('Toyota', 'Corolla', 2022, 'Rojo'));
listaCarros.push(new Carro('Honda', 'Civic', 2021, 'Azul'));
listaCarros.push(new Carro('Chevrolet', 'Spark', 2020, 'Negro'));

renderCarList()