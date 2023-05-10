import { by, element } from 'protractor';

export class ProductoPage {

  async botonComprarLibro(){
    await element(by.css('.button-buy')).click();
  }

}
