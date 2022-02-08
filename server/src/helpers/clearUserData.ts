const clearUserData = (payload: any) => {
    const copyUser = { ...payload }

    delete copyUser.password;
    delete copyUser.username_lower;
    delete copyUser.name_lower;

    return copyUser
};

export default clearUserData;