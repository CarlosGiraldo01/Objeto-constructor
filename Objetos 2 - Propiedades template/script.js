
function Carro(marca, modelo, anio, color, cantidad) {
if (marca.lenght > 20 || marca == "") {
    throw new Error
}
this.marca = marca;
this.modelo = modelo;
this.anio = anio;
this.color = color;
this.cantidad = cantidad || 1;
this.vender = function() {
    this.cantidad -= 1;
}
this.getInfo = function(){
    return `${this.marca} ${this.modelo} (${this.anio}) - Color: ${this.color}`;
};
this.aumentarCantidad = function(){
    this.cantidad +=1;
};
this.disminuirCantidad = function(){
    if (this.cantidad > 1) {
        this.cantidad -= 1;
    }
};
this.comprar = function() {
this.cantidad += 1;
}
}

let listaCarros = [];

const form = document.getElementById('carForm');
const carsContainer = document.getElementById('carsContainer');

function renderCarList(lista) {
    carsContainer.innerHTML = '';
    
    if (lista.length === 0) {
        carsContainer.innerHTML = '<p class="no-cars">No hay carros en la lista</p>';
        return;
    }
    
    lista.forEach((carro, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        carCard.innerHTML = `
            <div class="car-details">
                <h3>${carro.marca} ${carro.modelo}</h3>
                <p>Año: ${carro.anio}</p>
                <p>Color: ${carro.color}</p>
                <p>Cantidad: </p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                    <span class="quantity-value">${carro.cantidad}</span>
                    <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                </div>
            </div>
            <div class="car-actions">
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            </div>
        `;
        carsContainer.appendChild(carCard);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            eliminarCarro(index);
        });
    });

    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            lista[index].disminuirCantidad();
            renderCarList(listaCarros);
        });
    });
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            lista[index].vender();
            renderCarList(listaCarros);
        });
    });    
}

function agregarCarro(event) {
    event.preventDefault();
    
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anio = parseInt(document.getElementById('anio').value);
    const color = document.getElementById('color').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    const nuevoCarro = new Carro(marca, modelo, anio, color, cantidad);
    
    listaCarros.push(nuevoCarro);

    renderCarList(listaCarros);
    
    form.reset();
    document.getElementById('cantidad').value = 1;
}

function eliminarCarro(index) {
    listaCarros.splice(index, 1);
    renderCarList(listaCarros);
}

form.addEventListener('submit', agregarCarro);
listaCarros.push(new Carro('Toyota', 'Corolla', 2010, 'amarillo'))
listaCarros.push(new Carro('Honda', 'Civic', 2016, 'rojo'))
listaCarros.push(new Carro('Chevrolet', 'Cruze', 2000, 'gris'))

function buscarCarro(){
    busqueda = document.getElementById('searchInput').value

    if (busqueda == '') {
        renderCarList(listaCarros);
        return;
    };
    resultadoBuscado = listaCarros.filter(carro => carro.marca == busqueda   
    );
    renderCarList(resultadoBuscado);
}
function ultimoDeLaLista(){
    renderCarList(listaCarros.slice(-1));
}

document.getElementById('searchButton').addEventListener(
'click', function(){
    buscarCarro();
}
)
document.getElementById('searchInput').addEventListener(
    'keypress', function(event) {
        if (event.key === 'Enter') {
            buscarCarro();
        }
    }
)
console.log(listaCarros[0] instanceof Carro)

renderCarList(listaCarros);