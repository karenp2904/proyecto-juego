import React, { useEffect, useState } from "react";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DiceInput, {
  DiceInputValue,
} from "../../../../shared/components/inputs/DiceInput";
import Button from "../../../../shared/components/buttons/Button";
import { EpicaData } from "../CrearEpicaPage";
import { TiposService } from "../../../../../services/Tipos";

interface EpicaFormProps {
  EpicaData: EpicaData;
  onSubmit: () => void;
  setEpicaData: React.Dispatch<React.SetStateAction<EpicaData>>;
}

type SelectOption = {
  value: string;
  label: string;
};

const EpicaForm: React.FC<EpicaFormProps> = ({
  EpicaData,
  onSubmit,
  setEpicaData,
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
  //   TiposService.obtenerSubTipos(EpicaData.tipo)
  //       .then(res => {
  //         console.log("subpepe", res);
  //         setSubTipos(res.map(t => ({
  //           label: t.descripcion,
  //           value: t._id
  //         })));
  //       });
  // }, [EpicaData])

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await TiposService.obtenerTipos();
        if (res.length > 0) {
          const tipo = res[0]._id; // Asigna el primer tipo por defecto
          setTipos(res.map(t => ({ label: t.descripcion, value: t._id })));
          setEpicaData((prev) => ({ ...prev, tipo }));
        }
      } catch (err) {
        console.error("Error al obtener tipos:", err);
      }
    };

    fetchTipos();
  }, []);

  useEffect(() => {
    const fetchSubTipos = async () => {
      if (EpicaData.tipo) { // Solo si el tipo es válido
        try {
          const res = await TiposService.obtenerSubTipos(EpicaData.tipo);
          if (res.length > 0) {
            const subtipo = res[0]._id; // Asigna el primer subtipo por defecto
            setSubTipos(res.map(t => ({ label: t.descripcion, value: t._id })));
            setEpicaData((prev) => ({ ...prev, subtipo }));
          }
        } catch (err) {
          console.error("Error al obtener subtipos:", err);
        }
      }
    };

    fetchSubTipos();
  }, [EpicaData.tipo]);


  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEpicaData((prev) => ({ ...prev, tipo: e.target.value }));
  };

  const handleSubtipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEpicaData((prev) => ({ ...prev, subtipo: e.target.value }));
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEpicaData(prevState => ({
      ...prevState,
      epica: {
        ...prevState.epica,
        nombre: value
      }
    }));
  };


  const handleArmasChange = (
    name: keyof EpicaData["epica"],
    value: number
  ) => {
    setEpicaData((prev) => ({
      ...prev,
      epica: {
        ...prev.epica,
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
            value={EpicaData.tipo}
            name="tipo"
            onChange={handleTipoChange}
            options={tipoOptions}
          />
          <Select
            id="subtipo-select"
            label="Subtipo:"
            value={EpicaData.subtipo}
            name="subtipo"
            onChange={handleSubtipoChange}
            options={subtipoOptions}
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          epica
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
          <Input
            id={"iiii"}
            label={"Nombre:"}
            value={EpicaData.epica.nombre.toString()}
            name="nombre"
            onChange={handleNombreChange}

          />
          <Input
            id={""}
            label={"Efectos:"}
            value={EpicaData.epica.efectos.toString()}
            name="efectos"
            onChange={(e) =>
              handleArmasChange("efectos", Number(e.target.value))
            }
          />
          <Input
            id={""}
            label={"Porcentaje de Caída:"}
            value={EpicaData.epica.porcentajeCaida.toString()}
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
          onClick={() => { console.log("hola") }}
        />
      </div>
    </form>
  );
};

export default EpicaForm;