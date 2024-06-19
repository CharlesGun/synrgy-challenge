import { useNavigate } from 'react-router-dom';
function Loginpage() {
    let navigate = useNavigate();
    const login = () => {
        navigate('/admin/dashboard', {state: {isRefresh: true}});
    }
  return (
    <div className="container-login d-flex w-100">
        <div className="image-container w-75">
            <img src="/images/login.png" alt="mobil baris" className="h-100 w-100 opacity-75"/>
        </div>
        <div className="htmlForm-container d-flex justify-content-center align-items-center w-25">
            <div className="htmlForm-card w-75">
                <div className="logo mb-4"></div>
                <h1 className="mb-4 fw-bold fs-3">Welcome, Admin BCR</h1>
                <form id="loginForm">
                    <div className="form d-flex flex-column mb-2 gap-1">
                        <label htmlFor="email" className="fw-light">Email</label>
                        <input type="email" name="email" id="email" placeholder="Contoh: johndoe@email.com" required/>
                    </div>
                    <div className="form d-flex flex-column mb-4 gap-1">
                        <label htmlFor="password" className="fw-light">Password</label>
                        <input type="password" name="password" id="password" placeholder="6+ karakter" required/>
                    </div>
                    <button type="submit" className="form-button w-100" onClick={login}>Sign In</button>
                </form>
            </div>
        </div>
    </div>
  )
}
export default Loginpage;