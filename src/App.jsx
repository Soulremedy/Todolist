import React from 'react';
import './App.css';
import TodoList from './components/todolist';

const App = () => {
  document.title = 'Todo List'; // 设置网页标题为 "Todo List"
  
  return (
    <div>
      <h1 id='header'>Todo List</h1> {/* 添加题目 "Todo List" */}
      <TodoList />
    </div>
  );
};

export default App;