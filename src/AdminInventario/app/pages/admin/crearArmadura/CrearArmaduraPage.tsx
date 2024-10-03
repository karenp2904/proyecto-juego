import * as React from 'react';
import ArmaduraForm from './components/ArmaduraForm';
import TextArea from '../../../shared/components/inputs/TextArea';
import { DiceInputValue } from '../../../shared/components/inputs/DiceInput';
import ImagePicker from '../../../shared/components/imagepicker/ImagePicker';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById } from '../../../../services/InventarioService';
import { ArmaduraService } from '../../../../services/ArmaduraService';

export interface ArmaduraData {
    _id: string;
    tipo: string;
    subtipo: string;
    descripcion: string;
    estadisticas: {
      poder: number;
      vida: number;
      defensa: number;
    };
    armadura: {
      set: number;
      nombre: string;
      efectos: string;
      porcentajeCaida: number;
    };
  } 

interface IInventarioDetallePageProps { }

export const CrearArmaduraPage: React.FunctionComponent<IInventarioDetallePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [ArmaduraData, setArmaduraData] = useState<ArmaduraData>({
    _id: '',
    tipo: '',
    subtipo: '',
    descripcion: '',
    estadisticas: {
      poder: 0,
      vida: 0,
      defensa: 0,
    },
    armadura: {
        set: 0,
        nombre: '',
        efectos: '',
        porcentajeCaida: 0
      }
  });

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const producto = await getProductoById(id as string);
        // Aquí puedes actualizar el estado con los datos del producto
        setArmaduraData(producto);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArmaduraData({
      ...ArmaduraData,
      descripcion: e.target.value
    });
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const guardar = () => {
    if(!file) return;

    ArmaduraService.guardarArma(ArmaduraData, file);
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
          <TextArea label={'Descripcion:'} value={ArmaduraData.descripcion} placeholder='Type hero description ...' rows={10} onChange={handleDescriptionChange} />
        </div>
      </div>
      {/* Contenedor derecho con scroll */}
      <div className="w-full sm:w-[60%] xl:w-[75%] bg-quaternary sm:overflow-y-auto p-4 flex-1">
        <ArmaduraForm
          ArmaduraData={ArmaduraData}
          setHeroData={setArmaduraData}
          onSubmit={guardar}
        />
      </div>
    </div>
  );
};