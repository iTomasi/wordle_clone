import React from "react";

// Components
import Button from "../Button";

// Hooks
import { useUser } from "~/hooks/useUser"

const Right = () => {
    const { status } = useUser();

    return (
        <div>
            {
                status === 1 ? (
                    <>
                    Logged
                    </>
                ) : (
                    <>
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
                    </>
                )
            }
        </div>
    )
};

export default Right;