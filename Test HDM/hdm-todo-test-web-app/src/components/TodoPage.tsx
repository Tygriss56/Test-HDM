import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';
const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTasks, setEditedTasks] = useState<{ [key: number]: string }>({});

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      handleFetchTasks();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  const handleCreate = async () => {
    const taskName = prompt("Nom de la tâche");
    if (!taskName || taskName.trim() === '') return;
  
    const taskData = { name: taskName };
  
    try {
      console.log(" Envoi de la requête POST avec :", taskData);
      
      const response = await api.post('/tasks', taskData);
      console.log(" Réponse reçue :", response);
      
      handleFetchTasks(); 
    } catch (error) {
      console.error(" Erreur lors de la création de la tâche :", error);
    }
  };
  
 

  const handleSave = async (id: number) => {
    const newName = editedTasks[id];
    if (!newName || newName.trim() === '') return;

    try {
      await api.patch(`/tasks/${id}`, { name: newName });
      setEditedTasks((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      handleFetchTasks();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la tâche :", error);
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
            <TextField
              size="small"
              value={editedTasks[task.id] ?? task.name}
              onChange={(e) => setEditedTasks((prev) => ({ ...prev, [task.id]: e.target.value }))}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                disabled={editedTasks[task.id] === undefined || editedTasks[task.id] === task.name}
                onClick={() => handleSave(task.id)}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={handleCreate}>Ajouter une tâche</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
