import React, { useState } from 'react';
import todoStore from '../store/TodoStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const Addtodo = observer(() => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    const navigateToHistoryPage = () => {
        todoStore.loadHistory();
        navigate('/historyPage');
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center p-6">
            <h1 className='text-white text-5xl underline mb-4'>MY TODO LIST</h1>
            <div className="w-full max-w-md mb-4">
                <button
                    className="px-4 py-2 md:ml-96 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    onClick={navigateToHistoryPage}
                >
                    HISTORY
                </button>
            </div>

            <div className="w-full max-w-md flex items-center space-x-2 mb-6">
                <input
                    className="flex-grow border border-gray-300 rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter new todo..."
                />
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => {
                        todoStore.addTask(input)
                        setInput('');
                    }}
                >
                    ADD TODO
                </button>
            </div>

            <div className="w-full max-w-md space-y-4">
                {todoStore?.todos.map((obj, idx) => {
                    return (
                        <div
                            key={idx}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold text-lg">{obj.task}</p>
                                <p className="text-sm text-gray-500">
                                    Completed: <span className="font-medium">{obj.status}</span>
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => {
                                    setInput(obj.task);
                                    todoStore.updateTask(obj.id)


                                }} className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">
                                    Edit
                                </button>
                                <button
                                    onClick={() => todoStore.removeTask(obj.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        obj.status = 'Yes';
                                        todoStore.removeTask(obj.id);
                                        todoStore.addToHistory(obj.id, obj.task, obj.status);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    DONE
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default Addtodo;
