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

## 🏗️ Arquitectura

- App basada en React 19.
- Webpack + Module Federation para exponer el microfrontend.
- Uso de Redux + Redux Persist para estado.
- Componentes reutilizables con `tarjeta-lib`.

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