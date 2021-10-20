import { VFC, useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { useQueryTasks } from "../../../hooks/task/useQueryTasks";
import { Data } from "../../../types/types";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export const TaskList: VFC = () => {
  const { data: tasks } = useQueryTasks();

  const columns: any = useMemo(
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
      {
        Cell: (props: any) => (
          <Icon
            as={FaEdit}
            cursor="pointer"
            color="gray.500"
            _hover={{ color: "gray.600" }}
          />
        ),
        Header: "",
        id: "edit",
      },
      {
        Cell: () => (
          <Icon
            as={AiFillDelete}
            cursor="pointer"
            color="gray.500"
            _hover={{ color: "gray.600" }}
          />
        ),
        Header: "",
        id: "delete",
      },
    ],
    []
  );

  const newTasks: any = tasks
    ? tasks?.map((task) => ({
        task: task.task,
        status: task.status,
        estimate: task.estimate,
        responsible_username: task.responsible_username,
        owner_username: task.owner_username,
        id: task.id,
      }))
    : [
        {
          task: "",
          status: "",
          estimate: 0,
          responsible_username: "",
          owner_username: "",
          id: 0,
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
