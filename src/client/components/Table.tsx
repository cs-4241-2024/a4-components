import React from "react";
import { Student } from "../../server/main";

interface TableProps {
    students: Student[];
    deleteStudent: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ students, deleteStudent }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Year</th>
                <th>Grade</th>
                <th>Letter Grade</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.year}</td>
                    <td>{student.grade}</td>
                    <td>{student.letterGrade}</td>
                    <td>
                        <button onClick={() => deleteStudent(student.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;