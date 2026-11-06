# Klupho Pet Vet — Landing page React

Primera versión funcional de la landing page, creada con React + Vite.

## Requisitos
- Node.js 20 o superior

## Desarrollo
```bash
npm install
npm run dev
```
Abre la dirección local que muestra Vite (normalmente http://localhost:5173).

## Compilar para publicar
```bash
npm run build
```
La carpeta `dist/` contiene los archivos estáticos listos para subir a `public_html` del hosting (por ejemplo, mediante FileZilla).

## Antes de publicar
1. Abre `src/main.jsx` y edita el objeto `CONFIG`: número de WhatsApp internacional sin `+`, enlaces de Instagram/Facebook, dirección y horarios reales.
2. Revisa y aprueba los textos, servicios ofrecidos y condiciones comerciales.
3. Confirma que se dispone de autorización para utilizar el logo y las fuentes.
4. La imagen `public/klupho-logo-original.png` es una versión raster del concepto aprobado; sustituir por logo SVG definitivo cuando esté vectorizado.
5. Las reservas se gestionan por contacto; esta versión NO tiene backend ni sistema de citas.

## Paleta
Borgoña `#922530`, amarillo `#FFD662`, crema `#FFFBD4`, gris `#4A4A4A`.

## Estructura
- `src/main.jsx`: secciones y contenido
- `src/styles.css`: estilos y diseño responsive
- `public/klupho-logo-original.png`: arte del logo aprobado


## Heroes animados por sección
Ocho heroes de sección con vídeos originales del código GUAU de Julibe aportado por el cliente. Se mantienen las fuentes, el logo y los colores de Klupho.
Cada vídeo se reproduce al entrar en pantalla, se detiene al salir y dispone de pausa. La preferencia de movimiento reducido usa una fotografía. Incluye composición móvil y animaciones de entrada.
Los vídeos y fotografías se cargan desde https://github.com/Julibe/Guau y requieren conexión.
Validación: compilación de producción y renderizado de los ocho heroes con enlaces internos. Revisión visual de navegador pendiente.
