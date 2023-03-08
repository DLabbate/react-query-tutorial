import {
  Flex,
  Checkbox,
  Text,
  Container,
  StackDivider,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useTodosQuery } from "../hooks/useTodosQuery";
import { CloseIcon } from "@chakra-ui/icons";
import { useUpdateTodoOptimistic } from "../hooks/useUpdateTodoOptimistic";
import { useDeleteTodoOptimistic } from "../hooks/useDeleteTodoOptimistic";

const TodoList = () => {
  const { status, data } = useTodosQuery();
  const updateTodoMutationOptimistic = useUpdateTodoOptimistic();
  const deleteTodoMutationOptimistic = useDeleteTodoOptimistic();

  if (status === "loading") return <span>Loading...</span>;

  if (status === "error") return <span>Error!</span>;

  return (
    <Container maxWidth="2xl" justifyContent="center">
      <VStack
        divider={<StackDivider />}
        minHeight="md"
        backgroundColor="white"
        spacing="0"
        padding="8"
        shadow="lg"
        borderRadius="xl"
        direction="column"
        align="stretch"
      >
        <Text fontSize="4xl" textAlign="center" marginBottom="4">
          Todo List
        </Text>
        {
          // Render the list of todo items
          data.map((item) => (
            <Flex
              key={item.id}
              alignItems="center"
              justifyContent="start"
              height="16"
              padding="4"
              _hover={{
                background: "brand.50",
                ".icon": { visibility: "visible" },
              }}
            >
              <Checkbox
                size="lg"
                isChecked={item.completed}
                colorScheme="brand"
                onChange={() => {
                  updateTodoMutationOptimistic.mutate({
                    ...item,
                    completed: !item.completed,
                  });
                }}
              />
              <Text marginLeft="4" fontSize="md">
                {item.description}
              </Text>
              <Button
                className="icon"
                visibility="hidden"
                marginLeft="auto"
                borderRadius="lg"
                size="xs"
                _hover={{ backgroundColor: "brand.100" }}
                colorScheme="brand"
                variant="ghost"
                onClick={() => {
                  deleteTodoMutationOptimistic.mutate({ id: item.id });
                }}
              >
                <CloseIcon boxSize={2} />
              </Button>
            </Flex>
          ))
        }
      </VStack>
    </Container>
  );
};

export default TodoList;
