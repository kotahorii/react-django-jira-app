import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex, Heading } from "@chakra-ui/layout";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router";
import { fetchAsyncUpdateProf } from "../../../features/auth/authSlice";
import { VFC, ChangeEvent } from "react";
import { useQueryProfs } from "../../../hooks/auth/useQueryProfs";
import { useQueryMyProf } from "../../../hooks/auth/useQueryMyProf";
import { useAppDispatch } from "../../../app/hooks";

export const TaskHeader: VFC = () => {
  const { refetch } = useQueryProfs();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: loginUser } = useQueryMyProf();
  const { data: profiles } = useQueryProfs();
  const loginProfile = profiles?.filter((prof) => prof.id === loginUser?.id)[0];

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

  const logout = () => {
    localStorage.removeItem("localJWT");
    navigate("/");
  };
  return (
    <>
      <Heading W="300px" textAlign="center" w="60%">
        Scrum Task Board
      </Heading>
      <Flex direction="row" w="40%" justify="flex-end">
        <Button
          variant="unstyled"
          _focus={{ boxShadow: "none" }}
          onClick={logout}
        >
          <Icon
            aria-label="logout"
            color="gray.500"
            _hover={{ color: "gray.600" }}
            fontSize="25px"
            as={ImExit}
          />
        </Button>
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
            boxShadow="sm"
            _hover={{ boxShadow: "lg" }}
            src={loginProfile?.img !== null ? loginProfile?.img : undefined}
          />
        </Button>
      </Flex>
    </>
  );
};
