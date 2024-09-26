import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FormComponent from './FormComponent';
import TableComponent from './TableComponent';
import './main.css';

const App = () => {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('assignments');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(data));
    }, [data]);

    const addData = (newData) => {
        if (editIndex !== null) {
            const updatedData = [...data];
            updatedData[editIndex] = newData;
            setData(updatedData);
            setEditIndex(null);
        } else {
            setData([...data, newData]);
        }
    };

    const editData = (index) => {
        setEditIndex(index);
    };

    const deleteData = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    return (
        <div>
            <FormComponent addData={addData} editIndex={editIndex} data={data} />
            <TableComponent data={data} editData={editData} deleteData={deleteData} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));