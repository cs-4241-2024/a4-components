export default Form;
import React, { useState } from "react";
import { Student } from "../../server/main";

function Form( { addStudent }: { addStudent: ( student: Student ) => void } ) {
    const [ name, setName ] = useState( "" );
    const [ year, setYear ] = useState( "" );
    const [ grade, setGrade ] = useState( "" );

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();

        if (!name || !year || !grade) {
            alert( "Please fill out all fields" );
            return;
        }

        if (isNaN( parseInt( grade ) )) {
            alert( "Grade must be a number" );
            return;
        }

        if (parseInt(grade) < 0 || parseInt(grade) > 100) {
            alert( "Grade must be between 0 and 100" );
            return;
        }

        const student = { name, year, grade: parseInt( grade ) };

        const res = await fetch( "/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { student } ),
        } );

        if (res.ok) {
            const data = await res.json();
            addStudent( data );
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder="Student Name" value={name}
                       onChange={( e ) => setName( e.target.value )}/>
                <select id="class" value={year} onChange={( e ) => setYear( e.target.value )}>
                    <option value="">Select Student Year/Type</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="grad">Grad</option>
                    <option value="part-time">Part-Time</option>
                </select>
                <input type="number" id="grade" placeholder="Final Grade (Number)" value={grade}
                       onChange={( e ) => setGrade( e.target.value )}/>
                <button id="submit" type="submit">Add/Update Student</button>
            </form>
        </div>
    );
}