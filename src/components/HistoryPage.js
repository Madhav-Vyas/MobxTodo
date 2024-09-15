import React from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../store/TodoStore';
import { useNavigate } from 'react-router-dom';
const HistoryPage = observer(() => {
    const navigate = useNavigate()

    const navigateTohome = () => {
        navigate("/")
    }
    return (
        <div className="min-h-screen bg-black flex flex-col items-center p-6">

            <div className="w-full max-w-md mb-8">
                <h1 className="text-5xl font-bold text-center text-blue-600">HISTORY</h1>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 shadow-md hover:bg-blue-700 transition" onClick={() => navigateTohome()}> go Home</button>

            <div className="w-full max-w-md space-y-4">
                {todoStore.history.length === 0 ? (
                    <p className="text-lg text-gray-500 text-center">No history available.</p>
                ) : (
                    todoStore.history.map((obj, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
                        >
                            <p className="text-lg font-semibold">{obj.input}</p>
                            <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition' onClick={() => todoStore.deleteHistoryItem(obj.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

export default HistoryPage;
