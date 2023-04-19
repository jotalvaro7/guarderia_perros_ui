import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ProductoComponent } from "./producto.component";
import { ProductoService } from "@producto/shared/service/producto.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "@shared/material/material-module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Producto } from "@producto/shared/model/producto/producto";
import { of } from "rxjs";
import { HttpService } from "@core/services/http.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from "@angular/router";

describe("ProductoComponent", () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;
  let productoService: ProductoService;
  let spyProductoServiceObtenerProductos: jasmine.Spy;
  let router: Router;
  let route: ActivatedRoute;

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
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [ProductoService, HttpService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    spyProductoServiceObtenerProductos = spyOn(
      productoService,
      "obtenerProductos"
    ).and.returnValue(of(productosMock));
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("deberia obtener los productos", () => {
    component.obtenerProductos();
    expect(spyProductoServiceObtenerProductos).toHaveBeenCalled();
  });

  it("deberia retornar el monto correcto de estrellas", () => {
    expect(component.getStars(1)).toBe("★☆☆☆☆");
    expect(component.getStars(2)).toBe("★★☆☆☆");
    expect(component.getStars(3)).toBe("★★★☆☆");
    expect(component.getStars(4)).toBe("★★★★☆");
    expect(component.getStars(5)).toBe("★★★★★");
  });

  it('deberia navegar a la ruta correcta cuando botonResumenCompra es llamado', () => {
    const routerSpy = spyOn(router, 'navigate');
    const idProducto = '1';
    const cantidad = '5';

    component.botonResumenCompra(idProducto, cantidad);

    expect(routerSpy).toHaveBeenCalledWith(
      [`comprar/${idProducto}/cantidad/${cantidad}`],
      { relativeTo: route }
    );
  });
});
