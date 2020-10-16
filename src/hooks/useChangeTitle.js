import { useEffect } from "react";

const useChangeTitle = (title) => {
    useEffect(() => {
        document.title = `${title}`
    }, [title])
}
 
export default useChangeTitle;
