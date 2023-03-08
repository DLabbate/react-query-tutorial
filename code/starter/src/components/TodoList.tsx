import {
  Flex,
  Checkbox,
  Text,
  Container,
  StackDivider,
  VStack,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { TodoListModel } from "../api/models";

const hardcodedTodoList: TodoListModel = [
  { id: "1", completed: false, description: "Study" },
  { id: "2", completed: false, description: "Exercise" },
  { id: "3", completed: true, description: "Subscribe to Dom the Engineer!" },
  { id: "4", completed: true, description: "Like the video!" },
];

const TodoList = () => {
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
          hardcodedTodoList.map((item) => (
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
                  // 👉 TODO: Add logic for completing a todo item
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
                  // 👉 TODO: Add logic for deleting a todo item
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
