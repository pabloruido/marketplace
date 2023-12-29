import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Categories = () => {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [errorCargaAPI, setErrorCargaAPI] = useState(false);
    const { user } = useAuth();

    const fetchCategorias = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/categories')
            if (!response.ok) {
                throw new Error('La carga ha fallado. Intente nuevamente')
            }
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            setError(error.message);
            console.error(error);
            setErrorCargaAPI(true);
        }
    }

    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <div>
            {errorCargaAPI && <p>{error}</p>}
            <h1 className="titulo">  Categorias  </h1>
            <div>
                <div className="button-container">
                    {user?.role === 'admin' &&
                    (<Link to="/categories/addcategory">
                        <button>Agregar Categoria </button>
                    </Link>)}
                </div>
                <hr/>
                {categorias.map((categoria) => (
                    <div key={categoria.id} className="productos-container">
                        <Link to={`/categories/${categoria.id}/products/`}>
                            <h2 className="category-products"> Ver detalles de: {categoria.name} </h2></Link>

                        <hr />

                        <img
                            src={categoria.image}
                            alt={`Imagen de ${categoria.name}`} />
                        <hr />
                    </div>
                )
                )}
            </div>
        </div>
    )
};



