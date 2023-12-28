import  React, { useState,  } from 'react';
import { useNavigate} from 'react-router-dom';



export const AddProduct = () => {
    const [agregarProducto, setAgregarProducto] = useState({

        title: '',
        price: '',
        description: '',
        categoryId: '',
        images: [''],
    });

    const[error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAgregarProducto = (event) => {
        const { name, value } = event.target;
        setAgregarProducto({
            ...agregarProducto,
            [name]: value
        });
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();

        const categotyIdAsNumber = parseInt (agregarProducto.categoryId, 10);

        if (!agregarProducto.title || !agregarProducto.price || !agregarProducto.description || isNaN(categotyIdAsNumber) 
        ){
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...agregarProducto,
                    categoryId: categotyIdAsNumber,
                }), 
            });

             const responseData = await response.json();
             console.log('Response:', responseData.id);
        


            if (!response.ok) {
                throw new Error('ERROR AL AGREGAR EL PRODUCTO');
            }

            navigate(`/products/${responseData.id}`);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titulo: </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={agregarProducto.title}
                        onChange={handleAgregarProducto} />
                </div>
                <div>
                    <label htmlFor="price">Precio: </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={agregarProducto.price}
                        onChange={handleAgregarProducto} />
                </div>
                <div>
                    <label htmlFor="description">Descripción: </label>
                    <textarea
                        id="description"
                        name="description"
                        value={agregarProducto.description}
                        onChange={handleAgregarProducto} />
                </div>
                <div>
                    <label htmlFor="categoryId">ID de la Categoria: </label>
                    <input
                        type="number"
                        id="categoryId"
                        name="categoryId"
                        value={agregarProducto.categoryId}
                        onChange={handleAgregarProducto} />
                </div>
                <div>
                    <label htmlFor="images"> Imagenes - separelas por comas -: </label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={agregarProducto.images.join(',')}
                        onChange={(event) => {
                            const images = event.target.value.split(',');
                            setAgregarProducto({
                                ...agregarProducto,
                                images,
                            });
                        }} />
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
                    