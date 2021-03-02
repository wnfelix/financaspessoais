import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IHeaderToolBarProps {
    title: {
        text: string,
        url: string
    },
    links: [
        {
            text: string,
            url: string
        }
    ]
}

export default function HeaderToolBar(props: IHeaderToolBarProps) {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to={props.title.url}>{props.title.text}</Navbar.Brand>
            <Nav className="mr-auto">
                {props.links.map(l =>
                    <Nav.Link key={l.text} as={Link} to={l.url} >{l.text}</Nav.Link>
                )}
            </Nav>
        </Navbar>
    )
}