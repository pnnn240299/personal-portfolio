import { useState } from "react";

const useFormState = (initialValues = {}) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const setField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return { formData, setFormData, handleChange, setField };
};

export default useFormState;
