import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import ModelForm from './ModelForm';
import PrismaSchemaGenerator from './PrismaSchemaGenerator';

const SchemaDesigner = ({ models, setModels, permissions, setPermissions }) => {
  const addModel = () => {
    const newModelName = `Model${models.length + 1}`;
    const newModel = { name: newModelName, fields: [] };
    setModels([...models, newModel]);

    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [newModelName]: {
        create: 'public',
        read: 'public',
        update: 'public',
        delete: 'public'
      }
    }));
  };

  const updateModel = (index, updatedModel) => {
    const newModels = [...models];
    const oldModelName = newModels[index].name;
    newModels[index] = updatedModel;
    setModels(newModels);

    if (oldModelName !== updatedModel.name) {
      setPermissions(prevPermissions => {
        const newPermissions = { ...prevPermissions };
        newPermissions[updatedModel.name] = newPermissions[oldModelName];
        delete newPermissions[oldModelName];
        return newPermissions;
      });
    }
  };

  const deleteModel = (index) => {
    const modelToDelete = models[index];
    const newModels = models.filter((_, i) => i !== index);
    setModels(newModels);

    setPermissions(prevPermissions => {
      const newPermissions = { ...prevPermissions };
      delete newPermissions[modelToDelete.name];
      return newPermissions;
    });
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
    {models.map((model, index) => (
      <Card key={index} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {model.name}
          </Typography>
          <ModelForm
            model={model}
            updateModel={(updatedModel) => updateModel(index, updatedModel)}
            deleteModel={() => deleteModel(index)}
            allModels={models}  // Pass all models
          />
        </CardContent>
      </Card>
    ))}
    <Button variant="contained" onClick={addModel}>Add Model</Button>
    <PrismaSchemaGenerator models={models} />
  </Box>
  );
};

export default SchemaDesigner;