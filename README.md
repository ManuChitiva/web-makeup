# Camila Palacios Makeup Studio

Sitio de maquillaje hecho con Next.js. El catálogo de servicios es local y no requiere backend ni claves de API.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Catálogo de servicios

Los servicios se editan en `app/data/services.ts` y sus fotografías locales están en `public/services/`. La selección abre WhatsApp con una consulta preparada. La disponibilidad y el valor se coordinan directamente; esta web no crea pedidos ni procesa pagos.

La sección de reservas también abre WhatsApp con el mensaje preparado. Los enlaces de redes sociales y WhatsApp funcionan sin consumir una API desde el sitio.

Las fotografías de servicios son referencias visuales de Unsplash, no trabajos del estudio: [maquillaje social](https://unsplash.com/photos/a-woman-with-makeup-on-her-face-posing-for-a-picture-u65AB6gtL34) por Dmitriy Ilkevich, [novias](https://unsplash.com/photos/bride-having-makeup-applied-by-a-makeup-artist-OWunn6bxGGg) por Alexander Mass, [editorial](https://unsplash.com/photos/makeup-artist-applying-foundation-to-a-womans-face-9WecIIPETPY) por Vitaly Gariev y [automaquillaje](https://unsplash.com/photos/woman-using-makeup-during-daytime-fzJKgGoFoYQ) por Annie Spratt.

## Validación

```bash
npm run lint
npm run build
```
