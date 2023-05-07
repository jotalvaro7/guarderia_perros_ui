import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';
import { Producto } from '@producto/shared/model/producto/producto';
import { CompraProductoService } from './compra-producto.service';

describe('CompraProductoService', () => {
  let service: CompraProductoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompraProductoService, HttpService]
    });
    service = TestBed.inject(CompraProductoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Producto with calcularPrecio method', () => {
    const productoMock: Producto = {
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
    };

    const productoId = '1';
    const cantidad = '2';

    service.calcularPrecio(productoId, cantidad).subscribe((producto: Producto) => {
      expect(producto).toEqual(productoMock);
    });

    const req = httpTestingController.expectOne(`/products/api/v1/listar/${productoId}/cantidad/${cantidad}`);
    expect(req.request.method).toEqual('GET');
    req.flush(productoMock);
  });
});
