import React, { useState } from 'react';
import * as axios from 'axios';
import * as base64 from 'base-64';
import * as https from 'https';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config';
import styles from '../styles/persons.module.css'

const PersonList = () => {
    let [state, setState] = useState({});
    let [count, setCount] = useState(1)
    let [currentPage, setCurrentPage] = useState(0)
    let [personsNumber, setPersonsNumber] = useState(0)

    let pageNumber = [];
    const pageSize = 15;
    let pages = Math.ceil(personsNumber / pageSize);
    for (let i = 0; i < pages; i++) {
        pageNumber.push(i + 1);
    }

    const encodedPassword = base64.encode(`${config.personsListConfig.credentials.user}:${config.personsListConfig.credentials.password}`)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const requestData = {
        method: config.personsListConfig.requestConfig.method,
        url: `${config.personsListConfig.requestConfig.url}?page_len=${pageSize}&page=${count}`,
        headers: {
            Authorization: `Basic ${encodedPassword}`
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }

    let onPageChange = (curr) => {
        setCount(curr);
        sendRequest();
    }

    let sendRequest = () => {
        axios(requestData).then(response => {
            setState(state = response.data.data)
            setPersonsNumber(response.data.data.num_elems)
        })
    }
    if (currentPage !== count) {
        setCurrentPage(count)
        sendRequest()
    }

    return (
        <div className={styles.persons}>
            <ul className = {styles.personsList}>
                {state.people && state.people.map((person) => <li key = {uuidv4()}>{person.name} {person.midname} {person.surname} </li>)}
            </ul>
            <div className={styles.pages}>
                {state.people && pageNumber.map(item => <div key = {uuidv4()} className = {styles.page} onClick={() => { onPageChange(item) }}>{item}</div>)}
            </div>
        </div>
    )

}

export default PersonList;