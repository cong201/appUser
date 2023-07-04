import { faAnglesLeft, faEyeSlash, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginApi } from "../service/UserService";
import { toast } from 'react-toastify'
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const navigate = useNavigate()

    const { loginContext } = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const [loadingApi, setLoadingApi] = useState(false)

    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {
    //         navigate('/')
    //     }
    // }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or password is required")
            return
        }
        setLoadingApi(true)
        let res = await loginApi(email, password)
        console.log("check", res);
        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingApi(false)
    }

    const icon = isShowPassword ? faEye : faEyeSlash;

    return (
        <div className="login-container mt-40 md:w-1/3 sm:w-1/2">
            <div className="title">Log in</div>
            <div className="text">Email or username (eve.holt@reqres.in)</div>
            <input
                type="text"
                placeholder="Email or username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className="input-2">
                <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <i className="password-toggle">
                    <FontAwesomeIcon
                        icon={icon}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    />
                </i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{loadingApi && <FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse" />} &nbsp; Login</button>
            <Link to={'/'} className="back">
                <FontAwesomeIcon icon={faAnglesLeft} />Go back
            </Link>
        </div>
    )
}

export default Login