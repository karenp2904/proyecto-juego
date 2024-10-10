export interface ResponseGeneric<T> {
    isSuccess: boolean;
    data?: T; 
    message?: string;
    validateErrors?: any; 
    customErrors?: any; 
  }
  

  export interface ResponsePginated<T> {
    isSuccess: boolean;
    data?: T; 
    message?: string;
    validateErrors?: any; 
    customErrors?: any; 
    pageNumber?: number; // Número de la página actual
    totalPages?: number; // Total de páginas disponibles
    totalCount?: number; // Total de elementos disponibles
  }