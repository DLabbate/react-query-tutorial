import {
  InputGroup,
  InputRightElement,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateTodo } from "../hooks/useCreateTodo";

const InputForm = () => {
  const [input, setInput] = useState("");
  const createTodo = useCreateTodo();
  const toast = useToast();

  return (
    <InputGroup size="lg" w="2xl">
      <Input
        focusBorderColor="brand.300"
        type="text"
        placeholder="Enter new todo"
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          colorScheme="brand"
          isLoading={createTodo.isLoading}
          onClick={() => {
            if (input === "") return;

            createTodo.mutate(input, {
              // We can also pass additional callbacks to the mutation!
              // @link https://tanstack.com/query/latest/docs/react/guides/mutations#mutation-side-effects
              onSuccess: () => {
                toast({
                  title: "New Todo Item Added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom-right",
                });
              },
            });
          }}
        >
          Add
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default InputForm;
