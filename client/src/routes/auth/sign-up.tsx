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
                className="mb-4"
                labelTitle="Name"
                placeholder="Your name"
                name="name"
                isValid={inputsValidations.name.isValid}
                errorMessage={inputsValidations.name.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

            <Input
                labelTitle="Username"
                placeholder="ex. Tomas"
                name="username"
                isValid={inputsValidations.username.isValid}
                errorMessage={inputsValidations.username.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

        </form>
    )

};

export default AuthSignUp;