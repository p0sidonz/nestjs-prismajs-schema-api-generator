import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Tabs, Tab, Box } from '@mui/material';
import SchemaDesigner from './components/SchemaDesigner';
import PermissionManager from './components/PermissionManager';
import CodeGenerator from './components/CodeGenerator';
import PrismaSchemaGenerator from './components/PrismaSchemaGenerator';


const theme = createTheme();

const App = () => {
  const [models, setModels] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
<ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', typography: 'body1', mt: 4 }}>
          <h1>NestJS Schema and API Generator</h1>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Schema Designer" />
              <Tab label="Permissions" />
              <Tab label="Generated Code" />
              <Tab label="Prisma Schema" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <SchemaDesigner 
              models={models} 
              setModels={setModels}
              permissions={permissions}
              setPermissions={setPermissions}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PermissionManager 
              models={models} 
              permissions={permissions} 
              setPermissions={setPermissions} 
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CodeGenerator models={models} permissions={permissions} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <PrismaSchemaGenerator models={models} />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default App;