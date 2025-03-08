# Proyecto: Validación de Formulario con Cypress  

Este proyecto es una aplicación web que contiene un formulario de registro con validaciones en el frontend. Además, incluye pruebas automatizadas con **Cypress** para verificar el correcto funcionamiento del formulario y la página de confirmación.  

## 📌 Características  

- **Validaciones en el formulario** para asegurar que los datos ingresados sean correctos.  
- **Pruebas automatizadas con Cypress** para verificar la funcionalidad y seguridad del formulario.  
- **Redirección y almacenamiento en localStorage** para mantener la información del usuario en la página de confirmación.  

## 🛠️ Tecnologías utilizadas  

- **HTML5, CSS3 y JavaScript** para la construcción del formulario.  
- **Cypress** para la automatización de pruebas.  

## 📂 Estructura del Proyecto  

```
📦 Proyecto  
 ┣ 📂 cypress  
 ┃ ┗ 📂 integration  
 ┃ ┃ ┗ 📜 cypress-test.js   # Pruebas automatizadas con Cypress  
 ┣ 📜 index.html            # Página principal con el formulario  
 ┣ 📜 confirmation.html      # Página de confirmación del usuario  
 ┣ 📜 styles.css            # Estilos de la aplicación  
 ┣ 📜 script.js             # Lógica de validación del formulario  
 ┗ 📜 README.md             # Documentación del proyecto  
```  

## 🚀 Instalación y Ejecución  

### 1️⃣ Clonar el repositorio  

```bash
git clone https://github.com/tu-repositorio.git
cd tu-repositorio
```

### 2️⃣ Instalar Cypress  

Si no tienes **Cypress** instalado, usa el siguiente comando:  

```bash
npm install cypress --save-dev
```

### 3️⃣ Ejecutar las pruebas  

Abre Cypress con:  

```bash
npx cypress open
```

Desde la interfaz de Cypress, selecciona el archivo **cypress-test.js** para ejecutar las pruebas.  

## 📝 Descripción de las Pruebas  

### 🔹 Pruebas en el formulario de registro  

1. **Campos obligatorios**: Se verifica que los campos vacíos muestren errores.  
2. **Validación de correo electrónico**: Asegura que el correo tenga el formato correcto.  
3. **Requisitos de contraseña**: Se prueba que la contraseña cumpla con los criterios de seguridad.  
4. **Coincidencia de contraseñas**: Ambas contraseñas deben ser idénticas.  
5. **Términos y condiciones**: El usuario debe aceptar los términos para registrarse.  
6. **Deshabilitación del botón de envío**: El botón solo se habilita si el formulario es válido.  
7. **Envío del formulario y redirección**: Tras completar los datos, el usuario es llevado a la página de confirmación.  

### 🔹 Pruebas en la página de confirmación  

1. **Mensaje de bienvenida**: Muestra el nombre del usuario registrado.  
2. **Resumen de datos**: Se validan los datos mostrados en la página de confirmación.  
3. **Botones de navegación**: Verifica que los botones redirijan correctamente.  
4. **Redirección si no hay datos**: Si no hay datos en localStorage, se redirige al usuario a la página de inicio.  

## 📌 Contribución  

Si deseas contribuir:  

1. Haz un fork del proyecto.  
2. Crea una rama con tus cambios (`git checkout -b feature-nueva`).  
3. Realiza un commit (`git commit -m "Añadí nueva funcionalidad"`).  
4. Envía un push a la rama (`git push origin feature-nueva`).  
5. Abre un Pull Request.  

## 📄 Licencia  

Este proyecto está bajo la **Licencia MIT**. 
