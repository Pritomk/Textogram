import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import M from "materialize-css";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const PostData = () => {

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return M.toast({ html: `Invalid email`, classes: 'rounded #ef5350 red lighten-1' });

        }
        fetch("http://localhost:5000/auth/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.error);
                if (data.error) {
                    M.toast({ html: `${data.error}`, classes: 'rounded #ef5350 red lighten-1' });
                    console.log(data);
                } else {
                    localStorage.setItem("auth_token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    M.toast({ html: `${data.msg}`, classes: 'rounded #76ff03 light-green accent-3 mtoast' });
                    navigate('/');
                }

            })
            .catch(err=> console.log(err))
    }

    return (
        <div className="whole-card">
            <div className="card auth-card">
                <h2>Textogram</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light auth-btn"
                    onClick={() => PostData()}>
                    Register
                </button>

                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>

        </div>
    )
}

export default Register;