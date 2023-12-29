import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Category = () => {
    const { CategoryId } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);



    const fetchCategorieById = async (id) => {

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${CategoryId}`);
            if (!response.ok) {
                throw new Error('la carga ha fallado. ');
            }
            const data = await response.json();
            setCategoria(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    const fetchProductsByCategory = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${CategoryId}/products`)
            if (!response.ok) {
                throw new Error('la carga ha fallado. Intente nuevamente');
            }
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategorieById();
        fetchProductsByCategory();
    }, [CategoryId]);




    return (
        <div>
            <div>
                <h1 className="titulo">Productos de la categoria: {categoria?.name} </h1>
            </div>
            <hr />
            {productos.map((producto) => (
                <li key={producto.id} className="productos-container">
                        <p >
                            <Link to={`/products/${producto.id}`}><h2 className="category-products">{producto.title}</h2></Link>
                        </p>
                        <p> $ {producto.price}</p>
                        <p> Caracteristicas {producto.description}</p>
                        <div>
                            {producto.images.map((imagen, index) => (
                                <img
                                    key={index}
                                    src={imagen}

                                />
                            ))}
                            < div className="button-container">
                                <Link to={`/categories/updatecategory/${CategoryId}`}><button>Actualizar Categoria </button></Link>
                                <Link to="/products/addproduct">
                                    <button>Agregar producto </button> </Link>

                                <Link to={`/categories/deletecategory/${CategoryId}`}><button>Eliminar esta Categoria</button></Link>
                            </div>
                        </div>
                </li>
            ))}
        </div>
    )
}
