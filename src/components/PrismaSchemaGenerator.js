// components/PrismaSchemaGenerator.js
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const PrismaSchemaGenerator = ({ models }) => {
  const generatePrismaSchema = () => {
    let schema = "datasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n";
    schema += "generator client {\n  provider = \"prisma-client-js\"\n}\n\n";

    models.forEach(model => {
      schema += `model ${model.name} {\n`;
      model.fields.forEach(field => {
        let fieldDef = `  ${field.name} ${field.type}`;
        if (!field.isRequired) fieldDef += "?";
        if (field.isUnique) fieldDef += " @unique";
        if (field.relation) {
          fieldDef += ` @relation(fields: [${field.name}Id], references: [id])`;
          schema += `  ${field.name}Id Int\n`;
        }
        if (field.min) fieldDef += ` @min(${field.min})`;
        if (field.max) fieldDef += ` @max(${field.max})`;
        schema += fieldDef + "\n";
      });
      schema += "}\n\n";
    });

    return schema;
  };

  const prismaSchema = generatePrismaSchema();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          Prisma Schema
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, overflowX: 'auto' }}>
          <pre>
            <code>{prismaSchema}</code>
          </pre>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => navigator.clipboard.writeText(prismaSchema)}
          sx={{ mt: 2 }}
        >
          Copy Prisma Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrismaSchemaGenerator;