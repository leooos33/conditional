import { BigNumber } from "@ethersproject/bignumber"

export const uintSolidityMaxValue: BigNumber = BigNumber.from(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
)

const defaultNumDigits = 18

export const toToken = (value: any[], digits?: number): BigNumber[] => {
    return value.map((i) => Token(i, digits))
}

export const Token = (
    value: string | number,
    digits = defaultNumDigits
): BigNumber => {
    if (value === 0 || value === "0" || !value) return BigNumber.from(0)

    value = parseFloat(value.toString())
    let [x, y] = value.toString().split(".")

    const a: any = BigNumber.from(x + "0".repeat(digits))
    if (y) {
        y = y.slice(0, digits)
        let zeros = digits - y.length
        const b = BigNumber.from(y + (zeros > 0 ? "0".repeat(zeros) : ""))

        return a.add(b)
    } else return a
}

//TODO: make it NOT look like some beginers code
export const _Token = (value: BigNumber): string => {
    if (value.toString() === "0") return "0"
    const num = value.toString()
    let newNum

    if (num.length > 18) {
        const point = num.length - defaultNumDigits

        const parts = [num.slice(0, point), num.slice(point)]

        if (parts[1].replace(/0/gi, "") === "") {
            newNum = parts[0]
        } else if (!parts[0]) {
            newNum = "0." + parts[1]
            while (newNum[newNum.length - 1] === "0")
                newNum = newNum.slice(0, -1)
        } else {
            newNum = parts.join(".")
            while (newNum[newNum.length - 1] === "0")
                newNum = newNum.slice(0, -1)
        }
    } else {
        const delta = defaultNumDigits - num.length
        newNum = "0." + "0".repeat(delta) + num
        while (newNum[newNum.length - 1] === "0") newNum = newNum.slice(0, -1)
    }
    return newNum
}

export const isValidInput = (x: any) => {
    const err = isNaN(x) || !parseFloat(x)
    return !err
}
