import { resolve } from 'node:path'

module.exports = {
    server: {
      port: 5500,
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
          input: {
              carrito: resolve('./src/pages/checkout.html'),
              contacto: resolve('./src/pages/contact.html'),
              // favoritos: resolve('./pages/favoritos.hml'),
              nosotros: resolve('./src/pages/about.html'),
              productos: resolve('./src/pages/store.html'),

              index: resolve('index.html')
          }
      }
  }
  };