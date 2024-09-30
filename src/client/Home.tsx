import React, {ReactElement, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import {IEvent} from "./App";
import InputGroup from "react-bootstrap/InputGroup";
import "./css/Home.css"

function Field({label, type, placeholder, updateValue, readOnly, value}: {
    label: string,
    type: string,
    placeholder?: string,
    updateValue?: (val: string) => void,
    readOnly?: boolean,
    value?: string
}): ReactElement {
    if (!updateValue) {
        updateValue = (_: string) => {
        }
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} readOnly={readOnly} value={value} onChange={e => {
                updateValue(e.target.value);
            }}/>
        </Form.Group>
    );
}

function Event({event, update, remove}: {
    event: IEvent,
    update: (id: string, event: IEvent) => void,
    remove: (id: string) => void
}): ReactElement {
    const [editing, setEditing] = useState(event._id === "new");
    const [submitting, setSubmitting] = useState(false);

    async function submitEvent(e: React.MouseEvent) {
        e.preventDefault();
        setSubmitting(true);
        const date = event.time.date;
        if (date === '') {
            alert('Please enter valid date');
            return;
        }

        const response = await fetch('/addEvent', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let res = await response.text();
        const resEvent: any = JSON.parse(res);
        const cpy = structuredClone(event);
        cpy._id = resEvent._id;
        cpy.depart_time = resEvent.depart_time;
        update("new", cpy);
        setSubmitting(false);
        setEditing(false);
    }

    async function updateEvent(e: React.MouseEvent) {
        e.preventDefault();

        const response = await fetch('/updateEvent', {
            method: 'PUT',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json: IEvent = await response.json();
        const cpy = structuredClone(event);
        cpy.depart_time = json.depart_time;
        update(event._id, cpy);
        setSubmitting(false);
        setEditing(false);
    }

    async function deleteEvent(e: React.MouseEvent) {
        e.preventDefault();

        await fetch("/deleteEvent", {
            method: 'DELETE',
            body: JSON.stringify({_id: event._id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        remove(event._id);
    }

    function cancelEvent(e: React.MouseEvent) {
        e.preventDefault();
        remove("new");
    }

    return (
        <ListGroup.Item as="div">
            <Form>
                <Field label="Name: " type="text" readOnly={!editing} placeholder="Event Name" value={event.name} updateValue={(value) => {
                    const cpy = structuredClone(event);
                    cpy.name = value;
                    update(event._id, cpy);
                }}/>
                <Field label="Date: " type="date" readOnly={!editing} value={event.time.date} updateValue={(value) => {
                    const cpy = structuredClone(event);
                    cpy.time.date = value;
                    update(event._id, cpy);
                }}/>
                <Field label="Time: " type="time" readOnly={!editing} value={event.time.time} updateValue={(value) => {
                    const cpy = structuredClone(event);
                    cpy.time.time = value;
                    update(event._id, cpy);
                }}/>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="hrs">Travel Duration: </Form.Label>
                    <InputGroup>
                        <Form.Control id="hrs" type="number" min="0" step="1" readOnly={!editing} value={event.travel_hrs} onChange={e => {
                            const cpy = structuredClone(event);
                            cpy.travel_hrs = e.target.value;
                            update(event._id, cpy);
                        }}/>
                        <InputGroup.Text className="mb-3">hours</InputGroup.Text>
                        <Form.Control type="number" min="0" max="59" step="1" readOnly={!editing} value={event.travel_mins} onChange={e => {
                            const cpy = structuredClone(event);
                            cpy.travel_mins = e.target.value;
                            update(event._id, cpy);
                        }}/>
                        <InputGroup.Text className="mb-3">minutes</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Field label="Depart Time: " type="text" readOnly value={event.depart_time}/>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" disabled={submitting} onClick={e => {
                        if (editing) {
                            if (event._id === "new")
                                submitEvent(e);
                            else
                                updateEvent(e);
                        } else {
                            setEditing(true);
                        }
                    }}>{editing ? "Submit" : "Edit"}</Button>
                    <Button variant="danger" disabled={submitting || editing}
                            onClick={event._id === "new" ? cancelEvent : deleteEvent}>{event._id === "new" ? "Cancel" : "Delete"}</Button>
                </div>
            </Form>
        </ListGroup.Item>

    );
}

function useEventList(setNewEvent: React.Dispatch<React.SetStateAction<boolean>>): [IEvent[], (events: IEvent[]) => void, () => void, (id: string, event: IEvent) => void, (id: string) => void] {
    const [events, setEventsState] = React.useState<IEvent[]>([]);
    const setEvents = (events: IEvent[]) => {
        setEventsState(events);
    }
    const addEvent = () => {
        setEventsState([...events, {
            _id: "new",
            name: "",
            time: {date: "", time: ""},
            travel_hrs: "",
            travel_mins: "",
            depart_time: "",
            user: "",
        }]);
        setNewEvent(true);
    }
    const updateEvent = (id: string, event: IEvent) => {
        setEventsState(events.map((c) => c._id === id ? event : c));
    }
    const removeEvent = (id: string) => {
        setEventsState(events.filter((c) => c._id !== id));
        setNewEvent(false);
    }
    return [events, setEvents, addEvent, updateEvent, removeEvent];
}

function Home({setUser}: {setUser: React.Dispatch<React.SetStateAction<string | undefined>>}): ReactElement {
    const [newEvent, setNewEvent] = useState(false);
    const [events, setEvents, addEvent, updateEvent, removeEvent] = useEventList(setNewEvent);

    useEffect(() => {
        async function fetchEvents() {
            const response = await fetch('/getEvents', {
                method: 'GET'
            });
            console.log("Got response");
            const text = await response.text();
            console.log(text);
            const receivedEvents: IEvent[] = JSON.parse(text);

            setEvents(receivedEvents);
        }

        fetchEvents();
        return () => setEvents([]);
    }, []);

    async function logout(e: React.MouseEvent) {
        e.preventDefault();
        await fetch('/logout', {
            method: 'POST'
        });
        setUser(undefined);
    }

    return (
        <>
            <Button variant="danger" className="m-3" onClick={logout}>Logout</Button>
            <Container className="align-items-center">
                <h1 className="display-1 text-center">Events</h1>
                <ListGroup as="div">
                    {events.map(
                        event => <Event key={event._id} event={event} update={updateEvent} remove={removeEvent}/>
                    )}
                </ListGroup>
            </Container>
            <div className="d-flex justify-content-center">
                <Button variant="primary" className="w-75 m-3" disabled={newEvent} onClick={addEvent}>Add Event</Button>
            </div>
        </>
    );
}

export default Home;
