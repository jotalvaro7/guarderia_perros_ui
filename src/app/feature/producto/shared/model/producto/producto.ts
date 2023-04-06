import { Rating } from "../calificacion/rating";
import { Book } from "../libro/book";

export class Producto {
    bookDto: Book;
    ratingDto: Rating;
    cantidad: number;
    totalPrice: number;
    selectedNumber?: number;
}