import React, { useState } from "react";
import { Link } from "remix";

// Components
import Button from "../../Button";
import { UserPicture } from "../../user/UserPicture";
import { UserNavBar } from "./UserNavBar";

// Hooks
import { useUser } from "~/hooks/useUser"

const Right = () => {
    const { user, status } = useUser();
    const [showNavBar, setShowNavBar] = useState<boolean>(false);

    return (
        <div className="iw_right">
            {
                status === 1 ? (
                    <>
                    <div className="iw_userPictureContainer relative mr-4" onClick={() => setShowNavBar((prev) => !prev)}>
                        <UserPicture
                            username={user.username}
                            profile_picture={user.profile_picture}
                        />

                        <UserNavBar
                            show={showNavBar}
                            setShow={setShowNavBar}
                        />
                    </div>
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