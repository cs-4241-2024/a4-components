import React, { useState, useEffect } from 'react';

const FormComponent = ({ addData, editIndex, data }) => {
    const [formData, setFormData] = useState({ name: '', points: '', score: '', difficulty: '' });

    useEffect(() => {
        if (editIndex !== null) {
            setFormData(data[editIndex]);
        } else {
            setFormData({ name: '', points: '', score: '', difficulty: '' });
        }
    }, [editIndex, data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addData(formData);
        setFormData({ name: '', points: '', score: '', difficulty: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="points" value={formData.points} onChange={handleChange} placeholder="Points" required />
            <input name="score" value={formData.score} onChange={handleChange} placeholder="Score" required />
            <input name="difficulty" value={formData.difficulty} onChange={handleChange} placeholder="Difficulty" required />
            <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default FormComponent;