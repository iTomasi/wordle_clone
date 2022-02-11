import React, { useState } from "react";
import { LinksFunction, useNavigate } from "remix";
import { toast } from "react-hot-toast";

// Components
import Input from "~/components/form/Input";
import Button from "~/components/Button";

// Hooks
import { useUser } from "~/hooks/useUser";

// Requests
import { AxiosSignInEmail } from "~/requests/localApi/AxiosAuth";

// Css
import formCss from "~/css/pages/auth/form.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: formCss }
    ]
}

const AuthSignIn = () => {
    const navigate = useNavigate();
    const { handlers: { loggin } } = useUser();

    const [fetching, setFetching] = useState<boolean>(false);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        setFetching(true);

        const { error, data } = await AxiosSignInEmail({ username, password });

        if (error) {
            toast.error(error);
            setFetching(false)
            return
        }

        loggin(data.user, data.token);
        toast.success("Logged successfully");
        navigate("/");
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
                <Button type="submit" color="primary" loading={fetching}>
                    Sign In
                </Button>
            </div>
        </form>
    )
};

export default AuthSignIn;