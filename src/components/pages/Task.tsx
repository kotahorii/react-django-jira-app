import { VFC } from "react";
import { Container, Flex, Stack } from "@chakra-ui/layout";
import { TaskList } from "../organisms/task/TaskList";
import { TaskHeader } from "../organisms/task/TaskHeader";
import { TaskForm } from "../organisms/task/TaskForm";

export const Task: VFC = () => {
  return (
    <>
      <Container maxW={"7xl"} p="5">
        <Stack direction="row" align="center" justify="space-between">
          <TaskHeader />
        </Stack>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <TaskList />
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <TaskForm />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};
