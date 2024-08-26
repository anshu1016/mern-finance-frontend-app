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
    </>
  )
}

export default App
