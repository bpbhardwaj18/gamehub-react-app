import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface User {
    username: string
    password: string
}
interface Props {
    loginSubmit: (data: User) => void
}
function Login(props: Props) {

    // useEffect(() => {
    //     axios
    //         .post(API_BASE_URL+"login", ReportBody.arguments())
    //         .then(data => console.log("bhanu"))
    //         .catch(error => console.log("error", error));
    // }, []);

    const { register, handleSubmit } = useForm<User>()

    handleSubmit

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form className="bg-dark" style={{ width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit(props.loginSubmit)} >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input {...register("username")} type="text" className="form-control" id="username" aria-describedby="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input {...register("password")} type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-1">Login</button>
            </form>
        </div >
    )
}

export default Login;