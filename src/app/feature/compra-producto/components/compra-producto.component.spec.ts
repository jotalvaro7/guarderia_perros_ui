import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompraProductoComponent } from './compra-producto.component';
import { CompraProductoService } from '../shared/service/compra-producto.service';
import { ObtenerImagenService } from '@shared/services/obtener-imagen/obtener-imagen.service';
import { Producto } from '@producto/shared/model/producto/producto';

describe('CompraProductoComponent', () => {
  let component: CompraProductoComponent;
  let fixture: ComponentFixture<CompraProductoComponent>;
  let mockCompraProductoService: jasmine.SpyObj<CompraProductoService>;
  let mockObtenerImagenService: jasmine.SpyObj<ObtenerImagenService>;


  beforeEach(async () => {
    const compraProductoServiceSpy = jasmine.createSpyObj('CompraProductoService', ['calcularPrecio']);
    const obtenerImagenServiceSpy = jasmine.createSpyObj('ObtenerImagenService', ['obtenerImagenPorId']);

    await TestBed.configureTestingModule({
      declarations: [CompraProductoComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string) => key === 'idProducto' ? '1' : '2' } } } },
        { provide: CompraProductoService, useValue: compraProductoServiceSpy },
        { provide: ObtenerImagenService, useValue: obtenerImagenServiceSpy }
      ],
    })
      .compileComponents();

    mockCompraProductoService = TestBed.inject(CompraProductoService) as jasmine.SpyObj<CompraProductoService>;
    mockObtenerImagenService = TestBed.inject(ObtenerImagenService) as jasmine.SpyObj<ObtenerImagenService>;


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraProductoComponent);
    component = fixture.componentInstance;

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

    mockCompraProductoService.calcularPrecio.and.returnValue(of(productoMock));
    mockObtenerImagenService.obtenerImagenPorId.and.returnValue(of('test_base64_image_string'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return stars based on calificacion', () => {
    const calificacion = 4;
    const stars = component.getStars(calificacion);
    expect(stars).toEqual('★★★★☆');
  });

  it('should toggle hiddenTextVisible when toggleHiddenText is called', () => {
    const event = { preventDefault: () => { } };
    component.hiddenTextVisible = false;
    component.toggleHiddenText(event as Event);
    expect(component.hiddenTextVisible).toBe(true);
  });

});
