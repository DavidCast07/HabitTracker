import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState(() => {
        try{
            const item = window.localStorage.getItem(key)
            if (item === null) 
                return initialValue
            return JSON.parse(item, dateReviver)
        }catch{
            return initialValue
        }
    })


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue))
    },[key, storedValue])

    return [storedValue, setStoredValue] as const
}

function dateReviver(_key: string, value: unknown) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
        return new Date(value)
    }
    return value
}