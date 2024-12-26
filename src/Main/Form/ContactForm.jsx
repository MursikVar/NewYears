import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://new-year-by-itacademy.ru/api/contact', {
                name,
                email,
                message,
            }).catch();
            setStatus(response.data.message);
            setName('');
            setEmail('');
            setMessage('');
            fetchContacts(); // Обновляем список контактов после отправки
        } catch (error) {
            setStatus('Error saving contact.');
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://new-year-by-itacademy.ru/api/contacts').catch();
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts(); 
    }, []);

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send</button>
            </form>

            {status && <p>{status}</p>}
            <h3>Submitted Contacts:</h3>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {contact[0]} <br />
                        <strong>Email:</strong> {contact[1]} <br />
                        <strong>Message:</strong> {contact[2]} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactForm;
