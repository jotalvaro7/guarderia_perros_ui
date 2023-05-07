import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ProductoComponent } from "./producto.component";
import { ProductoService } from "@producto/shared/service/producto.service";
import { ObtenerImagenService } from "@shared/services/obtener-imagen/obtener-imagen.service";
import { RouterTestingModule } from "@angular/router/testing";
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
  let obtenerImagenService: ObtenerImagenService;
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [ProductoService, HttpService, ObtenerImagenService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    obtenerImagenService = TestBed.inject(ObtenerImagenService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    spyOn(productoService, "obtenerProductos").and.returnValue(of(productosMock));
    spyOn(obtenerImagenService, "obtenerImagenPorId").and.returnValue(of("base64Image"));

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with a list of products", () => {
    expect(component.productos.length).toBe(2);
  });

  it("should update selectedNumber of a product", () => {
    const newSelectedNumber = 5;
    const productToUpdate = component.productos[0];

    component.actualizarSeleccion(newSelectedNumber, productToUpdate);

    expect(productToUpdate.selectedNumber).toBe(newSelectedNumber);
  });

  it("should return a string with starts base on rating", () => {
    const rating = 3;
    const expectedStarts = "★★★☆☆";

    const starts = component.getStars(rating);

    expect(starts).toBe(expectedStarts);
  });

  it('should navigate to be correct URL when botonResumenCompra is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.botonResumenCompra('1', 2);

    expect(navigateSpy).toHaveBeenCalledWith(['comprar/1/cantidad/2'], {
      relativeTo: route,
    })

  })

});
