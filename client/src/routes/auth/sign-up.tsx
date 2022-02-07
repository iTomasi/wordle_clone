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
    return (
        <form className="iw_form">
            <Input
                className="mb-4"
                labelTitle="Name"
                placeholder="Your name"
            />

            <Input
                labelTitle="Username"
                placeholder="ex. Tomas"
            />

        </form>
    )

};

export default AuthSignUp;