# Jefferson Capelari - Técnico en Reparación de Celulares

Sitio web profesional para Jefferson Capelari, técnico especializado en reparación de dispositivos móviles, computadoras y sistemas de seguridad.

## Características

- Diseño moderno y espectacular con efectos glassmorphism
- Completamente responsive (móvil, tablet, desktop)
- Optimizado para SEO
- Animaciones suaves y microinteracciones
- Deep links para WhatsApp y llamadas telefónicas
- Galería de imágenes profesional con filtros
- Formulario de contacto integrado con WhatsApp
- Slider de testimonios
- Botón flotante de WhatsApp
- Botón "Volver arriba"
- Efecto de escritura automática (typing effect)
- Contador animado de estadísticas
- Partículas animadas en el hero

## Estructura del Proyecto

```
├── index.html      # Página principal
├── styles.css      # Estilos CSS
├── script.js       # JavaScript
├── firebase.json   # Configuración Firebase Hosting
├── .firebaserc     # Proyecto Firebase
└── README.md       # Este archivo
```

## Personalización

### Cambiar número de WhatsApp

Busca y reemplaza `5491112345678` en todos los archivos por el número real de Jefferson (con código de país, sin +).

### Cambiar email

Busca y reemplaza `jefferson.capelari@gmail.com` por el email real.

### Agregar imágenes reales

1. Crea una carpeta `img/` en el proyecto
2. Agrega las imágenes:
   - `profile.jpg` - Foto de Jefferson
   - `gallery/` - Carpeta con fotos de trabajos
   - `og-image.jpg` - Imagen para compartir en redes (1200x630px)

3. Reemplaza los placeholders en el HTML por las imágenes reales

### Agregar redes sociales

Busca los enlaces de redes sociales (`href="#"`) y reemplázalos por los perfiles reales.

## Despliegue en Firebase Hosting

### Requisitos Previos

1. Node.js instalado
2. Firebase CLI instalado:
   ```bash
   npm install -g firebase-tools
   ```
3. Cuenta de Firebase/Google

### Pasos para el Despliegue

1. **Iniciar sesión en Firebase:**
   ```bash
   firebase login
   ```

2. **Crear un nuevo proyecto en Firebase Console:**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto (ej: `jefferson-capelari-tech`)

3. **Actualizar el archivo `.firebaserc`:**
   Cambia `jefferson-capelari-tech` por el ID de tu proyecto real.

4. **Inicializar Firebase (opcional si ya está configurado):**
   ```bash
   firebase init hosting
   ```

5. **Desplegar el sitio:**
   ```bash
   firebase deploy
   ```

6. **Acceder al sitio:**
   El sitio estará disponible en:
   - `https://tu-proyecto.web.app`
   - `https://tu-proyecto.firebaseapp.com`

### Dominio Personalizado

Para usar un dominio personalizado (ej: `jeffersoncapelari.com`):

1. Ve a Firebase Console > Hosting
2. Click en "Agregar dominio personalizado"
3. Sigue las instrucciones para verificar el dominio
4. Actualiza los DNS de tu dominio

## Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables, flexbox y grid
- JavaScript vanilla (ES6+)
- [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll
- [Font Awesome](https://fontawesome.com/) - Iconos
- [Google Fonts](https://fonts.google.com/) - Tipografías (Inter, Poppins)

## Optimización SEO

El sitio incluye:
- Meta tags optimizados
- Open Graph para compartir en redes
- Twitter Cards
- Estructura semántica
- Textos alternativos para imágenes
- URLs amigables

## Soporte de Navegadores

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Opera (últimas 2 versiones)

## Licencia

Este proyecto fue creado específicamente para Jefferson Capelari.

---

**¿Necesitas ayuda?** Contáctame para cualquier modificación o soporte técnico.
