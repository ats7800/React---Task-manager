import React, { useState, useEffect } from "react";
import Main from "./compos/main";
import Tasks from "./compos/tasks";
import { ChakraProvider, Box, Center, Stack } from "@chakra-ui/react";

function App({ Component }) {
  const [dummy, setDummy] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = "api/v1/tasks";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.tasks));
  }, [dummy]);

  return (
    <ChakraProvider>
      <div style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
        <Main setDummy={setDummy} />
        <Stack p={"10px"} direction={"column"}>
          {data.map((task) => {
            return <Tasks {...task} setDummy={setDummy} key={task._id} />;
          })}
        </Stack>
      </div>
    </ChakraProvider>
  );
}

export default App;
