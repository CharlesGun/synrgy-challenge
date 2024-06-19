import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Dashboardnavbar from "../components/Dashboardnavbar"

function EditForm() {
    const location = useLocation();
    const car = location.state?.car;

    const [manufacture, setManufacture] = useState(car.manufacture? car.manufacture : "");
    const [model, setModel] = useState(car.model? car.model : "");
    const [price, setPrice] = useState(car.rentPerDay? car.rentPerDay : 0);
    const [capacity, setCapacity] = useState(car.capacity? car.capacity : 0);
    const [transmission, setTransmission] = useState(car.transmission? car.transmission : "");
    const [statusAvailable, setStatusAvailable] = useState(car.available? car.available : "");
    const [image, setImage] = useState(car.image? car.image : "");

    if (!car) {
        return <div>No car data available</div>;
    }
    
    const editCar = () => {
        const editedCar = {
            ...car,
            manufacture: manufacture,
            model: model,
            rentPerDay: price,
            capacity: capacity,
            transmission: transmission,
            image: image,
            available: statusAvailable
        }
        fetch('http://localhost:8000/data_cars/'+car.id, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(editedCar)
          }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(() => {
            setTimeout(() => {
              alert('Car Edited.');
            }, 500);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }
  return (
    <div className="bg-body-secondary">
    <div className="w-100">
        <div className="w-100">
            <Dashboardnavbar />
        </div>
        <div className="container">
            <h1 className="fw-bold fs-3 my-4">Car Form</h1>
            <div className="bg-white">
                <div className="d-flex flex-column w-50">
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="manufacture">Manufacture</label>
                        <input type="text" name="manufacture" id="manufacture" className="w-50" value={manufacture} onChange={(e) => setManufacture(e.target.value)}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="model">Model</label>
                        <input type="text" name="model" id="model" className="w-50" value={model} onChange={(e) => setModel(e.target.value)}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="capacity">Capacity</label>
                        <input type="number" name="capacity" id="capacity" className="w-50" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" className="w-50" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="statusAvailable">Status</label>
                        <select name="statusAvailable" id="statusAvailable" value={statusAvailable} onChange={(e) => setStatusAvailable(e.target.value)}>
                            <option value="" disabled>Pilih Status</option>
                            <option value="true">Available</option>
                            <option value="false">Rented</option>
                        </select>
                    </div>
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="transmission">Transmission</label>
                        <select name="transmission" id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                            <option value="" disabled>Pilih Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                    <div className="mb-3 d-flex justify-content-between mx-3">
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" id="image" className="w-50" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <button type="submit" onClick={editCar}>Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditForm