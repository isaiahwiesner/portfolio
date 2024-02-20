export function v4() {
    const chars = "0123456789abcdef".split("")
    const randomChar = () => {
        return chars[Math.floor(Math.random()*chars.length)]
    }
    return [
        [...Array(8)].map(_ => randomChar()).join(""),
        [...Array(4)].map(_ => randomChar()).join(""),
        [...Array(4)].map(_ => randomChar()).join(""),
        [...Array(4)].map(_ => randomChar()).join(""),
        [...Array(12)].map(_ => randomChar()).join("")
    ].join("-")
}