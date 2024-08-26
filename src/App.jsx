import {  createTheme } from "@mui/material/styles"
import { useMemo, Suspense,lazy,useState,useEffect} from "react"
import {ThemeProvider , CssBaseline, Box } from "@mui/material"
import { themeSettings } from "./themes"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./scenes/navbar"
import Dashboard from "./scenes/dashboard"
import Predicition from "./scenes/predictions"
import "./index.css"
import { Loader } from "./components/Loader"
import Footer from "./scenes/footer"



function App() {
const theme = useMemo(()=>createTheme(themeSettings),[])  ;
const [loading,setLoading] = useState(true);
useEffect(()=>{
  const timer = setTimeout(()=>{
    setLoading(false);
  },5000)
},[])
if(loading){
  return <Loader/>
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}


  return (
    <>
    
    <BrowserRouter>
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
      <Suspense fallback={<Loader/>}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/predictions" element={<Predicition/>}/>
        <Route path="*" element={<div>No page here</div>}/>

      </Routes>
     
      </Suspense>
    </Box>
    
  </ThemeProvider>
  </BrowserRouter>
 <Footer/>
    </>
  )
}

export default App
