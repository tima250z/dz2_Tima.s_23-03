import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const history = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        history.push("/profile", { state: username });
    };

    return (
        <div>
            <h4>LoginPage</h4>
            <form onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="Введите свое имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" name="" id="" />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;
