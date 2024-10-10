import React, { useEffect, useState } from "react";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DiceInput, {
  DiceInputValue,
} from "../../../../shared/components/inputs/DiceInput";
import Button from "../../../../shared/components/buttons/Button";
import { ArmaduraData } from "../CrearArmaduraPage";
import { TiposService } from "../../../../../services/Tipos";

interface ArmaduraFormProps {
  ArmaduraData: ArmaduraData;
  onSubmit: () => void;
  setArmaduraData: React.Dispatch<React.SetStateAction<ArmaduraData>>;
}

type SelectOption = {
  value: string;
  label: string;
};

const ArmaduraForm: React.FC<ArmaduraFormProps> = ({
  ArmaduraData,
  onSubmit,
  setArmaduraData,
}) => {

  const [tipoOptions, setTipos] = useState<SelectOption[]>([]);
  const [subtipoOptions, setSubTipos] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await TiposService.obtenerTipos();
        if (res.length > 0) {
          const tipo = res[0]._id; // Asigna el primer tipo por defecto
          setTipos(res.map(t => ({ label: t.descripcion, value: t._id })));
          setArmaduraData((prev) => ({ ...prev, tipo }));
        }
      } catch (err) {
        console.error("Error al obtener tipos:", err);
      }
    };
  
    fetchTipos();
  }, []);
  
  useEffect(() => {
    const fetchSubTipos = async () => {
      if (ArmaduraData.tipo) { // Solo si el tipo es válido
        try {
          const res = await TiposService.obtenerSubTipos(ArmaduraData.tipo);
          if (res.length > 0) {
            const subtipo = res[0]._id; // Asigna el primer subtipo por defecto
            setSubTipos(res.map(t => ({ label: t.descripcion, value: t._id })));
            setArmaduraData((prev) => ({ ...prev, subtipo }));
          }
        } catch (err) {
          console.error("Error al obtener subtipos:", err);
        }
      }
    };
  
    fetchSubTipos();
  }, [ArmaduraData.tipo]);

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArmaduraData((prev) => ({ ...prev, tipo: e.target.value }));
  };

  const handleSubtipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArmaduraData((prev) => ({ ...prev, subtipo: e.target.value }));
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setArmaduraData(prevState => ({
        ...prevState,
        armadura: {
            ...prevState.armadura,
            nombre: value
        }
    }));
};



  const handleArmaduraChange = (
    name: keyof ArmaduraData["armadura"],
    value: number
  ) => {
    console.log(value)
    setArmaduraData((prev) => ({
      ...prev,
      armadura: {
        ...prev.armadura,
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
            value={ArmaduraData.tipo}
            name="tipo"
            onChange={handleTipoChange}
            options={tipoOptions}
          />
          <Select
            id="subtipo-select"
            label="Subtipo:"
            value={ArmaduraData.subtipo}
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
            value={ArmaduraData.armadura.nombre.toString()}
            name="nombre"
            onChange={handleNombreChange}

        />
          <Input
            id={""}
            label={"Efectos:"}
            value={ArmaduraData.armadura.efectos.toString()}
            name="efectos"
            onChange={(e) =>
              handleArmaduraChange("efectos", Number(e.target.value))
            }
          />
          <Input
            id={""}
            label={"Porcentaje de Caída:"}
            value={ArmaduraData.armadura.porcentajeCaida.toString()}
            name="porcentajeCaida"
            onChange={(e) =>
              handleArmaduraChange(
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

export default ArmaduraForm;