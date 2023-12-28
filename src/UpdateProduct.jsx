import  React, { useState, useEffect  } from 'react';
import { useNavigate, useParams} from 'react-router-dom';


export const UpdateProduct = () => {

    const { productId } = useParams ();
    const [actualizarProducto, setActualizarProducto] = useState ({
        title: '',
        price: '',
        description: '',
        images: [''],
        categoryId: '',
        
    })

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch (`https://api.escuelajs.co/api/v1/products/${productId}`);
                if (!response.ok) {
                    throw new Error ('Error al buscar producto solicitado');
                }

                const productData = await response.json ();
                setActualizarProducto(productData);
                console.log(productData)
            } catch (error) {
                setError (error.message);
                
            }
            
        };

        

        fetchProductData();
    }, [productId]);

    const handleActualizarProducto = (event) => {
        const { name, value } = event.target;
        setActualizarProducto({
            ...actualizarProducto,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault () ;
    

        try {
            const response = await fetch (`https://api.escuelajs.co/api/v1/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify (actualizarProducto),
        });

        if (!response.ok) {
            throw new Error ('Error actualizando producto');
        }
        navigate ('/products');
        } catch (error) {
            setError (error.message);
        }
    };

    return (
        <div className = "container">
            <h2>Actualizar Producto</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="title"> Titulo: </label>
                    <input
                        type="text"
                        id= "title"
                        name="title"
                        value = {actualizarProducto.title}
                        onChange={handleActualizarProducto} />
                </div>
                <div>
                    <label htmlFor="price"> Precio: </label>
                    <input
                        type="number"
                        id= "price"
                        name="price"
                        value = {actualizarProducto.price}
                        onChange={handleActualizarProducto} />
                </div>
                <div>
                    <label htmlFor="description"> Descripción: </label>
                    <textarea

                        id= "description"
                        name="description"
                        value = {actualizarProducto.description}
                        onChange={handleActualizarProducto} />
                </div>
                <div>
                    <label htmlFor="images"> Imagenes (separelas por comas) : </label>
                    <input
                        type="text"
                        id= "images"
                        name="images"
                        value = {actualizarProducto.images.join(',')}
                        onChange={(event) => {
                            const images = event.target.value.split (',');
                            setActualizarProducto({
                                ...actualizarProducto,
                                images,
                            });
                        }} />
                </div>
                
                <button type="submit">Actualizar Producto </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );   
};