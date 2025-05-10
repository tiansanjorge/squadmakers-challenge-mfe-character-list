# Microfrontend: Character List

Microfrontend que renderiza tarjetas de personajes usando la API pública de Rick & Morty. Utiliza la librería `tarjeta-lib` como dependencia local.

## 🚀 Instalación y ejecución

```bash
npm install
npm run dev
```

Para build:

```bash
npm run build
```

## 🔗 Requisitos

Para que la navegación al detalle funcione correctamente, el microfrontend `mfe-character-detail` debe estar ejecutándose con:

```bash
npm run dev
```

## 📦 Librería tarjeta-lib

Este proyecto utiliza la librería `tarjeta-lib`, instalada localmente desde un archivo `.tgz` que se encuentra en la raiz de este repositorio.

Si se lanza una nueva versión, asegurate de descargar el nuevo archivo `.tgz` desde 👉 [`tarjeta-lib` en GitHub](https://github.com/tiansanjorge/squadmakers-challenge-card-component).

Copialo en la raiz y para reinstalarlo ejecuta:

```bash
npm install ./tarjeta-lib-1.X.X.tgz
```

## 🏗️ Arquitectura

- App basada en React 19.
- Webpack + Module Federation para exponer el microfrontend.
- Uso de Redux + Redux Persist para estado.
- Renderizado de tarjetas utilizando el componente `Tarjeta` de `tarjeta-lib`.

## 📦 Dependencias destacadas

- `react`, `react-dom`, `react-redux`
- `redux-persist`, `@reduxjs/toolkit`
- `react-router-dom`
- `tarjeta-lib` (instalado localmente)
- `lucide-react`
- `tailwindcss` para estilos
- ESLint + Testing Library

## ✅ Testing

```bash
npm run test
```
