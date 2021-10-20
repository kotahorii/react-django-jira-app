import { Button, IconButton } from "@chakra-ui/button";
import { VFC, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectEditedTask } from "../../features/task/taskSlice";
import { useQueryMyProf } from "../../hooks/auth/useQueryMyProf";
import { useQueryProfs } from "../../hooks/auth/useQueryProfs";
import { ImExit } from "react-icons/im";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { fetchAsyncUpdateProf } from "../../features/auth/authSlice";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { Profile } from "../../types/types";

export const Task: VFC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectEditedTask);
  const { data: loginUser } = useQueryMyProf();
  const { data: profiles, refetch } = useQueryProfs();
  const loginProfile = profiles?.filter((prof) => prof.id === loginUser?.id)[0];

  const logout = () => {
    localStorage.removeItem("localJWT");
    navigate("/");
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  const changeProfImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const res = await dispatch(
      fetchAsyncUpdateProf({
        id: loginProfile!.id,
        img: e.target.files !== null ? e.target.files[0] : null,
      })
    );
    if (fetchAsyncUpdateProf.fulfilled.match(res)) {
      refetch();
    }
  };

  return (
    <>
      <Container maxW={"7xl"} p="5">
        <Stack direction="row" align="center" justify="center">
          <Heading minW="300px" textAlign="center">
            Scrum Task Board
          </Heading>
          <Stack justify="flex-end">
            <IconButton
              onClick={logout}
              aria-label="logout"
              variant="unstyled"
              color="gray.500"
              _hover={{ color: "gray.600" }}
              _focus={{ boxShadow: "none" }}
              fontSize="22px"
              icon={<ImExit />}
            />
            <input
              type="file"
              id="imageInput"
              hidden={true}
              onChange={changeProfImage}
            />
            <Button
              variant="unstyled"
              _focus={{ boxShadow: "none" }}
              onClick={handleEditPicture}
            >
              <Avatar
                src={loginProfile?.img !== null ? loginProfile?.img : undefined}
              />
            </Button>
          </Stack>
        </Stack>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Write once,
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                use everywhere!
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              Snippy is a rich coding snippets app that lets you create your own
              code snippets, categorize them, and even sync them in the cloud so
              you can use them anywhere. All that is free!
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
              >
                Get started
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            ></Box>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};
