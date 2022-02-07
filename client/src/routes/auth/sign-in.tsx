import React from "react";
import { LinksFunction } from "remix";

// Components
import Input from "~/components/form/Input";
import Button from "~/components/Button";

// Css
import formCss from "~/css/pages/auth/form.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: formCss }
    ]
}

const AuthSignIn = () => {

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Pro")
    }

    return (
        <form className="iw_form" onSubmit={handleOnSubmit}>
            <Input
                className="mb-8"
                labelTitle="Username or email"
                placeholder="Username or email"
                name="username"
            />

            <Input
                className="mb-8"
                type="password"
                labelTitle="Password"
                placeholder="*****"
                name="password"
            />

            <div className="text-right">
                <Button type="submit" color="primary">
                    Sign In
                </Button>
            </div>
        </form>
    )
};

export default AuthSignIn;