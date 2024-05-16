import logo from '../../src/image/bird.png';
import '../../src/App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'us',
    },
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr',
    },
    {
        code: 'tn',
        name: 'Tamil',
        country_code: 'in',
    },
]

const GlobeIcon = ({ width = 24, height = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="currentColor"
        className="bi bi-globe"
        viewBox="0 0 16 16"
    >
        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
    </svg>
)

const Login = () => {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()

    const navigate = useNavigate();

    const initialValues = { email: "", password: "" };
    const [formData, setFormData] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setFormError(validate(formData));
        setIsSubmit(true);
    }

    // useEffect(() => {
    //     if (Object.keys(formError).length === 0 && isSubmit) {
    //         console.log('formError', formData)
    //     }
    // }, [formError]);

    useEffect(() => {
        localStorage.setItem("language", currentLanguageCode);
        document.title = t('Login')
    }, [currentLanguage, t])

    const validate = (value) => {
        console.log(value)
        const error = {};

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.email) {
            error.email = "Email address is required";
        } else if (!regex.test(value.email)) {
            error.email = "This is not a valid email address format";;
        }
        if (!value.password) {
            error.password = "Password is required";
        } else if (value.password.length < 8) {
            error.password = "Password must be more than 8 characters"
        } else if (value.password.length > 16) {
            error.password = "Password cannot exceed more than 16 characters"
        }
        if (value.email && value.password) {
            navigate('/Dashboard');
        }

        return error;
    }

    return (
        <>
            <div className="App container">

                {Object.keys(formError).length === 0 && isSubmit ? (<div className="text-success">Login Successfully!</div>) : <div></div>}
                <div className="bg-light py-3 py-md-5">
                    <div className="container">

                        <div className="row justify-content-md-center">
                            <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                                <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="text-center mb-5">
                                                <img src={logo} alt="Logo" width="50%" height="50%" />
                                                <h3>{t('Login')}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={onSubmitHandler} noValidate>
                                        <div className="row gy-3 gy-md-4 overflow-hidden">
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                                        </svg>
                                                    </span>
                                                    <input type="text" name="email" className="form-control" placeholder={t('Email Address')} value={formData.email} onChange={changeHandler} />
                                                </div>
                                            </div>
                                            {formError.email === 'Email address is required' && <div className="error">{t('Email address is required')}</div>}
                                            {formError.email === 'This is not a valid email address format' && <div className="error">{t('This is not a valid email address format')}</div>}
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                                        </svg>
                                                    </span>
                                                    <input type="password" name="password" className="form-control" placeholder={t('Password')} value={formData.password} onChange={changeHandler} onInvalid={validate} />
                                                </div>
                                            </div>
                                            {formError.password === 'Password is required' && <div className="error">{t('Password is required')}</div>}
                                            {formError.password === 'Password must be more than 8 characters' && <div className="error">{t('Password must be more than 8 characters')}</div>}
                                            {formError.password === 'Password cannot exceed more than 16 characters' && <div className="error">{t('Password cannot exceed more than 16 characters')}</div>}
                                        </div>
                                        <div className="my-4">
                                            <button type="submit" className="btn btn-outline-success my-4 w-25 loginBtn">{t('Login')}</button>
                                            <div>
                                                <a href="#!" className="link-secondary text-decoration-none">{t('Forgot your password')}</a></div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className=' position-relative'>
                <div className="dropdown position-absolute top-100 start-50 translate-start mt-1 bi bi-caret-down-fill">
                    <button
                        className="btn btn-link dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <GlobeIcon />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <span className="dropdown-item-text">{t('language')}</span>
                        </li>
                        {languages.map(({ code, name, country_code }) => (
                            < li key={country_code} >
                                <a href="#" className={classNames('dropdown-item', { disabled: currentLanguageCode === code, })}
                                    onClick={() => { i18next.changeLanguage(code) }} >
                                    <span className={`flag-icon flag-icon-${country_code} mx-2`} style={{
                                        opacity: currentLanguageCode === code ? 0.5 : 1,
                                    }}></span>{name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Login;