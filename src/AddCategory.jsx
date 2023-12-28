import  React, { useState,  } from 'react';
import { useNavigate} from 'react-router-dom';



export const AddCategory = () => {
    const [agregarCategoria, setagregarCategoria] = useState({

        name:"",
        image:"",
    });

    const[error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAgregarCategoria = (event) => {
        const { name, value } = event.target;
        setagregarCategoria({
            ...agregarCategoria,
            [name]: value
        });
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();


        if (!agregarCategoria.name || !agregarCategoria.image  
        ){
            setError('Debe completar ambos campos');
            return;
        }

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agregarCategoria), 
            });

             const responseData = await response.json();
             console.log('Response:', responseData);
        


            if (!response.ok) {
                throw new Error('Error agregando categoria.');
            }

            navigate(`/categories/${responseData.id}/products`);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Agregar Categoria</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={agregarCategoria.name}
                        onChange={handleAgregarCategoria} />
                </div>
                <div>
                    <label htmlFor="image"> Imagen representativa para la categoria: </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={agregarCategoria.image}
                        onChange={(event) => {
                            const image = event.target.value;
                            setagregarCategoria({
                                ...agregarCategoria,
                                image,
                            });
                        }} />
                </div>
                <button type="submit">Agregar Categoria</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
                    