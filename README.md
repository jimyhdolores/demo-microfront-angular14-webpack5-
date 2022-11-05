# Demo Microfront Angular 14 con Module Federate

Este proyecto se usa la version 14.2.6 de Angular

# Creación de espacio de trabajo

Para esta demostración se usa un multi project de Angular, primero debes crear un espacio de trabajo, en este caso se llama **"demo-microfront-angular14"**

```console
ng new demo-microfront-angular14 --create-application=false
```

Luego crearemos los siguientes proyectos:

## mf-shell

Este proyecto sera nuestro **contenedor** de microfrontend

```console
ng generate application mf-shell --style=scss --routing=true
```

## mf-payment

```console
ng generate application mf-payment --style=scss
```

## mf-shopping

```console
ng generate application mf-shopping --style=scss --routing=true
```

## commons-lib

Este proyecto sera de tipo **librería** el cual usaremos para compartir elementos entre los microfrontend

```console
ng generate library  commons-lib
```

# Activación de la federación de módulos para proyectos angular

El paquete **@angular-architects/module-federation** proporciona un generador personalizado. Si deseas aprender más de esta librería y arquitectura Angular visita el siguiente link:
https://www.angulararchitects.io/en/aktuelles/the-microfrontend-revolution-module-federation-in-webpack-5/

```console
npm i -D @angular-architects/module-federation
```

Una vez instalada la librería agregaremos el uso de Module Federation a nuestros MF (microfrontends) y agregaremos unas configuraciones:

```console
ng add @angular-architects/module-federation --project mf-shell --port 4200 --type host
ng add @angular-architects/module-federation --project mf-shopping --port 4201 --type remote
ng add @angular-architects/module-federation --project mf-payment --port 4202 --type remote
```

Listo, lo que hara este comando es crear unos archivos **webpack.config.js** en cada uno de nuestros MF para poder hacer uso de la federación de modulos.

Luego solo es cuestion de configurar los MF **"remotos"** y el **"host"**

Ejemplo de configuración para el MF shopping:

```javascript
const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfShopping",
  exposes: {
    "./ProductsModule":
      "./projects/mf-shopping/src/app/products/products.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
  sharedMappings: ["@commons-lib"],
});
```
