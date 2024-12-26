// App.js
import React, { useState, useEffect } from 'react';
import { Loading } from './loading/Loading';
import { Main } from './Main/main/Main';


const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Симуляция загрузки данных
        const timer = setTimeout(() => {
            setLoading(false);
        }, 20000); // Загрузка длится 3 секунды

        return () => clearTimeout(timer); // Очистка таймера
    }, []);

    return (
        <div className='app__main'>
            {loading ? <Loading /> : <Main />}
        </div>
    );
};

export default App;
