// components/CodeGenerator.js
import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { generateControllerCode, generateServiceCode, generateModuleCode, generateDtoCode, generateGuardCode } from '../utils/codeGenerators';

const CodeGenerator = ({ models, permissions }) => {
  const generateCode = () => {
    const generatedCode = {};
    models.forEach((model) => {
      const modelPermissions = permissions[model.name] || {
        create: 'public',
        read: 'public',
        update: 'public',
        delete: 'public'
      };
      generatedCode[`${model.name}Controller.ts`] = generateControllerCode(model, modelPermissions);
      generatedCode[`${model.name}Service.ts`] = generateServiceCode(model);
      generatedCode[`${model.name}Module.ts`] = generateModuleCode(model);
      generatedCode[`${model.name}Dto.ts`] = generateDtoCode(model);
      generatedCode[`${model.name}Guard.ts`] = generateGuardCode(model, modelPermissions);
    });
    return generatedCode;
  };

  const code = generateCode();

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      {Object.entries(code).map(([fileName, fileContent]) => (
        <Card key={fileName} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {fileName}
            </Typography>
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, overflowX: 'auto' }}>
              <pre>
                <code>{fileContent}</code>
              </pre>
            </Box>
            <Button 
              variant="contained" 
              onClick={() => navigator.clipboard.writeText(fileContent)}
              sx={{ mt: 2 }}
            >
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CodeGenerator;