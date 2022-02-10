import React, { useState, useRef } from "react";
import { LinksFunction, useNavigate } from "remix";
import { toast } from "react-hot-toast";

// Components
import Input from "~/components/form/Input";
import Button from "~/components/Button";

// Helpers
import { name_RegExp, username_RegExp, email_RegExp, password_RegExp } from "~/helpers/customRegExp";

// Requests
import { AxiosSignUpEmail } from "~/requests/localApi/AxiosAuth";

// Hooks
import { useUser } from "~/hooks/useUser";

// Css
import formCss from "~/css/pages/auth/form.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: formCss }
    ]
}

const AuthSignUp = () => {
    const { handlers: { loggin } } = useUser();
    const navigate = useNavigate();
    const formRef = useRef<any>()

    const [inputsValidations, setInputsValidations] = useState<any>({
        name: {
            isValid: true,
            blurMode: true,
            regExp: name_RegExp,
            errorMessage: "Your name should contains at least 3 characters (characters allowed: a-z and spaces)",
            defaultMessage: "Your name should contains at least 3 characters (characters allowed: a-z and spaces)"
        },
        username: {
            isValid: true,
            blurMode: true,
            regExp: username_RegExp,
            errorMessage: "Your username should contain between 3-30 characters (characters allowed: a-z 0-9)",
            defaultMessage: "Your username should contain between 3-30 characters (characters allowed: a-z 0-9)"
        },
        email: {
            isValid: true,
            blurMode: true,
            regExp: email_RegExp,
            errorMessage: "Wrong email, example: wordleapp@app.com",
            defaultMessage: "Wrong email, example: wordleapp@app.com"
        },
        password: {
            isValid: true,
            blurMode: true,
            regExp: password_RegExp,
            errorMessage: "Your password should contains at least 5 characters",
            defaultMessage: "Your password should contains at least 5 characters"
        },
        confirm_password: {
            isValid: true,
            blurMode: true,
            errorMessage: "Your password not match",
            defaultMessage: "Your password not match"
        }
    })

    const [fetching, setFetching] = useState<boolean>(false);

    const handleOnBlurInputs = (e: React.FocusEvent<HTMLInputElement>) => {
        const targetName = e.target.name;

        if (!targetName || !inputsValidations[targetName] || !inputsValidations[targetName].blurMode) return

        else if (targetName === "confirm_password") {
            const $form = formRef.current;

            if (!$form) return

            const formData = new FormData($form);

            setInputsValidations((prev: any) => {
                return {
                    ...prev,
                    confirm_password: {
                        ...prev.confirm_password,
                        blurMode: false,
                        isValid: formData.get("password")?.toString() === e.target.value,
                        errorMessage: prev.confirm_password.defaultMessage
                    }
                }
            })
            return
        }

        setInputsValidations((prev: any) => {
            return {
                ...prev,
                [targetName]: {
                    ...prev[targetName],
                    blurMode: false,
                    isValid: prev[targetName].regExp.test(e.target.value),
                    errorMessage: prev[targetName].defaultMessage
                }
            }
        })
    }

    const handleOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetName = e.target.name;

        if (!targetName || !inputsValidations[targetName] || inputsValidations[targetName].blurMode) return

        else if (targetName === "confirm_password") {
            const $form = formRef.current;

            if (!$form) return

            const formData = new FormData($form)

            setInputsValidations((prev: any) => {
                return {
                    ...prev,
                    confirm_password: {
                        ...prev.confirm_password,
                        isValid: formData.get("password")?.toString() === e.target.value
                    }
                }
            })
            return
        }

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

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirm_password = formData.get("confirm_password") as string;

        setFetching(true);

        const { error, data } = await AxiosSignUpEmail({
            name, username, email, password, confirm_password
        });

        if (error) {
            setInputsValidations((prev: any) => {
                return {
                    ...prev,
                    [error.inputName]: {
                        ...prev[error.inputName],
                        isValid: false,
                        errorMessage: error.message,
                        blurMode: true
                    }
                }
            })
            setFetching(false);
            return
        }

        toast.success("Account created successfully!");
        loggin(data.user, data.token)
        navigate("/")
    }

    return (
        <form className="iw_form" onSubmit={handleOnSubmit} ref={formRef}>
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
                className="mb-4"
                type="password"
                labelTitle="Confirm Password"
                placeholder="*****"
                name="confirm_password"
                isValid={inputsValidations.confirm_password.isValid}
                errorMessage={inputsValidations.confirm_password.errorMessage}
                onBlur={handleOnBlurInputs}
                onChange={handleOnChangeInputs}
            />

            <div className="text-right">
                <Button type="submit" color="primary" loading={fetching}>
                    Sign Up
                </Button>
            </div>

        </form>
    )

};

export default AuthSignUp;