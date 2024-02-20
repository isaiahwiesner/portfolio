import { useEffect, useRef } from "react"

export function sortData(data = [], orderBy) {
    let orders = []
    if (typeof orderBy === String) {
        orders = [orderBy]
    }
    else {
        orders = [...orderBy]
    }
    orders.reverse().forEach((order) => {
        data = data.sort((a, b) => {
            let dir = 1
            if (order.startsWith("-")) {
                order = order.slice(1)
                dir = -1
            }
            let orderKey = order.split(".")
            if (orderKey.length === 1) {
                if (a[orderKey[0]] > b[orderKey[0]]) return -1 * dir
                if (a[orderKey[0]] < b[orderKey[0]]) return 1 * dir
                return 0
            }
            else if (orderKey.length === 2) {
                if (a[orderKey[0]][orderKey[1]] > b[orderKey[0]][orderKey[1]]) return -1 * dir
                if (a[orderKey[0]][orderKey[1]] < b[orderKey[0]][orderKey[1]]) return 1 * dir
                return 0
            }
            else if (orderKey.length === 3) {
                if (a[orderKey[0]][orderKey[1]][orderKey[2]] > b[orderKey[0]][orderKey[1]][orderKey[2]]) return -1 * dir
                if (a[orderKey[0]][orderKey[1]][orderKey[2]] < b[orderKey[0]][orderKey[1]][orderKey[2]]) return 1 * dir
                return 0
            }
            else return 0
        })
    })
    return data
}

export function paginateData(data = [], perPage = 10) {
    let outData = []
    let itemCount = 0
    data.forEach((item) => {
        let pageNum = Math.floor(itemCount / perPage)
        if (itemCount % perPage === 0 && outData.length < pageNum + 1) {
            outData.push([])
        }
        outData[pageNum].push(item)
        itemCount++
    })
    return outData
}

export const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null)
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])
    const debouncedCallback = (...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }
    return debouncedCallback
}