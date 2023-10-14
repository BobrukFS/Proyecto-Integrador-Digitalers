

const listaCarrito = document.querySelector('.lista-carrito')
export function aparecerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('.imagen-card').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
    }
        insertarAlCarrito(infoProducto)
    
}



function carritoLS() {
    let productosLocalStorage;
    
//comprobar si hay productos:
if ( localStorage.getItem('totalProductos') === null ) {
    productosLocalStorage = []
    } else {
    productosLocalStorage = JSON.parse(localStorage.getItem('totalProductos'))
    }
    return productosLocalStorage;

}


function insertarAlCarrito(producto) {
    guardarProductosEnLS(producto);
}


function guardarProductosEnLS(producto) {
    let totalProductos;
    totalProductos = carritoLS();
    totalProductos.push(producto)
    localStorage.setItem('totalProductos', JSON.stringify(totalProductos))

}




export function leerLocalStorage() {
    let productosLocalStorage;
    productosLocalStorage = carritoLS()
    productosLocalStorage.forEach(function(producto) {
        const fila = document.createElement('tr')
        fila.innerHTML = 
        `
        
            <td class="d-flex align-items-center gap-2">
             <img class="img-carrito" src="${producto.imagen}" alt="${producto.titulo}" >
             <p class="fw-bold paragraph-font mb-0">${producto.titulo}</p>
             <p class="paragraph-font mb-0">$ ${producto.precio}</p>
            </td>
      
        <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
        </td>
      
        `
        listaCarrito.appendChild(fila)
    })
}



export function eliminarProducto(e) {
    e.preventDefault()
    let producto, productoID
    if (e.target.classList.contains('borrar-producto')) {     // clase que le puse al icono "x"

    producto = e.target.parentElement.parentElement;
    console.log(producto);   // producto entero
    productoID = producto.querySelector('a').getAttribute('data-id')
    console.log(productoID);
    producto.remove()

    eliminarProductoDelLS(productoID)
    calcularTotal()
    }
}

// eliminar prod por ID del LS:

function eliminarProductoDelLS(productoID) {
    let productosLS
    productosLS = carritoLS()
    //comparamos ID del producto a eliminar y el que esta en el LS:
    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === productoID)  // prod del LS / prod que me llega al apretar "x"
        productosLS.splice(index, 1)
    })
    localStorage.setItem('totalProductos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e) {
    e.preventDefault()
    if(listaCarrito.firstChild){
        while(listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild)
        }
        vaciarLocalStorage()
        calcularTotal();
    }else{
        window.alert("No hay productos en el carrito")
    }
   

} 

function vaciarLocalStorage() {
    window.localStorage.clear()
}

export function calcularTotal() {
    let productosLS;
    let total = 0;
    productosLS = carritoLS();

    productosLS.forEach( productoLS => {
     
        total = total + parseInt(productoLS.precio);
    })

     const precioTotal = document.getElementsByClassName("total-carrito"); 
        precioTotal[0].textContent = `$ ${total}`;
  
   
}

