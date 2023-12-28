import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './AuthContext';

const registerMutation = async ({ name, email, password, avatar }) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, avatar }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const userData = await response.json();
  return userData;
};

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  const navigate = useNavigate();
  const { register } = useAuth();

  const mutation = useMutation({
    mutationFn: registerMutation,
    onSuccess: (data) => {
      console.log('Registro exitoso', data);
  
      navigate('/login');
    },
    onError: (data) => {
      console.log('Algo salió mal', data);
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, 
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}className="formLogin">
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
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
      <label>
        Avatar:
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <div className="button-container2">
      <button type="submit">Registrarse</button>
      </div>
    </form>
  );
};