import { useMemo } from "react";

export const usePagination = (totalPages: number) => {
    let result = useMemo<number[]>(() => {
        let result = [];
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1);
        }
        return result;
    }, [totalPages]);
    return result;
};