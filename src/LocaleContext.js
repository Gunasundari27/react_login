import { createContext } from "react";

const defaultValue = {
    locale: 'en',
    setLocale: () => { },
    rules: {
        email: { email: true },
        password: { password: true }
    }
}

export default createContext(defaultValue);