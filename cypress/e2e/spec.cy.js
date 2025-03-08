// cypress/integration/cypress-test.js

describe('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('Debería mostrar errores cuando los campos obligatorios están vacíos', () => {
    // Forzar la validación del formulario para las pruebas
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    // Verificar que se muestren los errores
    cy.get('#fullNameGroup').should('have.class', 'error');
    cy.get('#emailGroup').should('have.class', 'error');
    cy.get('#passwordGroup').should('have.class', 'error');
    cy.get('#confirmPasswordGroup').should('have.class', 'error');
    cy.get('#termsGroup').should('have.class', 'error');
  });

  it('Debería validar el formato de correo electrónico', () => {
    // Forzar la validación primero
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    cy.get('[data-testid=email]').type('correo_invalido');
    cy.get('[data-testid=email]').blur();
    
    cy.get('#emailGroup').should('have.class', 'error');
    cy.get('#emailError').should('be.visible')
      .and('contain', 'correo electrónico válido');
    
    cy.get('[data-testid=email]').clear().type('correo@valido.com');
    cy.get('#emailGroup').should('not.have.class', 'error');
  });

  it('Debería validar los requisitos de la contraseña', () => {
    // Forzar la validación primero
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    // Contraseña muy corta
    cy.get('[data-testid=password]').type('Abc123');
    cy.get('[data-testid=password]').blur();
    cy.get('#passwordGroup').should('have.class', 'error');
    
    // Contraseña sin mayúscula
    cy.get('[data-testid=password]').clear().type('abcdef123');
    cy.get('#passwordGroup').should('have.class', 'error');
    
    // Contraseña sin minúscula
    cy.get('[data-testid=password]').clear().type('ABCDEF123');
    cy.get('#passwordGroup').should('have.class', 'error');
    
    // Contraseña sin número
    cy.get('[data-testid=password]').clear().type('AbcdefGhi');
    cy.get('#passwordGroup').should('have.class', 'error');
    
    // Contraseña válida
    cy.get('[data-testid=password]').clear().type('Abcdef123');
    cy.get('#passwordGroup').should('not.have.class', 'error');
  });

  it('Debería validar que las contraseñas coincidan', () => {
    // Forzar la validación primero
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    cy.get('[data-testid=password]').type('Abcdef123');
    cy.get('[data-testid=confirmPassword]').type('Diferente123');
    cy.get('[data-testid=confirmPassword]').blur();
    
    cy.get('#confirmPasswordGroup').should('have.class', 'error');
    cy.get('#confirmPasswordError').should('be.visible')
      .and('contain', 'no coinciden');
    
    cy.get('[data-testid=confirmPassword]').clear().type('Abcdef123');
    cy.get('#confirmPasswordGroup').should('not.have.class', 'error');
  });

  it('Debería requerir la aceptación de términos y condiciones', () => {
    // Forzar la validación primero
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    cy.get('[data-testid=terms]').should('not.be.checked');
    cy.get('#termsGroup').should('have.class', 'error');
    
    cy.get('[data-testid=terms]').check();
    cy.get('#termsGroup').should('not.have.class', 'error');
  });

  it('Debería deshabilitar el botón de envío cuando hay errores', () => {
    // Inicialmente, el botón debería estar deshabilitado
    cy.get('[data-testid=submitButton]').should('be.disabled');
    
    // Forzar la validación
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    // El botón debería seguir deshabilitado porque hay errores
    cy.get('[data-testid=submitButton]').should('be.disabled');
    
    // Completar formulario con datos válidos
    cy.get('[data-testid=fullName]').type('Usuario Prueba');
    cy.get('[data-testid=email]').type('usuario@prueba.com');
    cy.get('[data-testid=password]').type('Prueba123');
    cy.get('[data-testid=confirmPassword]').type('Prueba123');
    cy.get('[data-testid=terms]').check();
    
    // Esperar un momento para que se complete la validación
    cy.wait(100);
    
    // El botón debería estar habilitado
    cy.get('[data-testid=submitButton]').should('not.be.disabled');
    
    // Introducir un error
    cy.get('[data-testid=email]').clear().type('correo_invalido');
    
    // Esperar un momento para que se complete la validación
    cy.wait(100);
    
    // El botón debería deshabilitarse de nuevo
    cy.get('[data-testid=submitButton]').should('be.disabled');
  });

  it('Debería enviar el formulario y redirigir a la página de confirmación', () => {
    // Forzar la validación primero
    cy.window().then((win) => {
      win.forceValidation();
    });
    
    // Completar el formulario con datos válidos
    cy.get('[data-testid=fullName]').type('Usuario Prueba');
    cy.get('[data-testid=email]').type('usuario@prueba.com');
    cy.get('[data-testid=password]').type('Prueba123');
    cy.get('[data-testid=confirmPassword]').type('Prueba123');
    cy.get('[data-testid=birthDate]').type('1990-01-01');
    cy.get('[data-testid=terms]').check();
    
    // Esperar un momento para que se complete la validación
    cy.wait(500);
    
    // Verificar que el botón está habilitado antes de hacer clic
    cy.get('[data-testid=submitButton]').should('not.be.disabled');
    
    // Enviar el formulario
    cy.get('[data-testid=submitButton]').click();
    
    // Verificar redirección a la página de confirmación
    cy.url().should('include', 'confirmation.html');
  });
});

// El resto de las pruebas para la página de confirmación se mantienen igual
describe('Página de Confirmación', () => {
  beforeEach(() => {
    // Preparar datos de prueba para localStorage
    const registrationData = {
      fullName: 'Usuario Prueba',
      email: 'usuario@prueba.com',
      birthDate: '1990-01-01'
    };
    
    // Configurar localStorage antes de visitar la página
    cy.window().then((win) => {
      win.localStorage.setItem('registrationData', JSON.stringify(registrationData));
    });
    
    cy.visit('http://127.0.0.1:5500/confirmation.html');
  });

  it('Debería mostrar un mensaje de bienvenida personalizado', () => {
    cy.get('#welcomeMessage').should('contain', 'Usuario Prueba');
  });

  it('Debería mostrar un resumen de la información registrada', () => {
    cy.get('#userName').should('contain', 'Usuario Prueba');
    cy.get('#userEmail').should('contain', 'usuario@prueba.com');
    
    // Verificar el formato de la fecha (puede variar según la configuración regional)
    cy.get('#userBirthDate').should('not.contain', 'No proporcionada');
  });

  it('Debería tener botones para navegar a otras páginas', () => {
    cy.get('.buttons').within(() => {
      cy.get('a').should('have.length', 2);
      cy.get('a').first().should('have.attr', 'href', 'index.html');
      cy.get('a').last().should('have.attr', 'href', 'user-area.html');
    });
  });

  it('Debería redireccionar si no hay datos de registro', () => {
    // Limpiar localStorage
    cy.clearLocalStorage();
    
    // Recargar la página
    cy.reload();
    
    // Debería redireccionar a index.html
    cy.url().should('include', 'http://127.0.0.1:5500/index.html');
  });
});