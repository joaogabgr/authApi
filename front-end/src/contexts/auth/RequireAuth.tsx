import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    useEffect(() => {
        const validadeToken = async (token: string) => {
            try {
                const response = await axios.post('http://localhost:5000/users/validateToken', { token: token });
                localStorage.setItem('token', response.data.success.token);
                return response.data.success.token;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('Erro na resposta da API:', error.response.data);
                        return false;
                    }
                } else {
                    console.error('Erro desconhecido:', error);
                    return false;
                }
            }
        }

        const token = localStorage.getItem('token');
        const validateToken = async () => {
            const isValid = await validadeToken(token || '');
            if (isValid === false) {
                localStorage.removeItem('token');
                window.location.href = '/auth';
            }
        };

        validateToken();
    }, []);

    return <>{children}</>;
}