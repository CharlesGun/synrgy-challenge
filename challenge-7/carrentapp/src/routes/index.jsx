import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Homepage from "../layouts/Homepage";
import Cars from "../layouts/Cars";
import Loginpage from "../layouts/Loginpage";
import Dashboardcar from "../layouts/Dashboardcar";
import Createform from "../layouts/Createform";
import CarList from "../layouts/CarList";
import EditForm from "../layouts/EditForm";

function RoutesIndex() {
    const [isRefresh, setIsRefresh] = useState(true)

    const setRefresh = (status) => {
    setIsRefresh(status)
    }
    return (
        <Routes>

            <Route path="/" element={<Homepage />} />

            <Route path="/cars" element={<Cars />} />

            <Route path="/admin/login" element={<Loginpage/>} />

            <Route path="/admin/dashboard" element={<Dashboardcar setRefresh={setRefresh} isRefresh={isRefresh}/>} />
            
            <Route path="/admin/create-form" element={<Createform setRefresh={setRefresh}/>} />

            <Route path="/admin/car-list" element={<CarList setRefresh={setRefresh} isRefresh={isRefresh}/>} />

            <Route path="/admin/edit-form/:id" element={<EditForm />} />

        </Routes>
    )
}

export default RoutesIndex