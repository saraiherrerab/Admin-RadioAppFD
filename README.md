# Radio App - Versión PRO (Administración)

App de radio para emisoras con versión PRO. Incluye todas las funciones de la versión básica más administración de programación y notificaciones.

## Características

### Para oyentes:
- 🎵 Reproducción de radio en vivo
- 🎼 Metadatos en tiempo real (canción y artista)
- 📅 Visualización de programación semanal
- 🔔 Notificaciones de la emisora
- 🔗 Enlaces a redes sociales

### Para administradores:
- ➕ Crear/editar/eliminar bloques de programación
- 📢 Crear/editar/eliminar notificaciones
- ⚙️ Configurar URLs y redes sociales
- 🎛️ Panel de administración completo

## Requisitos

- Node.js 16+
- Expo CLI
- Expo Go app (SDK 54) en tu dispositivo móvil

## Instalación

```bash
npm install
```

## Configuración

Antes de ejecutar, actualiza la URL del backend en `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://tu-backend.com';
```

## Ejecutar la app

```bash
npm start
```

Luego escanea el código QR con Expo Go en tu teléfono.

## Comandos disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Abre en Android
- `npm run ios` - Abre en iOS
- `npm run web` - Abre en navegador web

## Endpoints requeridos

Esta app consume los siguientes endpoints de tu backend:

- `GET /metadata/now-playing` - Metadatos de la canción actual
- `GET /schedule` - Obtener programación
- `POST /schedule` - Crear programa
- `PUT /schedule/:id` - Actualizar programa
- `DELETE /schedule/:id` - Eliminar programa
- `GET /notifications` - Obtener notificaciones
- `POST /notifications` - Crear notificación
- `PUT /notifications/:id` - Actualizar notificación
- `DELETE /notifications/:id` - Eliminar notificación
- `GET /config` - Obtener configuración
- `PUT /config` - Actualizar configuración

Ver `API_ENDPOINTS.md` en la raíz del proyecto para especificaciones completas.

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
│   ├── Button/
│   ├── Footer/
│   ├── Header/
│   ├── NotificationPanel/
│   ├── NowPlaying/
│   ├── PlayButton/
│   ├── Schedule/
│   └── SocialLinks/
├── constants/      # Colores y constantes
├── screens/        # Pantallas de la app
│   ├── HomeScreen.js           # Navegación principal
│   ├── AdminHomeScreen.js      # Gestión de programación
│   ├── NotificationsScreen.js  # Gestión de notificaciones
│   ├── ConfigScreen.js         # Configuración
│   └── PlayerScreen.js         # Reproductor para oyentes
└── services/       # Servicios de API y audio
```

## Pestañas de la app

1. **Programación** - Administrar bloques de programación
2. **Notificaciones** - Administrar notificaciones para oyentes
3. **Configuración** - Configurar URLs y redes sociales
4. **Reproducción** - Vista del reproductor (como la ven los oyentes)
