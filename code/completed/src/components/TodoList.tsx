import {
  Flex,
  Checkbox,
  Text,
  Container,
  StackDivider,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useTodosQuery } from "../hooks/useTodosQuery";
import { useDeleteTodoOptimistic } from "../hooks/useDeleteTodoOptimistic";
import { useUpdateTodoOptimistic } from "../hooks/useUpdateTodoOptimistic";

const TodoList = () => {
  const toast = useToast();
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
          // ✅ Render the list of todo items
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
                  // Toggle the `completed` boolean
                  const mutationParms = {
                    ...item,
                    completed: !item.completed,
                  };

                  updateTodoMutationOptimistic.mutate(mutationParms, {
                    // We can also pass additional callbacks to the mutation!
                    // @link https://tanstack.com/query/latest/docs/react/guides/mutations#mutation-side-effects
                    onError: () =>
                      toast({
                        title: "Failed to Update Todo Item",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                      }),
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
                  const mutationParams = { id: item.id };

                  deleteTodoMutationOptimistic.mutate(mutationParams, {
                    // We can also pass additional callbacks to the mutation!
                    // @link https://tanstack.com/query/latest/docs/react/guides/mutations#mutation-side-effects
                    onError: () =>
                      toast({
                        title: "Failed to Delete Todo Item",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                      }),
                  });
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
