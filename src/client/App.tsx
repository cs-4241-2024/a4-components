import "./index.css";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import { Student } from "../server/main";

function App() {
    const [ students, setStudents ] = useState<Student[]>( [] );

    // fetch initial students data from the server
    useEffect( () => {
        const fetchStudents = async () => {
            const res = await fetch( "/students" );
            const data = await res.json();
            setStudents( data );
        };

        fetchStudents();
    }, [] );

    const addStudent = ( student: Student ) => {
        setStudents( ( prevStudents ) => {
            const index = prevStudents.findIndex( ( s ) => s.name.toLowerCase() === student.name.toLowerCase() );
            if (index !== -1) {
                // update student
                prevStudents[index] = student;
                return [ ...prevStudents ];
            } else {
                // add student
                student.id = prevStudents.length;
                return [ ...prevStudents, student ];
            }
        } );
    }

    const deleteStudent = async ( id: number ) => {
        const res = await fetch( `/delete/${id}`, {
            method: "DELETE",
        } );

        if (res.ok) {
            setStudents( ( prevStudents ) => prevStudents.filter( ( student ) => student.id !== id ) );
        } else {
            console.error( "Failed to delete student" );
        }
    }

    return (
        <div className="App">
            <h1>Student Grade Table</h1>
            <Form addStudent={addStudent}/>
            <Table students={students} deleteStudent={deleteStudent}/>

        </div>
    );
}

export default App;
