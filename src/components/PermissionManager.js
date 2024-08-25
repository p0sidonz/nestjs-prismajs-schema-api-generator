// components/PermissionManager.js
import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const PermissionManager = ({ models, permissions, setPermissions }) => {
  useEffect(() => {
    const newPermissions = { ...permissions };
    models.forEach(model => {
      if (!newPermissions[model.name]) {
        newPermissions[model.name] = {
          create: 'public',
          read: 'public',
          update: 'public',
          delete: 'public'
        };
      }
    });
    setPermissions(newPermissions);
  }, [models]);

  const updatePermission = (modelName, action, role) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [modelName]: {
        ...prevPermissions[modelName],
        [action]: role,
      },
    }));
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      {models.map((model) => (
        <Card key={model.name} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {model.name} Permissions
            </Typography>
            {['create', 'read', 'update', 'delete'].map((action) => (
              <Box key={action} sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                <Typography variant="body1" sx={{ minWidth: 100 }}>{action}:</Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>{action}</InputLabel>
                  <Select
                    value={permissions[model.name]?.[action] || 'public'}
                    onChange={(e) => updatePermission(model.name, action, e.target.value)}
                    label={action}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="authenticated">Authenticated</MenuItem>
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PermissionManager;