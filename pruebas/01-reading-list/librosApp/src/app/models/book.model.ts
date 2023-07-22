export interface Book {
    library: Library[];
}

export interface Library {
    book: BookClass;
}

export interface BookClass {
    title:    string;
    pages:    number;
    genre:    string;
    cover:    string;
    synopsis: string;
    year:     number;
    ISBN:     string;
    author:   Author;
}

export interface Author {
    name:       string;
    otherBooks: string[];
}
