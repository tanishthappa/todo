import React, { useEffect, useState } from 'react';

const Crud = () => {
    // Load initial state from localStorage or set to empty array if not found
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('crudItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    // Update localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('crudItems', JSON.stringify(items));
    }, [items]);

    const handleDelete = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
    };

    const handleEdit = (id) => {
        const itemToEdit = items.find(item => item.id === id);
        setEditingItem(itemToEdit);
        setFirstName(itemToEdit.firstname);
        setLastName(itemToEdit.lastname);
        setAge(itemToEdit.age);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingItem) {
            const updatedItems = items.map(item => {
                if (item.id === editingItem.id) {
                    return { ...item, firstname: firstName, lastname: lastName, age: age };
                }
                return item;
            });
            setItems(updatedItems);
        } else {
            const maxId = items.reduce((acc, item) => Math.max(acc, item.id), 0);
            const newItem = {
                id: maxId + 1, // Simple ID generation, replace with a better ID generator
                firstname: firstName,
                lastname: lastName,
                age: age,
            };
            setItems([...items, newItem]);
        }
        handleClear();
    };

    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setEditingItem(null);
    };

    return (
        <div className="crud-container">
    <div className="form-container">
        <form onSubmit={handleSave}>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter the first name" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter the last name" />
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter the age" />
            <button type="submit">{editingItem ? 'Update' : 'Save'}</button>
            <button type="button" onClick={handleClear}>Clear</button>
        </form>
    </div>
    <div className="table-container">
    <ul className="data-list">
    {items.map((item, index) => (
        <li key={index} className="data-item">
            <div className="data-row">
                <span className="data-label">Sr.no:</span>
                <span>{index + 1}</span>
            </div>
            <div className="data-row">
                <span className="data-label">id:</span>
                <span>{item.id}</span>
            </div>
            <div className="data-row">
                <span className="data-label">firstname:</span>
                <span>{item.firstname}</span>
            </div>
            <div className="data-row">
                <span className="data-label">lastname:</span>
                <span>{item.lastname}</span>
            </div>
            <div className="data-row">
                <span className="data-label">age:</span>
                <span>{item.age}</span>
            </div>
            <div className="data-row">
                <button className='btn btn-primary mx-4' onClick={() => handleEdit(item.id)}>Edit</button>
                <button className='btn btn-danger mx-4' onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
        </li>
    ))}
</ul>

    </div>
</div>
    );
};

export default Crud;