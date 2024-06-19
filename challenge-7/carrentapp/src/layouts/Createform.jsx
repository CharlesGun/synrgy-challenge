import { useState } from "react";
import Dashboardnavbar from "../components/Dashboardnavbar"

function Createform({setRefresh}) {
    const [manufacture, setManufacture] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [transmission, setTransmission] = useState("");
    const [statusAvailable, setStatusAvailable] = useState("");
    const [image, setImage] = useState("");
    
    const addCar = () => {
        let randomId = Math.random().toString(36).substr(2, 9);
        let availableAt = Date.now();
        const newCar = {
            id: randomId,
            plate: "DBH-3491",
            manufacture: manufacture,
            model: model,
            image: image,
            rentPerDay: parseInt(price),
            capacity: parseInt(capacity),
            description:  "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
            availableAt: new Date(availableAt).toISOString(),
            transmission: transmission,
            available: Boolean(statusAvailable),
            type: "Sedan",
            year: 2022,
            options: [
              "Cruise Control",
              "Tinted Glass",
              "Tinted Glass",
              "Tinted Glass",
              "AM/FM Stereo"
            ],
            specs: [
              "Brake assist",
              "Leather-wrapped shift knob",
              "Glove box lamp",
              "Air conditioning w/in-cabin microfilter",
              "Body color folding remote-controlled pwr mirrors",
              "Dual-stage front airbags w/occupant classification system"
            ]
          }
  
        fetch('http://localhost:8000/data_cars', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(newCar)
          }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(() => {
            // Reset the form
            setManufacture("");
            setModel("");
            setPrice(0);
            setCapacity(0);
            setTransmission("");
            setStatusAvailable("");
            setImage("");
            setRefresh(true);
        
            setTimeout(() => {
              alert('New car added.');
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
                    <button type="submit" onClick={addCar}>Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Createform