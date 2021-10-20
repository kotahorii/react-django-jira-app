import { VFC, useState } from "react";
import {
  Button,
  Input,
  Flex,
  Stack,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import {
  fetchAsyncCreateProf,
  fetchAsyncLogin,
  fetchAsyncRegister,
} from "../../features/auth/authSlice";

type FormInput = {
  username: string;
  password: string;
};

export const Auth: VFC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (isLoginView) {
      dispatch(fetchAsyncLogin(data));
    } else {
      const res = await dispatch(fetchAsyncRegister(data));
      if (fetchAsyncRegister.fulfilled.match(res)) {
        await dispatch(fetchAsyncLogin(data));
        await dispatch(fetchAsyncCreateProf());
      }
    }
  };

  return (
    <>
      <Flex justify="center" align="center" minH="100vh" bg="gray.50">
        <Box boxShadow="lg" bg="white" borderRadius="md" p="8">
          <Stack align="center">
            <Heading textAlign="center">
              {isLoginView ? "Login" : "Register"}
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack w="xs">
                <Input
                  type="text"
                  {...register("username", { required: true })}
                />
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                <Button
                  isLoading={isSubmitting}
                  bg="blue.400"
                  _hover={{ bg: "blue.500" }}
                  color="white"
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>

            <Text
              as="span"
              fontWeight="bold"
              cursor="pointer"
              color="blue.600"
              onClick={() => setIsLoginView(!isLoginView)}
            >
              {isLoginView ? "Login mode" : "Register mode"}
            </Text>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
