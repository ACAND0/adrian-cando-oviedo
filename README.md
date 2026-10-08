# Portfolio de Adrián Cando Oviedo

Web estática sin framework ni proceso de compilación.

## Estructura

- `index.html`: contenido y estructura.
- `css/styles.css`: diseño responsive.
- `js/main.js`: interacciones, contadores y efectos con JavaScript nativo.
- `assets/og.png`: imagen para compartir la web.
- `favicon.ico` y `assets/favicon-*.png`: identidad visual ACO para navegadores y dispositivos.

Para verla, abre `index.html` en un navegador. Algunas políticas de seguridad del
navegador funcionan mejor sirviendo la carpeta con un servidor HTTP local sencillo.

## Temas visuales

El botón «Cambiar tema» ofrece Editorial profesional, Tech oscuro,
Minimalismo corporativo (predeterminado) y Portfolio creativo sobre un único contenido HTML.
Los estilos están en `css/themes.css`; `js/theme-init.js` restaura la preferencia
antes de pintar la página y `js/theme-picker.js` gestiona el selector.
La elección se guarda en `localStorage` con la clave `portfolio-theme` y se
sincroniza entre pestañas. Si el almacenamiento está bloqueado, se puede cambiar
el diseño durante la sesión y se anuncia que no se ha podido guardar.

El selector admite Tab, flechas, Espacio y Escape, indica el estado expandido y
mantiene un foco visible. Respeta la preferencia de movimiento reducido.
Sin JavaScript se muestra el contenido con el tema Minimalismo corporativo.
Portfolio creativo conserva el diseño morado oscuro original de la web.
