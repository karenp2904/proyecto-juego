import * as React from 'react';
import { useState } from 'react';
import CardAdminInventario from '../../../shared/components/cards/CardAdminInventario';
import Pagination from '../../../shared/components/paginator/Paginator';
import Button from '../../../shared/components/buttons/Button';

interface IInventarioPageProps { }

const InventarioPage: React.FunctionComponent<IInventarioPageProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1); // Inicializa la página actual en 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Actualiza la página actual
    // Aquí se puede añadir lógica para cargar los datos correspondientes a la página seleccionada
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow bg-quaternary overflow-y-auto'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-6 xl:gap-x-10 2xl:gap-x-20 gap-4 py-5 px-5" style={{ minHeight: 'calc(100% - 80px)' }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="h-full min-h-[200px] bg-quinary rounded-lg shadow-md flex flex-col">
              <CardAdminInventario />
            </div>
          ))}
        </div>
        <div className='py-2'>
        <Pagination currentPage={currentPage} totalPages={100} onPageChange={handlePageChange} />
      </div>
      </div>
      
    </div>
  );
};

export default InventarioPage;
