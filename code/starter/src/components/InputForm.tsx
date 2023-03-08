import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import { useState } from "react";

const InputForm = () => {
  const [input, setInput] = useState("");

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
          isLoading={false}
          onClick={() => {
            // 👉 TODO: Add logic for creating a new todo item
          }}
        >
          Add
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default InputForm;
