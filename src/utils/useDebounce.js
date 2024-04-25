import React, {useState, useEffect} from 'react'

const useDebounce = (val, offset) => {
    const [debouncedVal, setDebouncedVal] = useState(val)

    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            setDebouncedVal(val);
            // console.log(val)
        }, offset);
        
        return () => {
            clearTimeout(timeoutRef)
        }
    }, [val])

    return debouncedVal;
}

export default useDebounce;