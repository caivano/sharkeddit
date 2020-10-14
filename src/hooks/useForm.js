const { useState } = require("react")

const useForm = (initialState) => {
    const [form, setForm] = useState(initialState)

    const handleInputChange = (event) => {
        const {value, name} = event.target
        setForm({...form, [name]: value})        
    }
    
    const resetState = () => {
        setForm(initialState);
      };

    return [form, handleInputChange, resetState]
}

export default useForm
