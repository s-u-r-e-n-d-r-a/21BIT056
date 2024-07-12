import React, { useEffect, useState } from 'react';
const API_URL ="http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000";
const ACCESS_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzY3MTY3LCJpYXQiOjE3MjA3NjY4NjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIyMjBjMGY0LTkyODItNGU0NC1iZTQwLWUwNGVjMDQzOTRiNSIsInN1YiI6ImNzNjM3NDEzNTYxOV9iaXQyNUBtZXBjb2VuZy5hYy5pbiJ9LCJjb21wYW55TmFtZSI6Im1lcGNvIiwiY2xpZW50SUQiOiJiMjIwYzBmNC05MjgyLTRlNDQtYmU0MC1lMDRlYzA0Mzk0YjUiLCJjbGllbnRTZWNyZXQiOiJGa2ZhZk9OQmNHcHpDVmF1Iiwib3duZXJOYW1lIjoiU3VyZW5kcmEiLCJvd25lckVtYWlsIjoiY3M2Mzc0MTM1NjE5X2JpdDI1QG1lcGNvZW5nLmFjLmluIiwicm9sbE5vIjoiMjFCSVQwNTYifQ.2gn6co6SjUXXB9hsgGpaOW8pdViPRS2XmdwLRRopZ1U"
const fetchProducts = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    let data = await response.json();
    return data;
};

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProducts();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>API Response</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default App;