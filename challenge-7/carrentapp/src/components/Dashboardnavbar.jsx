function Dashboardnavbar() {
  return (
    <div className="d-flex flex-row w-100 bg-white">
        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"><i className="bi bi-list"></i></button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">BCR</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <a href="/dashboard/orders-list">
                    <p>Dashboard</p>
                </a>
                <a href="/admin/dashboard">
                    <p>Car List</p>
                </a>
            </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light w-100">
            <div className="container-fluid">
                <a className="navbar-brand" href="/dashboard/orders-list">BCR</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/dashboard/orders-list" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dashboard
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/dashboard/orders-list">Orders List</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="/admin/car-list">Cars List</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin/dashboard">Car List</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Dashboardnavbar