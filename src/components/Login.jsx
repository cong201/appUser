import { faAnglesLeft, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const icon = isShowPassword ? faEye : faEyeSlash;

    return (
        <div className="login-container mt-40 md:w-1/3 sm:w-1/2">
            <div className="title">Log in</div>
            <div className="text">Email or username</div>
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
            >Login</button>
            <div className="back">
                <FontAwesomeIcon icon={faAnglesLeft} />Go back
            </div>
        </div>
    )
}

export default Login