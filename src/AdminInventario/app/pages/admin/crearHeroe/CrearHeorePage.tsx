import * as React from 'react';
import HeroeForm from './components/HeroeForm';
import TextArea from '../../../shared/components/inputs/TextArea';
import { DiceInputValue } from '../../../shared/components/inputs/DiceInput';
import ImagePicker from '../../../shared/components/imagepicker/ImagePicker';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById } from '../../../../services/InventarioService';
import { HeroeService } from '../../../../services/HeroeService';
export interface HeroeData {
  _id: string;
  tipo: string;
  subtipo: string;
  descripcion: string;
  stock: number;
  estadisticas: {
    poder: number;
    vida: number;
    defensa: number;
    ataque: DiceInputValue;
    daño: DiceInputValue;
    acciones: string[]; // IDs de acciones
  };
  probabilidadDeAtaque: {
    daño: number;
    dañoCritico: number;
    evadirGolpe: number;
    resistirGolpe: number;
    escaparGolpe: number;
    noDaño: number;
  };
}

interface IInventarioDetallePageProps { }

export const CrearHeroePage: React.FunctionComponent<IInventarioDetallePageProps> = () => {
  // const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState< File | null>(null);
  const [heroData, setHeroData] = useState<HeroeData>({
    _id: '',
    tipo: '',
    subtipo: '',
    descripcion: '',
    stock: -1,
    estadisticas: {
      poder: 0,
      vida: 0,
      defensa: 0,
      ataque: { modificador: 0, lanzamientos: 0, caras: 'd4' },
      daño: { modificador: 0, lanzamientos: 0, caras: 'd4' },
      acciones: []
    },
    probabilidadDeAtaque: {
      daño: 0,
      dañoCritico: 0,
      evadirGolpe: 0,
      resistirGolpe: 0,
      escaparGolpe: 0,
      noDaño: 0
    }
  });

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeroData({
      ...heroData,
      descripcion: e.target.value
    });
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const guardar = () => {
    if (!file) return;
    HeroeService.guardarHeroe(heroData, file);
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
          <TextArea label={'Descripcion:'} value={heroData.descripcion} placeholder='Type hero description ...' rows={10} onChange={handleDescriptionChange} />
        </div>
      </div>
      {/* Contenedor derecho con scroll */}
      <div className="w-full sm:w-[60%] xl:w-[75%] bg-quaternary sm:overflow-y-auto p-4 flex-1">
        <HeroeForm
          HeroeData={heroData}
          setHeroData={setHeroData}
          onSubmit={guardar}
        />
      </div>
    </div>
  );
};