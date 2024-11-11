import React from "react";
import Home from "./components/Landingpage/Home";
import Enroll from "./components/EnrollPatient/Enroll";
import Appointment from "./components/ViewAppointments/Appointment";
import EnrolledPatients from "./components/ViewEnrolledPatients/EnrolledPatients";
import NavBar from "./components/NavigationBar/NavBar";
import Footer from "./components/Footer/Footer";
import  "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/enroll"
            element={<EnrolledPatients></EnrolledPatients>}
          ></Route>
          <Route path="/" element={<Home></Home>}></Route>
          
        </Routes>
      </BrowserRouter>
      <Footer className="footer"></Footer>
    </div>
  );
};

<<<<<<< HEAD

const query = {
    me: {
        resource: 'me',
    },
}

const MyApp = () => {
    const { error, loading, data } = useDataQuery(query)

    if (error) {
        return <span>{i18n.t('ERROR')}</span>
    }

    if (loading) {
        return <span>{i18n.t('Loading...')}</span>
    }

    return (
        
        <div className={classes.container}>
            <h1>{i18n.t('Hello {{name}}', { name: data.me.name })}</h1>
            <h3>{i18n.t('Welcome to DHIS2!')}</h3>
            
        </div>
         
    )
   
}

export default MyApp
=======
export default App;
>>>>>>> 07898451cb2340c7e4e487f5011359ee6de32e98
