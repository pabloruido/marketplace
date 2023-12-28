import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Categories = () => {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [errorCargaAPI, setErrorCargaAPI] = useState(false);

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
        <div className='container'>
            {errorCargaAPI && <p>{error}</p>}
            <h1> - Categorias - </h1>
            <hr />
            <div>
                <Link to="/categories/addcategory">
                    <button>Agregar Categoria </button>
                </Link>
                <hr/>
                {categorias.map((categoria) => (
                    <div key={categoria.id}>
                        <hr />
                        <Link to={`/categories/${categoria.id}/products/`}>
                            Ver detalles de: </Link>
                        <p>{categoria.name}</p>

                        <img
                            src={categoria.image}
                            alt={`Imagen de ${categoria.name}`} />
                    </div>
                )
                )}
            </div>
        </div>
    )
};



