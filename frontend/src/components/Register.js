import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [formData, setFormData] = React.useState({
        email:'',
        password:''
    }) 

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleRegistration(formData);
    }

    return(
        <div className="authForm">
            <p className="authForm__entry">Регистрация</p>
            <form className="authForm__form" onSubmit={handleSubmit}>
                <input name="email" type="email" id="email" placeholder="Email" className="authForm__input" value={formData.email} onChange={handleChange}></input>
                <input name="password" type="password" id="password" placeholder="Пароль" className="authForm__input" value={formData.password} onChange={handleChange}></input>
                <button className="authForm__button" type="submit" >Зарегистрироваться</button>
            </form>
            <p className="authForm__quest">Уже зарегистрированы? <Link to="/sign-in" className="authForm__link">Войти</Link></p>
        </div>
    )
}

export default Register;