import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);

  function adicionarTarefa() {
    if (inputValue !== '') {
      if (editMode) {
        editarTarefa(idToEdit, inputValue);
        setEditMode(false);
        setIdToEdit(null);
      } else {
        const newTask = {
          id: Math.random().toString(),
          item: inputValue,
        };

        setData([...data, newTask]);
      }

      setInputValue('');
    }
  }

  function deletarTarefa(id) {
    setData(data.filter((task) => task.id !== id));
  }

  function editarTarefa(id, newValue) {
    setData(data.map((task) => (task.id === id ? { id, item: newValue } : task)));
  }

  function handleEdit(id) {
    setEditMode(true);
    setIdToEdit(id);
    const taskToEdit = data.find((task) => task.id === id);
    setInputValue(taskToEdit.item);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Digite uma tarefa..."
        />
        <TouchableOpacity onPress={() => adicionarTarefa()}>
          <Entypo name='circle-with-plus' size={28}  />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.taskList}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskText}>{item.item}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
                <AntDesign name="edit" size={24} color="black" style={styles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarTarefa(item.id)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
    padding: 8,
  },
  title: {
    fontFamily: 'impact',
    fontSize: 50,
    color: '#2582a7',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    padding: 3,
    alignSelf: 'center',
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    width: '90%',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#2582a7',
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#33B5F1',
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2,},
    shadowOpacity: 1.0,
    shadowRadius: 10,
    elevation: 15,
  },
  buttons: {
    flexDirection: 'row',
  },
  taskList: {
    marginTop: 20,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    flexShrink: 1,
  },
  editIcon: {
    marginRight: 10,
  },
});
