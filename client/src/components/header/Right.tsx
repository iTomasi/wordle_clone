import React from "react";

// Components
import Button from "../Button";

const Right = () => {
    return (
        <div>
            <Button
                className="mr-2"
                type="link"
                color="primary"
                href="/auth/sign-in"
            >
                Sign In
            </Button>

            <Button
                type="link"
                color="secundary"
                href="/auth/sign-up"
            >
                Sign Up
            </Button>
        </div>
    )
};

export default Right;