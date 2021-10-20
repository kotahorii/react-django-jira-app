import { VFC, useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";
import { useQueryMyProf } from "../../../hooks/auth/useQueryMyProf";
import { useQueryProfs } from "../../../hooks/auth/useQueryProfs";
import { useQueryTasks } from "../../../hooks/task/useQueryTasks";
import { useAppDispatch } from "../../../app/hooks";
import { ReadTask } from "../../../types/types";
import { useQueryClient } from "react-query";
export const TaskList: VFC = () => {
  const queryClient = useQueryClient();
  const { data: tasks, refetch } = useQueryTasks();
  const { data: loginUser } = useQueryMyProf();
  const { data: profiles } = useQueryProfs();

  type Data = {
    task: string;
    status: string;
    estimate: number;
    responsible_username: string;
    owner_username: string;
  };

  const columns: Column<Data>[] = useMemo(
    () => [
      {
        Header: "Task",
        accessor: "task",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Estimate",
        accessor: "estimate",
      },
      {
        Header: "Responsible",
        accessor: "responsible_username",
      },
      {
        Header: "Owner",
        accessor: "owner_username",
      },
    ],
    []
  );

  const newTasks: Data[] = tasks
    ? tasks?.map((task) => ({
        task: task.task,
        status: task.status,
        estimate: task.estimate,
        responsible_username: task.responsible_username,
        owner_username: task.owner_username,
      }))
    : [
        {
          task: "",
          status: "",
          estimate: 0,
          responsible_username: "",
          owner_username: "",
        },
      ];
  console.log("task");

  const data: Data[] = useMemo(() => newTasks, [tasks]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
