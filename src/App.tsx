import { VFC } from "react";
import { Route, Routes } from "react-router";
import { Auth } from "./components/pages/Auth";
import { Task } from "./components/pages/Task";

const App: VFC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="tasks/" element={<Task />} />
      </Routes>
    </>
  );
};

export default App;
