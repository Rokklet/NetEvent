export const obtenerPDF = async (token: string, eventId: string) => {
    const response = await fetch(
        `http://localhost:5000/api/inscripciones/${eventId}/inscriptos/pdf`,
        {
            headers: { Authorization: `Bearer ${token}`},
        }
    );

    if(!response.ok) throw new Error("Error al cargar el listado de participantes")

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `inscriptos-${eventId}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
    
}

export const verificarInscripcion = async (token: string, eventId: string) => {
    const response = await fetch(`http://localhost:5000/api/inscripciones/${eventId}/estado`,
        {
            headers: { Authorization: `Bearer ${token}`},
        }
    );

    if(!response.ok) {
        throw new Error("Error al verificar el estado del participantes")
    }

    const data = await response.json();

    return data.inscripto;
}