import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../app/hooks";
import { resetEditedTask } from "../../features/task/taskSlice";
import { Category, PostTask, ReadTask } from "../../types/types";

export const useMutateTasks = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const createCategoryMutation = useMutation(
    (item: string) =>
      axios.post<Category>(
        `${process.env.REACT_APP_API_URL}/api/category/`,
        { item: item },
        {
          headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      ),
    {
      onSuccess: (res) => {
        const previousCategories =
          queryClient.getQueryData<Category[]>("categories");
        if (previousCategories) {
          queryClient.setQueryData<Category[]>("categories", [
            ...previousCategories,
            res.data,
          ]);
        }
      },
    }
  );
  const createTasksMutation = useMutation(
    (task: PostTask) =>
      axios.post<ReadTask>(
        `${process.env.REACT_APP_API_URL}/api/tasks/`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      ),
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>("tasks");
        if (previousTasks) {
          queryClient.setQueryData<ReadTask[]>("tasks", [
            ...previousTasks,
            res.data,
          ]);
          dispatch(resetEditedTask());
        }
      },
    }
  );
  const updateTaskMutation = useMutation(
    (task: PostTask) =>
      axios.put<ReadTask>(
        `${process.env.REACT_APP_API_URL}/api/tasks/${task.id}/`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>("tasks");
        if (previousTasks) {
          queryClient.setQueryData<ReadTask[]>(
            "tasks",
            previousTasks.map((task) =>
              task.id === variables.id ? res.data : task
            )
          );
        }
      },
    }
  );
  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>("tasks");
        if (previousTasks) {
          queryClient.setQueryData<ReadTask[]>(
            "tasks",
            previousTasks.filter((task) => task.id !== variables)
          );
        }
      },
    }
  );
  return {
    createCategoryMutation,
    createTasksMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
