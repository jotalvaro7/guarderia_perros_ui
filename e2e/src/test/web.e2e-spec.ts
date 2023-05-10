import { browser, by, element, protractor } from 'protractor';
import { ProductoPage } from '../page/producto/producto.po';
import { LoginPage } from '../page/login/login.po';

describe('workspace-project Producto', () => {
  let loginPage: LoginPage;
  let productoPage: ProductoPage;


  beforeEach(() => {
    loginPage = new LoginPage();
    productoPage = new ProductoPage();

  });

  it('deberia abrir en la pagina de login y loguearse', () => {
    var EC = protractor.ExpectedConditions;
    var userNameInput = element(by.id('username'));
    browser.wait(EC.presenceOf(userNameInput), 5000);
    loginPage.userNameInput('julio_osorio');
    browser.sleep(1000);
    var passwordInput = element(by.id('password'));
    browser.wait(EC.presenceOf(passwordInput), 5000);
    loginPage.passwordInput('12345');
    browser.sleep(1000);
    var loginButton = element(by.id('buttonLogin'));
    browser.wait(EC.elementToBeClickable(loginButton), 5000);
    loginPage.buttonLogin();
    browser.sleep(1000);
  });


  it('comparar el titulo de la pagina productos', () => {
    var EC = protractor.ExpectedConditions;
    var titulo = element(by.id('title'));
    browser.wait(EC.visibilityOf(titulo), 5000);
    expect(titulo.getText()).toEqual('Qué libro deseas comprar?');
    browser.sleep(1000);
  });

  it('deberia seleccionar el primer libro, mostrar los detalles, agregar 2 de cantidad y darle al boton comprar', () => {

    var EC = protractor.ExpectedConditions;

    //selecciona el primer libro y muestra los detalles
    var primerLibro = element(by.css('.card-wrapper:first-child .card'));
    browser.actions().mouseMove(primerLibro).perform();
    var detalleLibro = primerLibro.element(by.css('.card-extra-info'));
    browser.wait(EC.visibilityOf(detalleLibro), 5000);
    browser.sleep(1500);

    // Cambia la cantidad de libros a comprar
    var inputCantidad = detalleLibro.element(by.css('.selected-amount'));
    browser.wait(EC.visibilityOf(inputCantidad), 5000);
    inputCantidad.clear();
    inputCantidad.sendKeys('2');
    browser.sleep(1500);

    // Haz clic en el botón de comprar
    var botonComprar = detalleLibro.element(by.css('.button-buy'));
    browser.wait(EC.visibilityOf(botonComprar), 5000);
    productoPage.botonComprarLibro();
    browser.sleep(2000);

  });


});
