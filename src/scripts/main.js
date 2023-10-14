
import { 
  calcularTotal,
  eliminarProducto, 
  leerLocalStorage,
  vaciarCarrito
} from './checkout';

import {  comprarProducto } from './store';

const btn = document.getElementsByClassName('btn1');

const abrirMenu = () =>{
 
    const nav = document.getElementsByClassName("header__nav");
    if(btn[0].classList.contains("not-active")){
      btn[0].classList.replace("not-active", "active");
      nav[0].classList.toggle("desplegado");
    }else if(btn[0].classList.contains("active")){
      btn[0].classList.replace("active", "not-active");
      nav[0].classList.toggle("desplegado");
    }
  }

btn[0].addEventListener("click", ()=>{
    abrirMenu();
});

// Carrito

const listaDeProductos = document.getElementById('lista-productos');










function cargarEventos() { 
  const ruta = String(location.href)

  if(ruta.includes('store.html')) {
      esIndex()
  } else if (ruta.includes('checkout.html')) {
      esCarrito()
  }
}

cargarEventos()


  function esIndex() {

     
      listaDeProductos.addEventListener('click', (e) => comprarProducto(e)) 
  

  }
 

  function esCarrito() {
    const vaciarCarritoBtn = document.querySelector(".vaciar-carrito"); 
    const listaCarritoCompra = document.querySelector('.lista-carrito')
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
      vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
      listaCarritoCompra.addEventListener('click', e => eliminarProducto(e))
      calcularTotal()

  }


//Tema

const btnTheme = document.querySelector(".btn-theme");
const lightBg = document.getElementsByClassName("theme-change");

// Función para cambiar el tema
function cambiarTema() {
  if (btnTheme.classList.contains("light-theme")) {
    for (let i = 0; i < lightBg.length; i++) {
      lightBg[i].classList.replace("light-bg", "dark-bg");
      lightBg[i].classList.add("dark-bg");
      lightBg[i].classList.add("text-white");
      btnTheme.classList.replace("light-theme", "dark-theme");
      lightBg[i].classList.replace("border-secondary", "border-white");
    }
    // Almacenar el estado del tema en una cookie con un valor "dark"
    document.cookie = "theme=dark; path=/";
  } else {
    for (let i = 0; i < lightBg.length; i++) {
      lightBg[i].classList.replace("dark-bg", "light-bg");
      lightBg[i].classList.remove("dark-bg");
      btnTheme.classList.replace("dark-theme", "light-theme");
      lightBg[i].classList.remove("text-white");
      lightBg[i].classList.replace("border-white", "border-secondary");
    }
    // Almacenar el estado del tema en una cookie con un valor "light"
    document.cookie = "theme=light; path=/";
  }
}

// Comprobar el estado del tema almacenado en la cookie
function comprobarTema() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("theme=")) {
      const tema = cookie.substring("theme=".length);
      if (tema === "dark") {
        cambiarTema();
      }
      break;
    }
  }
}

// Verificar el tema al cargar la página
comprobarTema();


btnTheme.addEventListener("click", cambiarTema);