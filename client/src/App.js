import {BrowserRouter, Routes, Route} from "react-router-dom";
import Tasks from "./components/Tasks";
import Update from "./components/Update";
import Add from "./components/Add";

function App() {
  return (
    <div className="h-full sm:p-10 lg:p-20 bg-teal-500">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element= {<Tasks/>}/>
        <Route path = "/add" element= {<Add/>}/>
        <Route path = "/update/:id" element= {<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
