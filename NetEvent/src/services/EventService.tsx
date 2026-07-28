
interface ApiMessageResponse {
  message: string;
}

export const traerEventosTodos = async (): Promise<any> => {
    const res = await fetch("http://localhost:5000/api/eventos");

    const data = await res.json();

    if(!res.ok) throw new Error(data.message || "Error al cargar los eventos")

    return data;
}

export const traerEvento = async (eventId: string): Promise<any> => {
    const res = await fetch(`http://localhost:5000/api/eventos/${eventId}`);

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al cargar el evento");

    return data;
}

export const traerMisEventos = async (token: string): Promise<any> => {
    const res = await fetch("http://localhost:5000/api/eventos/mis-eventos", {
        headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Ocurrio un error cargando tus eventos");

    return data;
}

export const publicarEvento = async (evento: {
    titulo: string,
    descripcion: string,
    fecha: string,
    ubicacion: string,
    tags: string[],
    imagenes: string [],
    charlas: any[]
}, token: string): Promise<any> => {

    if (!token) throw new Error("Debe estar autenticado para publicar un evento")
    if (!evento.titulo.trim()) throw new Error("Debe colocarle un titulo al evento")
    if (!evento.descripcion.trim()) throw new Error("Debe agregar una descripción al evento")
    if (!evento.fecha) throw new Error("Debe seleccionar una fecha al evento")
    if (!evento.charlas) throw new Error("Debes ingresar el cronograma de charlas")

    const res = await fetch("http://localhost:5000/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(evento)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al cargar el evento")

}

export const inscribirUsuario = async (eventId: string, token:string): Promise<ApiMessageResponse> => {

    const res = await fetch(`http://localhost:5000/api/inscripciones/${eventId}`,
        {
            method: "POST",
            headers: { Authorization : `Bearer ${token}`}
        }
    );

    const data: ApiMessageResponse = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al incribirse");

    return data;
}

export const finalizarEvento = async (eventId: string, token: string, estado: boolean): Promise<any> => {
    
    const res = await fetch(`http://localhost:5000/api/eventos/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ estado }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "No se pudo finalizar el evento")

    return data;
}