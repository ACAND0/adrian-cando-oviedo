# Portfolio de Adrián Cando Oviedo

Web estática sin framework ni proceso de compilación.

## Estructura

- `index.html`: contenido y estructura.
- `css/styles.css`: diseño responsive.
- `js/main.js`: navegación, carrusel y actualización de los años de experiencia con JavaScript nativo.
- `assets/og-white.png`: miniatura blanca de 1200 x 630 para compartir la web.
- `favicon.ico` y `assets/favicon-*.png`: identidad visual ACO para navegadores y dispositivos.

Para verla, abre `index.html` en un navegador. Algunas políticas de seguridad del
navegador funcionan mejor sirviendo la carpeta con un servidor HTTP local sencillo.

Diseño claro en blanco y negro con acentos azules, tipografía IBM Plex Sans y
composición responsive. El contenido permanece visible aunque JavaScript no esté
disponible. La navegación y el carrusel admiten teclado y movimiento reducido.

La portada incorpora un monograma ACO vectorial con órbitas animadas en azul
acero. Permite pausar el movimiento, se detiene fuera de pantalla y respeta la
preferencia de movimiento reducido del sistema.
## Temas visuales

El botón «Cambiar tema» ofrece Editorial profesional, Tech oscuro,
Minimalismo corporativo (predeterminado) y Portfolio creativo sobre un único contenido HTML.
Los estilos están en `css/themes.css`; `js/theme-init.js` restaura la preferencia
antes de pintar la página y `js/theme-picker.js` gestiona el selector.
El diseño corporativo actualizado está en `css/styles.css`; los otros tres usan
`css/legacy.css` y `css/themes.css`. `js/theme-styles.js` activa las hojas del tema
elegido y `css/shared.css` comparte el selector y la identidad animada.
La elección se guarda en `localStorage` con la clave `portfolio-theme` y se
sincroniza entre pestañas. Si el almacenamiento está bloqueado, se puede cambiar
el diseño durante la sesión y se anuncia que no se ha podido guardar.

El selector admite Tab, flechas, Espacio y Escape, indica el estado expandido y
mantiene un foco visible. Respeta la preferencia de movimiento reducido.
Sin JavaScript se muestra el contenido con el tema Minimalismo corporativo.
Portfolio creativo conserva el diseño morado oscuro original de la web.

## Miniatura e iconos

`assets/brand/artwork.html` contiene los originales vectoriales de la miniatura y
el favicon, adaptados a la identidad corporativa blanca. `scripts/build-brand.cjs`
los exporta con Playwright y Chromium (`node scripts/build-brand.cjs`). Se puede
indicar un navegador instalado mediante `CHROME_PATH`.
El favicon ICO incluye tamaños de 16, 32, 48 y 256 píxeles; las versiones pequeñas
simplifican las órbitas para priorizar la lectura de ACO.
