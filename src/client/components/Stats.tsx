import { useEffect, useState } from "react";
import { Student } from "../../server/main";

function Stats( { students }: { students: Student[] } ) {
    const [ stats, setStats ] = useState( {
        allAvg: 0,
        allCount: 0,
        freshmanAvg: 0,
        freshmanCount: 0,
        sophomoreAvg: 0,
        sophomoreCount: 0,
        juniorAvg: 0,
        juniorCount: 0,
        seniorAvg: 0,
        seniorCount: 0,
        gradAvg: 0,
        gradCount: 0,
        partTimeAvg: 0,
        partTimeCount: 0,
    } );

    useEffect( () => {
        const calculateStats = () => {
            const stats = {
                allAvg: 0,
                allCount: 0,
                freshmanAvg: 0,
                freshmanCount: 0,
                sophomoreAvg: 0,
                sophomoreCount: 0,
                juniorAvg: 0,
                juniorCount: 0,
                seniorAvg: 0,
                seniorCount: 0,
                gradAvg: 0,
                gradCount: 0,
                partTimeAvg: 0,
                partTimeCount: 0,
            };

            if (students.length > 0) {
                const studentGroups = {
                    freshman: [],
                    sophomore: [],
                    junior: [],
                    senior: [],
                    grad: [],
                    partTime: [],
                };

                students.forEach( student => {
                    stats.allAvg += student.grade;
                    stats.allCount += 1;
                    // @ts-ignore
                    studentGroups[student.year].push( student );
                } );

                stats.allAvg /= stats.allCount;

                for (const [ key, group ] of Object.entries( studentGroups )) {
                    if (group.length > 0) {
                        // not sure why the linter is complaining here
                        // @ts-ignore
                        stats[`${key}Avg`] = group.reduce( ( sum, student ) => sum + student.grade, 0 ) / group.length;
                        // @ts-ignore
                        stats[`${key}Count`] = group.length;
                    }
                }
            }

            setStats( stats );
        };

        calculateStats();
    }, [ students ] );

    return (
        <div id="stats">
            <table>
                <caption>Class Statistics</caption>
                <thead>
                <tr>
                    <th scope="col">Student Year/Type</th>
                    <th scope="col">Average Grade</th>
                    <th scope="col">Number of Students</th>
                </tr>
                </thead>
                <tbody id="stats-body">
                <tr>
                    <td>Whole Class</td>
                    <td id="all-avg">{stats.allAvg.toFixed( 2 )}</td>
                    <td id="all-count">{stats.allCount}</td>
                </tr>
                <tr>
                    <td>Freshman</td>
                    <td id="freshman-avg">{stats.freshmanAvg.toFixed( 2 )}</td>
                    <td id="freshman-count">{stats.freshmanCount}</td>
                </tr>
                <tr>
                    <td>Sophomore</td>
                    <td id="sophomore-avg">{stats.sophomoreAvg.toFixed( 2 )}</td>
                    <td id="sophomore-count">{stats.sophomoreCount}</td>
                </tr>
                <tr>
                    <td>Junior</td>
                    <td id="junior-avg">{stats.juniorAvg.toFixed( 2 )}</td>
                    <td id="junior-count">{stats.juniorCount}</td>
                </tr>
                <tr>
                    <td>Senior</td>
                    <td id="senior-avg">{stats.seniorAvg.toFixed( 2 )}</td>
                    <td id="senior-count">{stats.seniorCount}</td>
                </tr>
                <tr>
                    <td>Grad</td>
                    <td id="grad-avg">{stats.gradAvg.toFixed( 2 )}</td>
                    <td id="grad-count">{stats.gradCount}</td>
                </tr>
                <tr>
                    <td>Part-Time</td>
                    <td id="part-time-avg">{stats.partTimeAvg.toFixed( 2 )}</td>
                    <td id="part-time-count">{stats.partTimeCount}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Stats;