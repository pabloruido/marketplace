import  React, { useState, useEffect  } from 'react';
import { useNavigate, useParams} from 'react-router-dom';


export const UpdateCategoty = () => {

    const { CategoryId } = useParams ();
    const [actualizarCategoria, setActualizarCategoria] = useState ({
        name:"",
        
    })

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchCategoryData = async () => {
            try {
                const response = await fetch (`https://api.escuelajs.co/api/v1/categories/${CategoryId}`);
                if (!response.ok) {
                    throw new Error ('Error al buscar categoria solicitado');
                }

                const categoryData = await response.json ();
                setActualizarCategoria(categoryData);
                console.log(categoryData)
            } catch (error) {
                setError (error.message);
                
            }
            
        };

        

        fetchCategoryData();
    }, [CategoryId]);

    const handleActualizarCategoria = (event) => {
        const { name, value } = event.target;
        setActualizarCategoria({
            ...actualizarCategoria,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault () ;
    

        try {
            const response = await fetch (`https://api.escuelajs.co/api/v1/categories/${CategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify (actualizarCategoria),
        });

        if (!response.ok) {
            throw new Error ('Error actualizando categoria');
        }
        navigate ('/categories');
        } catch (error) {
            setError (error.message);
        }
    };

    return (
        <div className = "container">
            <h2>Actualizar Categoria</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="name"> Nombre de la categoria: </label>
                    <input
                        type="text"
                        id= "name"
                        name="name"
                        value = {actualizarCategoria.name}
                        onChange={handleActualizarCategoria} />
                </div>
                
                <button type="submit">Actualizar Categoria </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );   
};