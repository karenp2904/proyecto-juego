import * as React from 'react';
import { useEffect, useState } from 'react';
import CardAdminInventario from '../../../shared/components/cards/CardAdminInventario';
import Pagination from '../../../shared/components/paginator/Paginator';
import { getProductosInventario } from '../../../../services/InventarioService';

interface IInventarioPageProps { }
const InventarioPage: React.FunctionComponent<IInventarioPageProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProductos = async (page: number) => {
    try {
      const response = await getProductosInventario({ page, limit: 12 });
      setProductos(response.data);
      setTotalPages(response.totalPages as number);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow bg-quaternary overflow-y-auto'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-6 xl:gap-x-10 2xl:gap-x-20 gap-4 py-5 px-5" style={{ minHeight: 'calc(100% - 80px)' }}>
          {productos.length > 0 ? productos.map(producto => (
            <div key={producto._id} className="h-full min-h-[200px] bg-quinary rounded-lg shadow-md flex flex-col">
              <CardAdminInventario 
                producto={producto} 
                onDelete={fetchProductos.bind(null, currentPage)} // Pasa la función fetchProductos como callback
              />
            </div>
          )) : (
            <div>No hay productos disponibles</div>
          )}
        </div>
        <div className='py-2'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default InventarioPage;
