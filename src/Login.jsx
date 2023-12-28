import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';




const loginMutation = async ({ email, password }) => {
    const response = await fetch ( 'https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            
        },
        body: JSON.stringify({email,password}),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error (error.message);
    }
    const userData = await response.json();
    return userData;
    
};



export const Login = () => {
    const [formData, setFormData] = useState ({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();

    

    const mutation = useMutation ({
        mutationFn: loginMutation,
        onSuccess: (data) => {
            console.log('Login exitoso', data);
            login(data);
            const from = location.state?.from?.pathname || '/';
            navigate(from);
        },
        onError: (data) => {
            console.log ('Algo salio mal', data);
        }
    })
    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        mutation.mutate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="formLogin">
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
            </label>
            <label>
                Contraseña:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    />
            </label>
            <br/>
            <div className="button-container2">
            <button type="submit">Login</button></div>
        </form>
    );
};