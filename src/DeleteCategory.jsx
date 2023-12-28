import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DeleteCategory = () => {
    const { CategoryId } = useParams();
    const [categoryData, setCategoryData] = useState({});
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${CategoryId}`);
                if (!response.ok) {
                    throw new Error('Error al buscar la categoria');
                }

                const categoryData = await response.json();
                setCategoryData(categoryData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCategoryData();
    }, [CategoryId]);

    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        navigate(`/categories/${CategoryId}/products/`);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${CategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar categoria');
            }

            navigate('/categories');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Eliminar Categoria</h2>
            <p>Estas a punto de eliminar "{categoryData.name}"</p>
            <button onClick={handleShowConfirmation}>Eliminar categoria</button>

            {showConfirmation && (
                <div>
                    <p>¿Estás seguro de que quieres eliminar esta categoria?</p>
                    <button onClick={handleConfirm}>Confirmar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                    
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};
