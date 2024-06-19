import { useEffect, useState } from "react";
import Dashboardnavbar from "../components/Dashboardnavbar"
import Card from "../components/Card";

function Dashboardcar({isRefresh, setRefresh}) {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // memanggil API untuk mengambil data Cars
        if (isRefresh) {
          fetch("http://localhost:8000/data_cars")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setRefresh(false)
              // ketika Rest API sukses, simpan data dari response ke dalam state lokal
              setCars(data);
              console.log(data);
            })
            .catch((err) => {
              setRefresh(false)
              if (err.name === "AbortError") {
                console.log("fetch aborted.");
              }
            });
        }
      }, [isRefresh, setRefresh]);

  return (
    <div className="bg-body-secondary">
        <div className="w-100">
            <div className="w-100">
                <Dashboardnavbar />
            </div>
            <div className="container">
                <h1 className="fw-bold fs-3 my-4">Car List</h1>
                <div className="my-4 d-flex justify-content-end">
                    <a href="/admin/create-form">
                        <button className="btn btn-primary">
                            + Add New Car
                        </button>
                    </a>
                </div>
                <div className="row">
                    {cars.map((car) => (
                        <Card car={car} key={car.id} setRefresh={setRefresh}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboardcar