export function useForm(inputValues) {
    const [values, setValues] = useState(inputValues)

    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues({...valuess, [name]: value})
    };
    return {values, handleChange, setValues}
}