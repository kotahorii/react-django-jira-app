import { Button } from "@chakra-ui/button";
import { VFC } from "react";
import { useNavigate } from "react-router";

export const Task: VFC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          localStorage.removeItem("localJWT");
          navigate("/");
        }}
      >
        Logout
      </Button>
    </>
  );
};
