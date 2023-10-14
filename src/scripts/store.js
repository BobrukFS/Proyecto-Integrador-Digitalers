import { aparecerDatosProducto } from "./checkout"



export function comprarProducto(e) {
    e.preventDefault();

    //condicion para que solo se sume al clickear en "comprar"
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement.parentElement;
        
   
      
        aparecerDatosProducto(producto)
    }
}