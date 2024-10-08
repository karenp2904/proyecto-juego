import * as React from 'react';
import ArmaForm from './components/ArmaForm';
import TextArea from '../../../shared/components/inputs/TextArea';
import ImagePicker from '../../../shared/components/imagepicker/ImagePicker';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArmaService } from '../../../../services/ArmaService';
import { getProductoById } from '../../../../services/InventarioService';
export interface ArmaData {
  _id: string;
  tipo: string;
  subtipo: string;
  descripcion: string;
  stock: number,
  armas: {
    nombre: string;
    efectos: string;
    porcentajeCaida: number;
  };
}

interface IInventarioDetallePageProps { }

export const CrearArmaPage: React.FunctionComponent<IInventarioDetallePageProps> = () => {
  const { id } = useParams<{ id: any }>();
  const [file, setFile] = useState<File | null>(null);
  const [ArmData, setArmData] = useState<ArmaData>({
    _id: '',
    tipo: '',
    subtipo: '',
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
        if (id != null) {
          const producto = await getProductoById(id as string);
          // Aquí puedes actualizar el estado con los datos del producto
          setArmData(producto);
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

    ArmaService.guardarArma(ArmData, file);
  }

  return (
    <div className="flex flex-col flex-grow overflow-y-auto sm:flex-row h-full">
      {/* Contenedor izquierdo */}
      <div className='h-auto sm:h-full w-full sm:w-[40%] xl:w-[25%] flex flex-col justify-start items-center'>
        <div className="w-3/4 aspect-square flex justify-center items-center">
          {/* Contenido del lado izquierdo */}
          <ImagePicker defaultImageUrl={"/hero_default.png"} onChange={handleFileChange} />
        </div>

        <div className='w-full flex-grow h-[200px] sm:h-auto'>
          <TextArea label={'Descripcion:'} value={ArmData.descripcion} placeholder='Type hero description ...' rows={10} onChange={handleDescriptionChange} />
        </div>
      </div>
      {/* Contenedor derecho con scroll */}
      <div className="w-full sm:w-[60%] xl:w-[75%] bg-quaternary sm:overflow-y-auto p-4 flex-1">
        <ArmaForm
          ArmaData={ArmData}
          setArmaData={setArmData}
          onSubmit={guardar}
        />
      </div>
    </div>
  );
};