import React from "react";

function Login(props) {
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!formData.email || !formData.password) {
            return;
        }
        props.handleLogin(formData);
        setFormData({
            email: '',
            password: ''
        })
    }

    return(
        <div className="authForm">
            <p className="authForm__entry">Вход</p>
            <form className="authForm__form" onSubmit={handleSubmit}>
                <input onChange={handleChange} value={formData.email} name="email" type="email" placeholder="Email" className="authForm__input"></input>
                <input onChange={handleChange} value={formData.password} name="password" type="password" placeholder="Пароль" className="authForm__input"></input>
                <button className="authForm__button" type="submit" >Войти</button>
            </form>
        </div>
    )
}

export default Login;