import logo from '../../src/image/bird.png';
import '../../src/App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";


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

const GlobeIcon = ({ width = 24, height = 24, color = 'blue' }) => (
    <BsGlobe />
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
        document.title = t('Login')
    }, [currentLanguage, t])

    const validate = (value) => {
        let mailValid = true;
        let pwdValid = true;

        const error = {};

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.email) {
            error.email = "Email address is required";
            mailValid = false;
        } else if (!regex.test(value.email)) {
            error.email = "This is not a valid email address format";
            mailValid = false;
        }
        if (!value.password) {
            error.password = "Password is required";
            pwdValid = false;
        } else if (value.password.length < 8) {
            error.password = "Password must be more than 8 characters";
            pwdValid = false;
        } else if (value.password.length > 16) {
            error.password = "Password cannot exceed more than 16 characters";
            pwdValid = false;
        }
        if (mailValid && pwdValid) {
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
                                <div className="bg-white p-4 p-md-5 rounded shadow-md">
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
                                                        <FiUser />
                                                    </span>
                                                    <input type="text" name="email" className="form-control" placeholder={t('Email Address')} value={formData.email} onChange={changeHandler} />
                                                </div>
                                            </div>
                                            {formError.email === 'Email address is required' && <div className="error">{t('Email address is required')}</div>}
                                            {formError.email === 'This is not a valid email address format' && <div className="error">{t('This is not a valid email address format')}</div>}
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <FiLock />
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
                                            <div className=' position-relative'>
                                                <div className="dropdown position-absolute top-0 end-0">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default Login;
