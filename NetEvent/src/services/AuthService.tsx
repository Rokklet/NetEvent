import { API_URL } from "../config/env";

export const loguearse = async (values: any): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data.message || "Error al inciar sesión");

    return data;
};


export const registrarse = async (values: { 
nombre: string; 
correo: string; 
password: string;
descripcion?: string;
}, imageUrl: string | null, rol: string): Promise<any> => {

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...values, 
            role: rol,
            foto: imageUrl,
        }),
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data.message || "Error al resgitrarse");

    return data;
}