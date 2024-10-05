import Environment from "../../shared/Environment";
export default class Notificaciones {
    // Make mensaje static
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
            // Now you can access the static property
            this.mensaje = data.toString();
        } else {
            const errorData = await response.json();
            console.log('Error:', errorData);
        }
    }

    public static readonly getMessage = (): string => {
        if (this.mensaje) {
            return this.mensaje;
        } else {
            return 'Aún no has ganado ninguna subasta';
        }
    }
}
