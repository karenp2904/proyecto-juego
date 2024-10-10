import React, { useEffect, useState } from "react";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import Button from "../../../../shared/components/buttons/Button";
import { ArmaData } from "../CrearArmaPage";
import { TiposService } from "../../../../../services/Tipos";

interface ArmaFormProps {
  ArmaData: ArmaData;
  onSubmit: () => void;
  setArmaData: React.Dispatch<React.SetStateAction<ArmaData>>;
}

type SelectOption = {
  value: string;
  label: string;
};

const ArmaForm: React.FC<ArmaFormProps> = ({
    ArmaData,
  onSubmit,
  setArmaData,
}) => {

  const [tipoOptions, setTipos] = useState<SelectOption[]>([]);
  const [subtipoOptions, setSubTipos] = useState<SelectOption[]>([]);

  // useEffect(() => {
  //   console.log("ASFASFASFASFASF");
  //   TiposService.obtenerTipos()
  //     .then(res => {
  //       console.log("pepe", res);
  //       setTipos(res.map(t => ({
  //         label: t.descripcion,
  //         value: t._id
  //       })));
  //     });
  // }, []);

  // useEffect(() => {
  //   TiposService.obtenerSubTipos(ArmaData.tipo)
  //       .then(res => {
  //         console.log("subpepe", res);
  //         setSubTipos(res.map(t => ({
  //           label: t.descripcion,
  //           value: t._id
  //         })));
  //       });
  // }, [ArmaData])

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await TiposService.obtenerTipos();
        if (res.length > 0) {
          const tipo = res[0]._id; // Asigna el primer tipo por defecto
          setTipos(res.map(t => ({ label: t.descripcion, value: t._id })));
          setArmaData((prev) => ({ ...prev, tipo }));
        }
      } catch (err) {
        console.error("Error al obtener tipos:", err);
      }
    };
  
    fetchTipos();
  }, []);
  
  useEffect(() => {
    const fetchSubTipos = async () => {
      if (ArmaData.tipo) { // Solo si el tipo es válido
        try {
          const res = await TiposService.obtenerSubTipos(ArmaData.tipo);
          if (res.length > 0) {
            const subtipo = res[0]._id; // Asigna el primer subtipo por defecto
            setSubTipos(res.map(t => ({ label: t.descripcion, value: t._id })));
            setArmaData((prev) => ({ ...prev, subtipo }));
          }
        } catch (err) {
          console.error("Error al obtener subtipos:", err);
        }
      }
    };
  
    fetchSubTipos();
  }, [ArmaData.tipo]);
  

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArmaData((prev) => ({ ...prev, tipo: e.target.value }));
  };

  const handleSubtipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArmaData((prev) => ({ ...prev, subtipo: e.target.value }));
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setArmaData(prevState => ({
          ...prevState,
          armas: {
              ...prevState.armas,
              nombre: value
          }
      }));
  };
  

  const handleArmasChange = (
    name: keyof ArmaData["armas"],
    value: number
  ) => {
    setArmaData((prev) => ({
      ...prev,
      armas: {
        ...prev.armas,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalle</h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
          <Select
            id="tipo-select"
            label="Tipo:"
            value={ArmaData.tipo}
            name="tipo"
            onChange={handleTipoChange}
            options={tipoOptions}
          />
          <Select
            id="subtipo-select"
            label="Subtipo:"
            value={ArmaData.subtipo}
            name="subtipo"
            onChange={handleSubtipoChange}
            options={subtipoOptions}
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Armas
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
        <Input
            id={"iiii"}
            label={"Nombre:"}
            value={ArmaData.armas.nombre.toString()}
            name="nombre"
            onChange={handleNombreChange}

        />
          <Input
            id={""}
            label={"Efectos:"}
            value={ArmaData.armas.efectos.toString()}
            name="efectos"
            onChange={(e) =>
              handleArmasChange("efectos", Number(e.target.value))
            }
          />
          <Input
            id={""}
            label={"Porcentaje de Caída:"}
            value={ArmaData.armas.porcentajeCaida.toString()}
            name="porcentajeCaida"
            onChange={(e) =>
              handleArmasChange(
                "porcentajeCaida",
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-end justify-center">
        <Button
          name={"GUARDAR"}
          type="submit"
          onClick={()=>{console.log("hola")}}
        />
      </div>
    </form>
  );
};

export default ArmaForm;