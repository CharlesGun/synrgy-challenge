import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteBox from './DeleteBox';

function Card({car, setRefresh}) {
    const [isDeleteBoxVisible, setIsDeleteBoxVisible] = useState(false);

    const handleDeleteButtonClick = () => {
        setIsDeleteBoxVisible(true);
    };

    const handleCancelButtonClick = () => {
        setIsDeleteBoxVisible(false);
    };

    const handleConfirmDeleteButtonClick = () => {
        fetch('http://localhost:8000/data_cars/'+car.id, {
            method: 'DELETE'
        })
        .then(() => {
            setIsDeleteBoxVisible(false);
            setRefresh(true);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate(`/admin/edit-form/${car.id}`, {state: {car} });
    };

    return (
    <div className="col-4 d-flex justify-content-center mb-5">
    <div className="card p-2 shadow-sm">
        <a href={"/cars/detail/"+car.id} className="card-link">
            <div className="car-image mb-4">
                <img src={car.image} alt={car.manufacture}/>
            </div>
            <div className="mb-3 gap-0">
                <p>{car.manufacture}/{car.model}</p>
                <p className="fw-bold">{car.rentPerDay} / hari</p>
                <p className="fw-light card-text"><i className="bi bi-key-fill me-2"></i>Start rent - Finish rent</p>
                <p className="fw-light card-text"><i className="bi bi-clock me-2"></i>Updated at {car.availableAt}</p>
            </div>
        </a>
        <div className="w-100 d-flex justify-content-center mb-2">
            <button className="card-button delete mx-auto" id="delete-car" onClick={handleDeleteButtonClick}><i className="bi bi-trash3 me-2"></i>Delete</button>
            <button className="card-button edit mx-auto" id="update-car" onClick={handleEditClick}><i className="bi bi-pencil-square me-2"></i>Edit</button>
        </div>
        </div>
        {isDeleteBoxVisible && (
                <DeleteBox
                    onCancelButtonClick={handleCancelButtonClick}
                    onConfirmDeleteButtonClick={handleConfirmDeleteButtonClick}
                />
            )}
    </div>
    )
}

export default Card