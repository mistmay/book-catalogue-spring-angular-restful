import { Genre } from "./genre";
import { Author } from "./author";

export interface Book {
    id?: number;
    title: string;
    author: Author;
    genres: Genre[];
}