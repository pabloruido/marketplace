import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteProduct = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState({});
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Error al buscar producto solicitado');
                }

                const productData = await response.json();
                setProductData(productData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProductData();
    }, [productId]);

    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        navigate(`/products/${productId}`);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            navigate('/products');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Eliminar Producto</h2>
            <p>Estas a punto de eliminar "{productData.title}"</p>
            <button onClick={handleShowConfirmation}>Eliminar Producto</button>

            {showConfirmation && (
                <div>
                    <p>¿Estás seguro de que quieres eliminar este producto?</p>
                    <button onClick={handleConfirm}>Confirmar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                    
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};
