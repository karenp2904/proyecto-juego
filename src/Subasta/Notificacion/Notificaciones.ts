import Environment from "../../shared/Environment";
export default class Notificaciones {
    private static mensaje: string = '';

    public static anunciarGanador = async (idAuction: string) => {
        const response = await fetch(`${Environment.getDomain()}/api/winnerAuction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idauction: idAuction }),
        });
    
        if (response.ok) {
            const data = await response.json();
            this.mensaje = data.answer;
            console.log(data)
            // Guardar el mensaje en memoria local (localStorage)
            localStorage.setItem('mensajeGanador', this.mensaje);
        } else {
            const errorData = await response.json();
            console.log('Error:', errorData);
        }
    };
    
    // Método adicional para obtener el mensaje desde localStorage
    public static obtenerMensajeGanador(): string | null {
        return localStorage.getItem('mensajeGanador');
    }
}
