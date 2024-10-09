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
  setHeroData: React.Dispatch<React.SetStateAction<EpicaData>>;
}

type SelectOption = {
  value: string;
  label: string;
};

const EpicaForm: React.FC<EpicaFormProps> = ({
    EpicaData,
  onSubmit,
  setHeroData,
}) => {

  const [tipoOptions, setTipos] = useState<SelectOption[]>([]);
  const [subtipoOptions, setSubTipos] = useState<SelectOption[]>([]);

  useEffect(() => {
    console.log("ASFASFASFASFASF");
    TiposService.obtenerTipos()
      .then(res => {
        console.log("pepe", res);
        setTipos(res.map(t => ({
          label: t.descripcion,
          value: t._id
        })));
      });
  }, []);

  useEffect(() => {
    TiposService.obtenerSubTipos(EpicaData.tipo)
        .then(res => {
          console.log("subpepe", res);
          setSubTipos(res.map(t => ({
            label: t.descripcion,
            value: t._id
          })));
        });
  }, [EpicaData])

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHeroData((prev) => ({ ...prev, tipo: e.target.value }));
  };

  const handleSubtipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHeroData((prev) => ({ ...prev, subtipo: e.target.value }));
  };

  const handlePoderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroData((prev) => ({
      ...prev,
      estadisticas: { ...prev.estadisticas, poder: Number(e.target.value) },
    }));
  };

  const handleVidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroData((prev) => ({
      ...prev,
      estadisticas: { ...prev.estadisticas, vida: Number(e.target.value) },
    }));
  };

  const handleDefensaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroData((prev) => ({
      ...prev,
      estadisticas: { ...prev.estadisticas, defensa: Number(e.target.value) },
    }));
  };

  const handleEstadisticasChange = (
    name: keyof EpicaData["estadisticas"],
    value: DiceInputValue
  ) => {
    setHeroData((prev) => ({
      ...prev,
      estadisticas: {
        ...prev.estadisticas,
        [name]: value,
      },
    }));
  };

  const handleArmasChange = (
    name: keyof EpicaData["armas"],
    value: number
  ) => {
    setHeroData((prev) => ({
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
          Estadisticas
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
          <Input
            id={""}
            type="number"
            label={"Poder:"}
            value={EpicaData.estadisticas.poder.toString()}
            name="poder"
            onChange={handlePoderChange}
          />
          <Input
            id={""}
            label={"Vida:"}
            value={EpicaData.estadisticas.vida.toString()}
            name="vida"
            onChange={handleVidaChange}
          />
          <Input
            id={""}
            label={"Defensa:"}
            value={EpicaData.estadisticas.defensa.toString()}
            name="defensa"
            onChange={handleDefensaChange}
          />
          {/* <DiceInput
            id={""}
            label={"Ataque:"}
            value={ArmaData.estadisticas.ataque}
            onChange={(newValue) =>
              handleEstadisticasChange("ataque", newValue)
            }
          /> */}
          {/* <DiceInput
            id={""}
            label={"Daño:"}
            value={ArmaData.estadisticas.daño}
            onChange={(newValue) => handleEstadisticasChange("daño", newValue)}
          /> */}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Probabilidades
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
          <Input
            id={""}
            label={"Efectos:"}
            value={EpicaData.armas.efectos.toString()}
            name="efectos"
            onChange={(e) =>
              handleArmasChange("efectos", Number(e.target.value))
            }
          />
                    <Input
            id={""}
            label={"Porcentaje de Caída:"}
            value={EpicaData.armas.porcentajeCaida.toString()}
            name="porcentajeCaida"
            onChange={(e) =>
              handleArmasChange(
                "porcentajeCaida",
                Number(e.target.value)
              )
            }
          />
          {/* <Input
            id={""}
            label={"Daño Crítico:"}
            value={ArmaData.probabilidadDeAtaque.dañoCritico.toString()}
            name="dañoCritico"
            onChange={(e) =>
              handleProbabilidadDeAtaqueChange(
                "dañoCritico",
                Number(e.target.value)
              )
            }
          />
          <Input
            id={""}
            label={"Evadir Golpe:"}
            value={ArmaData.probabilidadDeAtaque.evadirGolpe.toString()}
            name="evadirGolpe"
            onChange={(e) =>
              handleProbabilidadDeAtaqueChange(
                "evadirGolpe",
                Number(e.target.value)
              )
            }
          />
          <Input
            id={""}
            label={"Resistir Golpe:"}
            value={ArmaData.probabilidadDeAtaque.resistirGolpe.toString()}
            name="resistirGolpe"
            onChange={(e) =>
              handleProbabilidadDeAtaqueChange(
                "resistirGolpe",
                Number(e.target.value)
              )
            }
          />
          <Input
            id={""}
            label={"Escapar Golpe:"}
            value={ArmaData.probabilidadDeAtaque.escaparGolpe.toString()}
            name="escaparGolpe"
            onChange={(e) =>
              handleProbabilidadDeAtaqueChange(
                "escaparGolpe",
                Number(e.target.value)
              )
            }
          />
          <Input
            id={""}
            label={"No Daño:"}
            value={ArmaData.probabilidadDeAtaque.noDaño.toString()}
            name="noDaño"
            onChange={(e) =>
              handleProbabilidadDeAtaqueChange("noDaño", Number(e.target.value))
            }
          /> */}
        </div>
      </div>
      <div className="w-full flex flex-col items-end justify-center">
        <Button
          name={"GUARDAR"}
          type="submit"
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default EpicaForm;