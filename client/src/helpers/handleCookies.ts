export const getCookie = (name: string) => {
    if (typeof window === "undefined") return false

    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (!match) return false

    return match[2]
}