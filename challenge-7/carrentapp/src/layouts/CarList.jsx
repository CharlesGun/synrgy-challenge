import { useEffect, useState } from "react";
import Dashboardnavbar from "../components/Dashboardnavbar"
import CarTableRow from "../components/CarTableRow";

function CarList({isRefresh, setRefresh}) {
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
            <h1 className="fw-bold fs-3 my-4">Dashboard</h1>
            <div className="table-order">
                <h3>List Cars</h3>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>
                                No
                            </th>
                            <th>
                                Manufacture
                            </th>
                            <th>
                                Model
                            </th>
                            <th>
                                Price/Day
                            </th>
                            <th>
                                Capacity
                            </th>
                            <th>
                                Year
                            </th>
                            <th>
                                Available At
                            </th>
                            <th>
                                Available Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, index) => (
                            <CarTableRow car={car} index={index} key={car.id} />
                        ))}
                    </tbody>
                </table>
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <% if(!cars.prev){%>
                        <li className="page-item disabled">
                            <a className="page-link" href=""
                                aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            <% } else {%>
                        <li className="page-item">
                            <a className="page-link" href="/dashboard/cars-list?page=<%=cars.prev.page%>"
                                aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <% }%>
                        <% for (let i = 1; i <= cars.totalPages; i++) { %>
                        <li className="page-item <%= cars.currentPage === i ? 'active' : '' %>">
                            <a className="page-link" href="/dashboard/cars-list?page=<%= i %>"><%= i %></a>
                        </li>
                        <% } %>
                        <% if(!cars.next){%>
                        <li className="page-item disabled">
                            <a className="page-link" href=""
                                aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            <% } else {%>
                        <li className="page-item">
                            <a className="page-link" href="/dashboard/cars-list?page=<%=cars.next.page%>"
                                aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        <% }%>
                    </ul>
                </nav> */}
            </div>

        </div>
    </div>
</div>
  )
}

export default CarList