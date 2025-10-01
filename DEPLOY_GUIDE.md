# Guía para Desplegar tu Portafolio en GitHub Pages

Esta guía te ayudará a desplegar tu portafolio React en GitHub Pages de forma gratuita.

## Paso 1: Crear un repositorio en GitHub

1. Ve a [GitHub](https://github.com/) e inicia sesión en tu cuenta
2. Haz clic en el botón "+" en la esquina superior derecha y selecciona "New repository"
3. Nombra tu repositorio como `portafolio-react`
4. Deja el repositorio como público
5. No inicialices el repositorio con README, .gitignore o licencia
6. Haz clic en "Create repository"

## Paso 2: Inicializar Git en tu proyecto local

Abre una terminal en la carpeta de tu proyecto y ejecuta los siguientes comandos:

```bash
git init
git add .
git commit -m "Primer commit: Portafolio en React"
```

## Paso 3: Conectar tu repositorio local con GitHub

Reemplaza `TU_NOMBRE_DE_USUARIO` con tu nombre de usuario de GitHub:

```bash
git remote add origin https://github.com/TU_NOMBRE_DE_USUARIO/portafolio-react.git
git branch -M main
git push -u origin main
```

## Paso 4: Configurar EmailJS para el formulario de contacto

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Obtén tus IDs (Service ID, Template ID, User ID)
5. Actualiza el componente Contact.js con tus IDs:

```javascript
// En Contact.js
const result = await emailjs.sendForm(
  'TU_SERVICE_ID',
  'TU_TEMPLATE_ID',
  form.current,
  'TU_USER_ID'
);
```

## Paso 5: Desplegar en GitHub Pages

1. Asegúrate de que el campo `homepage` en package.json tenga la URL correcta:

```json
"homepage": "https://haroldsantiago.github.io/Mi-Portafolio"
```

2. Ejecuta el comando de despliegue:

```bash
npm run deploy
```

3. Espera unos minutos y tu sitio estará disponible en: `https://haroldsantiago.github.io/Mi-Portafolio`

## Actualizar tu sitio

Cada vez que hagas cambios en tu código y quieras actualizarlos en GitHub Pages:

1. Haz commit de tus cambios:
```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

2. Vuelve a desplegar:
```bash
npm run deploy
```

¡Listo! Tu portafolio ahora está disponible en línea para que puedas compartirlo con el mundo.