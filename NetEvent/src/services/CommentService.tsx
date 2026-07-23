

export const crearComment = async (eventId: string, texto: string) => {
    
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Debes iniciar sesión para comentar");
    };


    const response = await fetch(`http://localhost:5000/api/eventos/${eventId}/comments`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            texto,
        }),
    });

    const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear comentario");
  }

  return data;

};

export const cargarComentarios = async (eventId: string ) => {
    const res = await fetch(`http://localhost:5000/api/eventos/${eventId}/comments`);

    if (!res.ok){
        throw new Error("Error al cargar los comentarios")
    }

    return await res.json();
};


