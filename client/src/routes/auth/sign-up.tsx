import React, { useState } from "react";
import { LinksFunction } from "remix";

// Components
import Input from "~/components/form/Input";

// Css
import formCss from "~/css/pages/auth/form.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: formCss }
    ]
}

const AuthSignUp = () => {
    const [inputsValidations, setInputsValidations] = useState<any>({
        name: {
            isValid: true,
            blurMode: true,
            regExp: new RegExp(/^[A-Za-z ]{3,}$/),
            errorMessage: "Your name should contains at least 3 characters (characters allowed: a-z and spaces)"
        },
        username: {
            isValid: true,
            blurMode: true,
            regExp: new RegExp(/^[A-Za-z0-9]{3,30}$/),
            errorMessage: "Your username should contain between 3-30 characters (characters allowed: a-z 0-9)"
        },
        email: {
            isValid: true,
            blurMode: true,
            regExp: new RegExp(/^[A-Za-z0-9\.\_]+\@[A-Za-z]+\.[A-Za-z]{2,4}$/),
            errorMessage: "Wrong email, example: wordleapp@app.com"
        },
        password: {
            isValid: true,
            blurMode: true,
            regExp: new RegExp(/^.{5,}$/),
            errorMessage: "Your password should contains at least 5 characters"
        },
        confirm_password: {
            isValid: true,
            blurMode: true,
            errorMessage: "Your password not match"
        }
    })

    const handleOnBlurInputs = (e: React.FocusEvent<HTMLInputElement>) => {
        const targetName = e.target.name;

        if (!targetName || !inputsValidations[targetName] || !inputsValidations[targetName].blurMode) return

        setInputsValidations((prev: any) => {
            return {
                ...prev,
                [targetName]: {
                    ...prev[targetName],
                    blurMode: false,
                    isValid: prev[targetName].regExp.test(e.target.value)
                }
            }
        })
    }

    const handleOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;

        if (!targetName || !inputsValidations[targetName] || inputsValidations[targetName].blurMode) return

        setInputsValidations((prev: any) => {
            return {
                ...prev,
                [targetName]: {
                    ...prev[targetName],
                    isValid: prev[targetName].regExp.test(e.target.value)
                }
            }
        })
    }

    return (
        <form className="iw_form">
            <Input
                className="mb-8"
                labelTitle="Name"
                placeholder="Your name"
                name="name"
                isValid={inputsValidations.name.isValid}
                errorMessage={inputsValidations.name.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

            <Input
                className="mb-8"
                labelTitle="Username"
                placeholder="ex. Tomas"
                name="username"
                isValid={inputsValidations.username.isValid}
                errorMessage={inputsValidations.username.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

            <Input
                className="mb-8"
                labelTitle="Email"
                placeholder="ex. wordleclone@app.com"
                name="email"
                isValid={inputsValidations.email.isValid}
                errorMessage={inputsValidations.email.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

            <Input
                className="mb-8"
                type="password"
                labelTitle="Password"
                placeholder="*****"
                name="password"
                isValid={inputsValidations.password.isValid}
                errorMessage={inputsValidations.password.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

            <Input
                type="password"
                labelTitle="Confirm Password"
                placeholder="*****"
                name="confirm_password"
                isValid={inputsValidations.confirm_password.isValid}
                errorMessage={inputsValidations.confirm_password.errorMessage}
            />

        </form>
    )

};

export default AuthSignUp;