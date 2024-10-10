import * as React from "react";
import { MdDelete, MdEdit, MdRestoreFromTrash } from "react-icons/md"; // Importa los íconos de caneca de basura y recuperar
import apiClient from "../../../../services/config/AxiosConfig";
import { ITipo, TiposService } from "../../../../services/Tipos";
import { deleteProductoById } from "../../../../services/InventarioService";
import { useNavigate } from 'react-router-dom';

interface ICardAdminInventarioProps {
  producto: {
    _id: string;
    producto: string; // Asegúrate de que esta propiedad exista en tu objeto
    stock: number; // Otras propiedades que quieras incluir
    tipo: string;
    subtipo: string;
    nombre: string
    // Agrega aquí otras propiedades que sean relevantes para tu aplicación
  };
  onDelete: () => void;

}



const CardAdminInventario: React.FunctionComponent<ICardAdminInventarioProps> = (props) => {
  const [isSuspended, setIsSuspended] = React.useState(false); // Estado para manejar el estado del botón
  const [nombre, setNombre] = React.useState('');
  const [subTipos, setSubTipos] = React.useState<ITipo[]>([]);
  const navigate = useNavigate();

  const handleEdit = () => {
    /*
    console.log(props.producto.producto )
    if (props.producto.producto === 'Arma') {
      navigate(`/admin/inventario/editarArma/${props.producto._id}`);
    } else {
      navigate(`/admin/inventario/editar/${props.producto._id}`);
    }*/
  };
  
  
  const handleToggle = async () => {
    if (isSuspended) {
      // Implementar lógica para recuperar si es necesario
      console.log("Recovering");
    } else {
      try {
        await deleteProductoById(props.producto._id);
        console.log("Producto borrado");
        props.onDelete(); // Llama al callback para refrescar la lista
      } catch (error) {
        console.error("Error al borrar el producto:", error);
      }
    }
    setIsSuspended(!isSuspended);
  };
  

  React.useEffect(() => {
    const fetchSubTipos = async () => {
      setIsSuspended(props.producto.stock == 0);
      if (props.producto.producto === 'Heroe' && props.producto.tipo) {
        try {
          const resTipos = await TiposService.obtenerTipos(); // Obtiene todos los tipos
          const resSubTipos = await TiposService.obtenerSubTipos(props.producto.tipo); // Obtiene subtipos específicos

          // Verifica que resTipos sea un arreglo y contenga elementos válidos
          if (Array.isArray(resTipos) && resTipos.length > 0) {
            const tipoEncontrado = resTipos.find(tipo => tipo._id === props.producto.tipo); // Busca el tipo por ID
            if (tipoEncontrado) {
              const subtipo = resSubTipos[0]; // Asigna el primer subtipo por defecto
              // Asegúrate de que subtipo tenga las propiedades necesarias
              if (subtipo && subtipo.descripcion) {
                setSubTipos(resSubTipos); // Puedes ajustar esto si deseas mapear a otra estructura
                setNombre(`${tipoEncontrado.descripcion} - ${subtipo.descripcion}`); // Concatenando tipo y subtipo
              }
            } else {
              console.error("No se encontró el tipo correspondiente:", props.producto.tipo);
            }
          } else {
            console.error("No se encontraron tipos válidos:", resTipos);
          }
        } catch (err) {
          console.error("Error al obtener subtipos:", err);
        }
      } else {
        setNombre(props.producto.nombre); // Usar el nombre directamente si no es un héroe
      }
    };

    fetchSubTipos();
  }, [props.producto.tipo, props.producto.producto]);


  // Genera la URL de la imagen
  const imageUrl = `${apiClient.defaults.baseURL}/inventario/image/${props.producto._id}`;

  return (
    <div className="h-full w-full bg-tertiary rounded-lg shadow-md transition-transform transform hover:scale-105">
      <div
        className="relative h-[60%] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${imageUrl})` }} // Establece la imagen de fondo aquí
      >
        {isSuspended ? null : <button
          className={`absolute top-0 right-0 w-12 h-12 flex items-center justify-center rounded-md ${isSuspended ? "bg-red-500 hover:bg-red-600" : "bg-red-500 hover:bg-red-600"
            } text-white`}
          onClick={handleToggle}
          aria-label={"Suspend"}
        >
          <MdDelete className="w-6 h-6" />
        </button>}
        <button
          className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center rounded-md text-white bg-blue-500 hover:bg-blue-600"
          onClick={handleEdit}
          aria-label="Edit"
        >
          <MdEdit className="w-6 h-6" />
        </button>
        <div className="w-full absolute bottom-0 text-white text-center flex flex-col items-center">
          <div className="bg-opacity-50 backdrop-blur-md py-1 px-2 rounded-lg">
            <span className="font-bold">
              {nombre} {/* Aquí debes acceder a la propiedad correcta del producto */}
            </span>
          </div>

        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-semibold text-white">
          Tipo : {props.producto.producto} {/* Aquí debes acceder a la propiedad correcta del producto */}
        </span>
        <span className="font-semibold text-white">
          Stock : {props.producto.stock == -1 ? 'Unlimited' : props.producto.stock} {/* Aquí debes acceder a la propiedad correcta del producto */}
        </span>
      </div>
    </div>
  );
};

export default CardAdminInventario;
