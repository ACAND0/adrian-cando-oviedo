# Portfolio de Adrián Cando Oviedo

Portfolio estático de ingeniería documental: Documentum, Java, DFCs, JavaFX,
migraciones ECM, integraciones y automatización empresarial.

## Diseño y contenido

Un único diseño carbón con acento dorado, composición editorial y página
continua. El contenido presenta un perfil profesional, su especialización y
su trayectoria, sin plantearse como un catálogo de servicios. La portada
presenta nombre, cargo y enlaces directos al trabajo y al contacto profesional.

- El mapa ECM relaciona cuatro áreas de experiencia con trabajo documentado,
  tecnologías y referencias a casos o etapas profesionales.
- Los cinco casos de Minsait, Repsol, ADIF, Ferrovial y ACCIONA recogen la
  información de la trayectoria y las aportaciones facilitadas por el autor.
  Minsait destaca el trabajo actual en herramientas internas con JavaFX y DFCs
  para automatización y operativa técnica. No se añaden métricas ni resultados
  no facilitados.
- Las recreaciones de aplicaciones se presentan por separado, como material
  ilustrativo con datos ficticios.
- Se conservan las seis etapas profesionales principales, las tres anteriores,
  la formación académica y las certificaciones.
- Los detalles se amplían con controles nativos `details/summary`.
- La fotografía y su fondo CSS, los colores de los logos, el logotipo completo
  de DFCs y el engranaje de D2-Config se mantienen.

## Archivos

- `index.html`: contenido completo y metadatos.
- `css/styles.css`: composición responsive, foco, movimiento reducido e impresión.
- `js/main.js`: mapa accesible, enlaces directos, navegación activa y diálogo de imágenes.
- `assets/optimized/`: versiones WebP dimensionadas; retrato y logos con transparencia y compresión sin pérdida.
- `assets/adrian-cando-cutout.png`, `assets/technologies/` y
  `assets/app-examples/`: originales conservados para futuras exportaciones.
- `scripts/optimize-assets.cjs`: exportación mecánica de versiones responsive,
  sin retoque ni regeneración de imágenes.
- `scripts/check-portfolio.cjs`: comprobaciones de navegador y capturas de escritorio/móvil.
- `assets/og-profile.png`: miniatura de 1200 x 630 para compartir.

## Funcionamiento

Abrir `index.html` o servir la carpeta con un servidor HTTP estático.
No hay framework, compilación ni dependencias de ejecución. Manrope se carga de
Google Fonts y dispone de fuente de respaldo.

La navegación utiliza anclas normales: `#sobre`, `#soluciones`, `#casos`,
`#aplicaciones`, `#experiencia`, `#tecnologias`, `#formacion` y `#contacto`.
Los enlaces anteriores `#inicio` y `#perfil` mantienen compatibilidad con JavaScript.

El mapa admite Tab, flechas, Inicio y Fin. Solo el selector activo forma parte
del recorrido de Tab y cada panel tiene su etiqueta accesible. Las selecciones
se pueden compartir con `#solucion-migrar`, `#solucion-automatizar`,
`#solucion-herramientas` y `#solucion-integrar`.

Los enlaces a casos y etapas abren su detalle correspondiente. El diálogo de
ejemplos se cierra con Escape y devuelve el foco al botón de origen.
Sin JavaScript, los cuatro enfoques y toda la página permanecen disponibles.
La preferencia de movimiento reducido desactiva las transiciones.

No se utiliza un selector de temas ni se leen preferencias antiguas.

## Desarrollo y comprobación

Los scripts requieren Node.js y herramientas de desarrollo externas al sitio:
Playwright para las pruebas y Sharp para exportar imágenes.

```sh
node scripts/optimize-assets.cjs
node scripts/check-portfolio.cjs
node scripts/check-portfolio.cjs https://acand0.github.io/adrian-cando-oviedo/
```

Se puede indicar un Chrome instalado mediante `CHROME_PATH`. Las capturas de
prueba se guardan en `outputs/portfolio-desktop.png` y
`outputs/portfolio-mobile.png` (no se incluyen en Git).

Las comprobaciones cubren el mapa, teclado, URLs e historial, aperturas de
detalles, diálogo y retorno de foco, nueve anchuras de pantalla, movimiento
reducido, funcionamiento sin JavaScript, IDs y enlaces internos.

El retrato conserva el original de aproximadamente 1,3 MB y utiliza versiones
de 320, 384 y 640 píxeles (aproximadamente 62, 84 y 224 KB).
Los seis logos rasterizados servidos pesan entre 2 y 12 KB por archivo.
Los ejemplos usan miniaturas WebP de 480/960 píxeles y carga diferida; la imagen
original ampliada solo se solicita al abrir el diálogo.

## Publicación

GitHub Pages sirve la raíz de `portfolio-profile`:
https://acand0.github.io/adrian-cando-oviedo/
Un push a esa rama activa el despliegue de Pages.

La miniatura y los favicons se pueden regenerar desde
`assets/brand/artwork.html` mediante `node scripts/build-brand.cjs`.
