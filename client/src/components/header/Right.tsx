import React from "react";
import { Link } from "remix";

// Components
import Button from "../Button";
import { UserPicture } from "../user/UserPicture";

// Hooks
import { useUser } from "~/hooks/useUser"

const Right = () => {
    const { user, status, handlers: { logout } } = useUser();

    const handleOnClickLogout = () => logout()

    return (
        <div className="iw_right">
            {
                status === 1 ? (
                    <>
                    <Link className="mr-4" to={`/user/${user.username.toLowerCase()}`}>
                        <UserPicture username={user.username} profile_picture={user.profile_picture}/>
                    </Link>
                    
                    <Button color="error" onClick={handleOnClickLogout}>
                        Logout
                    </Button>
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