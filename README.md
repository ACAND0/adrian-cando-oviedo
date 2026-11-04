# Portfolio de Adrián Cando Oviedo

Portfolio estático en español, con un único diseño oscuro inspirado en la
composición de https://aakashrajbanshi.com.np/: tarjeta de perfil lateral,
panel principal con pestañas y acentos dorados. La identidad, el contenido
profesional y los gráficos pertenecen a este portfolio; no se utilizan fotos,
certificados ni textos del sitio de referencia.

## Estructura

- `index.html`: perfil, experiencia, soluciones, formación y contacto.
- `css/styles.css`: diseño único responsive y estilos de impresión.
- `js/main.js`: pestañas accesibles, navegación por URL, datos de contacto en móvil y ampliación de imágenes.
- `assets/app-examples/`: recreaciones anonimizadas con datos ficticios.
- `assets/adrian-cando-profile.png`: fotografía original sin retoques; los bordes se integran con el fondo mediante una máscara CSS.
- `assets/technologies/`: pictogramas vectoriales con las paletas de las referencias originales y tamaños normalizados. DFCs utiliza los tonos de Java; REST conserva un dibujo oscuro sobre una base clara para mantener el contraste.
- `assets/og-profile.png`: miniatura para compartir, de 1200 x 630.
- `assets/brand/artwork.html`: originales de la miniatura y del favicon.
- `scripts/build-brand.cjs`: exportación de miniatura e iconos con Playwright.

## Uso

Abrir `index.html` o servir la carpeta con un servidor HTTP estático.
No hay framework, dependencias de ejecución ni compilación. La tipografía
Manrope se carga de Google Fonts y dispone de una fuente de respaldo.

Las pestañas admiten flechas, Inicio, Fin, Enter y Espacio. Sus enlaces
permiten abrir directamente `#sobre`, `#experiencia`, `#soluciones`,
`#formacion` y `#contacto`, y utilizar Atrás y Adelante del navegador.
Sin JavaScript, todos los apartados permanecen visibles.
Las imágenes se amplían en un diálogo que puede cerrarse con Escape.
El diseño respeta la preferencia de movimiento reducido.

No hay selector ni preferencias de temas. Los valores antiguos de
`portfolio-theme` no se consultan.

## Identidad visual

Para regenerar los iconos y la miniatura, instalar Playwright y Chromium
en el entorno de desarrollo y ejecutar `node scripts/build-brand.cjs`.
Se puede indicar un navegador instalado mediante `CHROME_PATH`.
El favicon ICO incluye tamaños de 16, 32, 48 y 256 píxeles.

## Publicación

GitHub Pages sirve la raíz de la rama `portfolio-profile`:
https://acand0.github.io/adrian-cando-oviedo/
Un push a esa rama activa el despliegue de Pages.
