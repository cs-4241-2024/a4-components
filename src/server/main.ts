import express from "express";
import ViteExpress from "vite-express";

const app = express();

export interface Student {
    id: number;
    name: string;
    year: number;
    grade: number;
    letterGrade: string;
}
const students: Student[] = [];

// middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );


app.get( "/students", ( _, res ) => {
    console.log("GET /students", students);
    res.json( students );
} );

app.post( "/add", ( req, res ) => {
    const student = req.body.student;

    const grade = parseInt( student.grade );
    const letterGrade = getLetterGrade( grade );

    student.grade = grade;
    student.letterGrade = letterGrade;

    // check if student already exists
    let index = students.findIndex( ( s ) => s.name.toLowerCase() === student.name.toLowerCase() );
    if (index !== -1) {
        students[index] = student;
        student.id = index;
        res.status( 201 ).json( student );
    } else {
        student.id = students.length;
        students.push( student );
        res.status( 200 ).json( student );
    }
    console.log("POST /add", student);
} );

app.delete( "/delete/:id", ( req, res ) => {
    const id = parseInt( req.params.id );
    const index = students.findIndex( ( student ) => student.id === id );

    console.log("DELETE /delete/:id", id, index);

    if (index !== -1) {
        students.splice( index, 1 );
        res.status( 200 ).json( { message: "Student deleted successfully" } );
    } else {
        res.status( 404 ).json( { message: "Student not found" } );
    }
} );

ViteExpress.listen( app, 3000, () =>
    console.log( "Server is listening on port 3000..." ),
);


function getLetterGrade(grade: number): string {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    return "NR";
}