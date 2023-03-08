import { Flex } from "@chakra-ui/react";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="start"
      direction="column"
      paddingTop="16"
      backgroundColor="brand.50"
      overflowY="scroll"
      paddingBottom="8"
      gap="16"
    >
      <InputForm />
      <TodoList />
    </Flex>
  );
}

export default App;
