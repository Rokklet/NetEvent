import { API_URL } from "../config/env";

interface ApiMessageResponse {
  message: string;
}

interface Charla {
    id: string, 
    persona: string, 
    titulo: string, 
    inicio: string, 
    fin: string}

export const traerEventosTodos = async (): Promise<any> => {
    const res = await fetch(`${API_URL}/eventos`);

    const data = await res.json();

    if(!res.ok) throw new Error(data.message || "Error al cargar los eventos")

    return data;
}

export const traerEvento = async (eventId: string): Promise<any> => {
    const res = await fetch(`${API_URL}/eventos/${eventId}`);

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al cargar el evento");

    return data;
}

export const traerMisEventos = async (token: string): Promise<any> => {
    const res = await fetch(`${API_URL}/eventos/mis-eventos`, {
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
    charlas: Charla[]
}, token: string): Promise<any> => {

    if (!token) throw new Error("Debe estar autenticado para publicar un evento")
    if (!evento.titulo.trim()) throw new Error("Debe colocarle un titulo al evento")
    if (!evento.descripcion.trim()) throw new Error("Debe agregar una descripción al evento")
    if (!evento.fecha.trim()) throw new Error("Debe seleccionar una fecha al evento")
    if (!evento.ubicacion.trim()) throw new Error("Debe ingresar la ubicación de su evento")
    if (evento.tags.length < 1) throw new Error("Debe selecciónar al menos 1 tag para el evento")
    const todosConfirmados = evento.charlas.every(c => c.persona != "" && c.titulo != "" && c.inicio != "" && c.fin != "");

    if (!todosConfirmados) throw new Error("Las charlas no pueden tener campos vacios")

    
    
    const res = await fetch(`${API_URL}/eventos`, {
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

    const res = await fetch(`${API_URL}/inscripciones/${eventId}`,
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
    
    const res = await fetch(`${API_URL}/eventos/${eventId}`, {
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