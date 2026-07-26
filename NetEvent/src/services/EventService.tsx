
interface ApiMessageResponse {
  message: string;
}

export const traerEvento = async (eventId: string): Promise<any> => {
    const res = await fetch(`http://localhost:5000/api/eventos/${eventId}`);

    const data = await res.json();

    if (!res.ok){
        throw new Error(data.message);
    }

    return data;
}

export const inscribirUsuario = async (eventId: string, token:string): Promise<ApiMessageResponse> => {

    const res = await fetch(
        `http://localhost:5000/api/inscripciones/${eventId}`,
        {
            method: "POST",
            headers: { Authorization : `Bearer ${token}`}
        }
    );

    const data: ApiMessageResponse = await res.json();

    if (!res.ok){
        throw new Error(data.message);
    }

    return data;
}