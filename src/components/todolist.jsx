import React, { useState } from 'react';
import { Input, Button, List, DatePicker, message } from 'antd';
import moment from 'moment';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const handleAddTodo = () => {
    if (!newTodo.trim() && !newDeadline.trim()) {
      message.error('请输入待办事项和截止日期');
      return;
    }
    if (!newTodo.trim()) {
      message.error('请输入待办事项');
      return;
    }
    if (!newDeadline.trim()) {
      message.error('请选择截止日期');
      return;
    }

const selectedDeadline = moment(newDeadline).format('YYYY-MM-DD');
    setTodos([
      ...todos,
      { text: newTodo, deadline: selectedDeadline, completed: false },
    ]);
    setNewTodo('');
    setNewDeadline('');
  };

  const handleDeleteTodo = index => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const handleToggleTodo = index => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const currentDate = moment().format('YYYY-MM-DD');

  return (
    <div>
      <Input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="待办事项"
      />
      <DatePicker
        value={newDeadline ? moment(newDeadline) : null}
        onChange={date => setNewDeadline(date ? date.format('YYYY-MM-DD') : '')}
        placeholder="选择截止日期"
        style={{ marginBottom: '1rem' }}
      />
      <Button onClick={handleAddTodo}>添加事项</Button>
      <List
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            style={{
              color: todo.deadline < currentDate ? 'red' : 'initial',
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text} - 截止日期: {todo.deadline}
            </span>
            <Button onClick={() => handleToggleTodo(index)}>
              {todo.completed ? '未完成' : '搞定'}
            </Button>
            <Button onClick={() => handleDeleteTodo(index)}>删除</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;