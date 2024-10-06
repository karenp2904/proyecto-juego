export interface ResponseGeneric<T> {
    isSuccess: boolean;
    data?: T; 
    message?: string;
    validateErrors?: any; 
    customErrors?: any; 
  }
  