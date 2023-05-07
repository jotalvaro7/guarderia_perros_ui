import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';
import { ProductoService } from './producto.service';
import { Producto } from '../model/producto/producto';
import { of } from 'rxjs';

describe('ProductoService', () => {
  let httpMock : HttpTestingController;
  let service: ProductoService;
  let httpService: HttpService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ProductoService);
    httpService = TestBed.inject(HttpService);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("deberia obtener los productos y retornar la lista de productos", () => {

    const productosMock: Producto[] = [
      {
        bookDto: {
          id: 1,
          title: "Harry Potter y el prisionero de Azkaban",
          author: "J.K Rowling",
          price: 50000.0,
          port: 2000,
        },
        ratingDto: {
          id: 1,
          bookId: 1,
          starts: 5,
          port: 2001,
        },
        cantidad: 1,
        totalPrice: 50000.0,
        selectedNumber: 1,
        image: ""
      },
      {
        bookDto: {
          id: 2,
          title: "El señor de los anillos",
          author: "J.R.R. Tolkien",
          price: 50000.0,
          port: 2000,
        },
        ratingDto: {
          id: 2,
          bookId: 2,
          starts: 5,
          port: 2001,
        },
        cantidad: 1,
        totalPrice: 50000.0,
        selectedNumber: 1,
        image: ""
      },
    ];


    spyOn(httpService, 'doGet').and.returnValue(of(productosMock));

    service.obtenerProductos().subscribe(response => {
      expect(response).toEqual(productosMock);
    });

    expect(httpService.doGet).toHaveBeenCalledWith('/products/api/v1/listar',
      jasmine.objectContaining({
        headers: jasmine.any(Object),
      })
    );

  })

});
