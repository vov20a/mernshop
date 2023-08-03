import React from "react";
import { useState, useEffect } from "react"

const usePersist = () => {
    const data = localStorage.getItem("persist");
    const item: boolean = data ? Boolean(JSON.parse(data)) : true
    // const itemBool = item === 'true' ? true : false;

    const [persist, setPersist] = useState(item);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist.toString()))
    }, [persist])

    return [persist, setPersist] as const;
}
export default usePersist