import React, { useState, useEffect } from "react";
import {
  Center,
  Input,
  Box,
  Flex,
  Text,
  Checkbox,
  SlideFade,
} from "@chakra-ui/react";
import {
  EditIcon,
  ChevronRightIcon,
  DeleteIcon,
  CheckCircleIcon,
  CloseIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

const Tasks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [check, setCheck] = useState(props.isDone);
  const [text, setText] = useState(props.title);

  const cancelClick = () => {
    setCheck(props.isDone);
    setText(props.title);
    setEditMode(false);
  };
  const deleteClick = async () => {
    const url = "/api/v1/tasks/" + props._id;
    const options = {
      method: "DELETE",
      mode: "cors",
    };
    const result = await fetch(url, options)
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    if (result.success) {
      props.setDummy((prevState) => !prevState);
    } else {
      //falure pop up
    }
  };

  const putEdit = async (details) => {
    const url = "/api/v1/tasks/" + props._id;
    const options = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const result = await fetch(url, options)
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
    if (result.success) {
      setEditMode(false);
      props.setDummy((prevState) => !prevState);
    } else {
      // falure pop up
    }
  };

  return (
    <>
      {editMode || (
        <NormalMode
          {...props}
          setEditMode={setEditMode}
          editMode={editMode}
          deleteClick={deleteClick}
        />
      )}
      {editMode && (
        <EditPhase
          text={text}
          setText={setText}
          editMode={editMode}
          setEditMode={setEditMode}
          putEdit={putEdit}
          setCheck={setCheck}
          check={check}
          cancelClick={cancelClick}
        />
      )}
    </>
  );
};

const NormalMode = (props) => {
  return (
    <>
      <Center>
        <Flex w={"90%"} bg={"white"} p={"10px"}>
          <Center flex={0.2}>
            <SlideFade in={!props.editMode} offsetY="-10px">
              {props.isDone ? <CheckCircleIcon /> : <ChevronRightIcon />}
            </SlideFade>
          </Center>
          <Box flex={1}>
            <Text as={props.isDone && "s"}>{props.title}</Text>
          </Box>
          <Center flex={0.16}>
            <SlideFade in={!props.editMode} offsetY="-10px">
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => props.setEditMode(true)}
              />
            </SlideFade>
          </Center>
          <Center flex={0.16}>
            <SlideFade in={!props.editMode} offsetY="-10px">
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={props.deleteClick}
              />
            </SlideFade>
          </Center>
        </Flex>
      </Center>
    </>
  );
};

const EditPhase = (props) => {
  const detail = {
    title: props.text,
    isDone: props.check,
  };
  return (
    <>
      <Center>
        <Flex w={"90%"} bg={"white"} p={"10px"}>
          <Center flex={0.2}>
            <SlideFade in={props.editMode} offsetY="10px">
              <Checkbox
                isChecked={props.check}
                m={"5px 0 0 0"}
                onChange={() => {
                  props.setCheck((pv) => !pv);
                }}
              />
            </SlideFade>
          </Center>
          <Box flex={1}>
            <Input
              variant="unstyled"
              placeholder="Your Task"
              value={props.text}
              onChange={(event) => props.setText(event.target.value)}
            />
          </Box>
          <Center flex={0.16}>
            <SlideFade in={props.editMode} offsetY="10px">
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => props.cancelClick()}
              />
            </SlideFade>
          </Center>
          <Center flex={0.16}>
            <SlideFade in={props.editMode} offsetY="10px">
              <ArrowRightIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.putEdit(detail);
                }}
              />
            </SlideFade>
          </Center>
        </Flex>
      </Center>
    </>
  );
};
export default Tasks;
