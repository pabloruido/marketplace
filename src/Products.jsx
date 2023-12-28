import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import './styles/products.css';


export const Products = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [errorCargaAPI, setErrorCargaAPI] = useState(false);
    const { user } = useAuth();
    const { agregarAlCarrito } = useCart();
    const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('title') || '';
 


    const fetchProductos = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?title=${searchParam}`);
      
      if (!response.ok) {
        throw new Error('La carga ha fallado. Intente nuevamente');
      }

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setError(error.message);
      console.error(error);
      setErrorCargaAPI(true);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [searchParam]);

    return (
        <div>
            {errorCargaAPI && <p>{error}</p>}
            <h1 className="titulo"> Disfruta de todos los productos de Tiendita </h1>
            <ul>
            
                {productos.map((producto) => (
                    <li key={producto.id} className="productos-container">
                        <h2>{producto.title}</h2>
                        <img
                            src={producto.images}
                            alt={`Imagen de ${producto.title}`} />
                        <p>Precio: ${producto.price}</p>
                        <p>Descripción y caracteristicas {producto.description}</p>
                        <div className="button-container">
                        <button>
                            <Link to={`/products/${producto.id}`}>Ver detalles </Link>
                        </button>
                        </div>
                        <p>Categoria: {producto.category.name}</p>

                        <div className="button-container">
                            {user !== null ? (
                                <button onClick={() => agregarAlCarrito(producto)}>
                                    Agregar producto al carrito
                                </button>
                            ) : (
                                <button>
                                    <Link to={'/login'}> Debes estar logueado para comprar </Link>
                                </button>
                            )}
                            {user?.role === 'admin' ? (
                                <Link to="/products/addproduct">
                                    <button>Cargar nuevo producto </button>
                                </Link>) : ("")}
                        </div>
                        <hr></hr>

                    </li>
                )
                )}
            </ul>
        </div>
    )

};





