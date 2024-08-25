// components/ModelForm.js
import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';

const ModelForm = ({ model, updateModel, deleteModel, allModels }) => {
  const addField = () => {
    const updatedModel = {
      ...model,
      fields: [...model.fields, { 
        name: '', 
        type: 'string', 
        isRequired: false, 
        isUnique: false, 
        isAutoIncrement: false,
        min: '', 
        max: '', 
        relation: '' 
      }],
    };
    updateModel(updatedModel);
  };

  const updateField = (index, updatedField) => {
    const updatedFields = [...model.fields];
    updatedFields[index] = updatedField;
    updateModel({ ...model, fields: updatedFields });
  };

  const deleteField = (index) => {
    const updatedFields = model.fields.filter((_, i) => i !== index);
    updateModel({ ...model, fields: updatedFields });
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        label="Model Name"
        value={model.name}
        onChange={(e) => updateModel({ ...model, name: e.target.value })}
      />
      <Button variant="outlined" color="secondary" onClick={deleteModel}>Delete Model</Button>
      <Typography variant="h6">Fields:</Typography>
      {model.fields.map((field, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={2}>
            <TextField
              label="Field Name"
              value={field.name}
              onChange={(e) => updateField(index, { ...field, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={field.type}
                onChange={(e) => updateField(index, { ...field, type: e.target.value })}
                label="Type"
              >
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="int">Integer</MenuItem>
                <MenuItem value="float">Float</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
                <MenuItem value="datetime">DateTime</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.isRequired}
                  onChange={(e) => updateField(index, { ...field, isRequired: e.target.checked })}
                />
              }
              label="Required"
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.isUnique}
                  onChange={(e) => updateField(index, { ...field, isUnique: e.target.checked })}
                />
              }
              label="Unique"
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.isAutoIncrement}
                  onChange={(e) => updateField(index, { ...field, isAutoIncrement: e.target.checked })}
                />
              }
              label="Auto Increment"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="Min"
              type="number"
              value={field.min}
              onChange={(e) => updateField(index, { ...field, min: e.target.value })}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="Max"
              type="number"
              value={field.max}
              onChange={(e) => updateField(index, { ...field, max: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Relation</InputLabel>
              <Select
                value={field.relation}
                onChange={(e) => updateField(index, { ...field, relation: e.target.value })}
                label="Relation"
              >
                <MenuItem value="">None</MenuItem>
                {allModels.filter(m => m.name !== model.name).map(m => (
                  <MenuItem key={m.name} value={m.name}>{m.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" color="secondary" onClick={() => deleteField(index)}>Delete</Button>
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={addField}>Add Field</Button>
      <FormControlLabel
        control={
          <Checkbox
            checked={model.hasTimestamps}
            onChange={(e) => updateModel({ ...model, hasTimestamps: e.target.checked })}
          />
        }
        label="Add createdAt and updatedAt fields"
      />
    </Box>
  );
};

export default ModelForm;