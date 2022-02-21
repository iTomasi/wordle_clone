export const getCookie = (name: string, cookies?: string) => {
    if (typeof window === "undefined" && !cookies) return false

    let cookie: string = cookies !== undefined ? cookies : document.cookie

    const match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (!match) return false

    return match[2]
};

export const delCookie = (name: string) => {
    if (typeof window === "undefined") return false

    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    return true
}