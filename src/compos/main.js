import React, { useState, useEffect } from "react";
import { Center, Heading, Input, Stack, Button } from "@chakra-ui/react";

const Main = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [taskText, setText] = useState("");
  useEffect(() => {}, []);

  const clickHandler = async () => {
    const url = "api/v1/tasks";
    const data = {
      title: taskText,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    setLoading(true);
    const result = await fetch(url, options)
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    setLoading(false);
    if (result.success) {
      setText("");
    } else {
      // popup failure
    }
    props.setDummy((prev) => !prev);
  };
  return (
    <>
      <Stack bg={"#fff"} direction="column" spacing={4} p={4} w={"100%"}>
        <Center w="100%">
          <Heading>Task Manager</Heading>
        </Center>
        <Stack direction="row">
          <Input
            placeholder="e.g. Do The Thing"
            display={"block"}
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={taskText}
          />
          <Button
            colorScheme="teal"
            variant="solid"
            isLoading={isLoading}
            onClick={clickHandler}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Main;
