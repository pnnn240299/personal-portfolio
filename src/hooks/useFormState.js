import { useState } from "react";

const useFormState = ({
    initialValues = {},
    validate = null,
    onSubmit = null,
} = {}) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // handle change (support nhiều loại input)
    const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;

        let val = value;
        if (type === "checkbox") val = checked;
        if (type === "file") val = files;

        setFormData((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    // set field thủ công
    const setField = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // blur → mark touched
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // validate form
    const runValidation = () => {
        if (!validate) return {};

        const validationErrors = validate(formData);
        setErrors(validationErrors);
        return validationErrors;
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = runValidation();
        if (Object.keys(validationErrors).length > 0) return;

        if (onSubmit) {
            await onSubmit(formData);
        }
    };

    // reset
    const resetForm = () => {
        setFormData(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        formData,
        errors,
        touched,
        setFormData,
        setField,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    };
};

export default useFormState;
