import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup, ListGroup, Button } from 'react-bootstrap';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [hoveredTask, setHoveredTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTask = { id: Date.now(), text: inputValue.trim() };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (idToDelete) => {
    const updatedTasks = tasks.filter(task => task.id !== idToDelete);
    setTasks(updatedTasks);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">TodoList</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Añadir nueva tarea"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleAddTask}
        />
      </InputGroup>

      {tasks.length === 0 ? (
        <p className="text-center text-muted">No hay tareas.</p>
      ) : (
        <ListGroup>
          {tasks.map(task => (
            <ListGroup.Item
              key={task.id}
              className="d-flex justify-content-between align-items-center"
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              {task.text}
              {hoveredTask === task.id && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                  className="ms-2"
                >
                  X
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Home;