import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import SQLiteDb from '.';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');

  const db = new SQLiteDb<TodoItem>('todos.db');

  const createTodoTable = async () => {
    try {
      await db.createTable('todos', [
        {name: 'title', type: 'TEXT'},
        {name: 'completed', type: 'INTEGER', constraints: 'DEFAULT 0'},
      ]);
    } catch (error) {
      console.error('Error creating todos table:', error);
    }
  };

  const loadTodos = async () => {
    try {
      const todoItems = await db.getAllRecords('todos');
      console.log('todoItems: ', todoItems);
      setTodos(todoItems);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const loadCompletedTodos = async () => {
    try {
      const todoItems = await db.getRecordsByQuery(
        'select * from todos where completed = ?',
        [1],
      );
      setCompletedTodos(todoItems);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const addTodo = async () => {
    if (inputText.trim() !== '') {
      const newTodo: TodoItem = {
        id: todos.length + 1,
        title: inputText,
        completed: false,
      };

      try {
        const insertedId = await db.createRecord('todos', newTodo);
        // newTodo.id = insertedId;
        loadTodos();
        setInputText('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const updateTodo = async (id: number, updatedData: Partial<TodoItem>) => {
    try {
      await db.updateRecord('todos', id, updatedData);
      loadTodos();
      loadCompletedTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await db.deleteRecord('todos', id);
      loadTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    loadCompletedTodos();
    createTodoTable();
    loadTodos();
  }, []);

  return (
    <View style={{flex: 1, padding: 20}}>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 8,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        placeholder="Enter a todo..."
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        renderItem={({item}: {item: TodoItem}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.title}</Text>
            <Button
              title={item.completed ? 'Undo' : 'Complete'}
              onPress={() => updateTodo(item.id, {completed: !item.completed})}
            />
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <Text>Completed Todos</Text>
      <FlatList
        data={completedTodos}
        renderItem={({item}: {item: TodoItem}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.title}</Text>
            <Button
              title={item.completed ? 'Undo' : 'Complete'}
              onPress={() => updateTodo(item.id, {completed: !item.completed})}
            />
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default TodoApp;
