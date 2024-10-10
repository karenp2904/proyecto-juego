import * as React from 'react';
import TextArea from '../../../shared/components/inputs/TextArea';
import ImagePicker from '../../../shared/components/imagepicker/ImagePicker';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArmaService } from '../../../../services/ArmaService';
import { getProductoById } from '../../../../services/InventarioService';
import ArmaForm from '../crearArma/components/ArmaForm';
import { TiposService } from '../../../../services/Tipos';
import ArmaFormEdit from './components/ArmaFormEdit';
export interface ArmaDataEdit {
  _id: string;
  descripcion: string;
  stock: number,
  armas: {
    nombre: string;
    efectos: string;
    porcentajeCaida: number;
  };
}

interface IInventarioDetallePageProps { }

export const EditarArma: React.FunctionComponent<IInventarioDetallePageProps> = () => {
  const { id } = useParams<{ id: any }>();
  const [file, setFile] = useState<File | null>(null);
  const [ArmData, setArmData] = useState<ArmaDataEdit>({
    _id: '',
    descripcion: '',
    stock: -1,
    armas: {
      nombre: '',
      efectos: '',
      porcentajeCaida: 0
    }
  });


  React.useEffect(() => {
    const fetchProducto = async () => {
      try {
        console.log(id)
        if (id) {
          const producto = await getProductoById(id as string);
          console.log(producto)

          setArmData({
            _id: producto._id,
            descripcion: producto.descripcion ?? '',  // Si el producto no tiene un campo 'descripcion', puedes dejarlo vacío
            stock: producto.stock,
            armas: {
              nombre: producto.nombre,
              efectos: producto.efectos ?? '',  // El campo 'efectos' no existe, lo dejamos vacío
              porcentajeCaida: producto.tasaCaida  // Mapea el valor de 'tasaCaida'
            }
          });
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArmData({
      ...ArmData,
      descripcion: e.target.value
    });
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const guardar = () => {
    if (!file) return;

    //ArmaService.guardarArma(ArmData, file);
  }

  return (
    <div className="flex flex-col flex-grow overflow-y-auto sm:flex-row h-full">
      {/* Contenedor izquierdo */}
      <div className='h-auto sm:h-full w-full sm:w-[40%] xl:w-[25%] flex flex-col justify-start items-center'>
        <div className="w-3/4 aspect-square flex justify-center items-center">
          {/* Contenido del lado izquierdo */}
          <ImagePicker defaultImageUrl={undefined} onChange={handleFileChange} />
        </div>

        <div className='w-full flex-grow h-[200px] sm:h-auto'>
          <TextArea label={'Descripcion:'} value={ArmData.descripcion} placeholder='Type hero description ...' rows={10} onChange={handleDescriptionChange} />
        </div>
      </div>
      {/* Contenedor derecho con scroll */}
      <div className="w-full sm:w-[60%] xl:w-[75%] bg-quaternary sm:overflow-y-auto p-4 flex-1">
        <ArmaFormEdit
          ArmaDataEdit={ArmData}
          setArmaData={setArmData}
          onSubmit={guardar}
        />
      </div>
    </div>
  );
};