import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider,extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

const theme = extendTheme({
  fonts: {
    heading: `'Ysabeau Office', sans-serif`,
    body: `'Ysabeau Office', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#111723', // Default background color
        color: 'white', // Default text color
      },
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
