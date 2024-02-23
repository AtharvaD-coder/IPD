import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useAccount } from "wagmi";

const BidModal = ({ isOpen, onClose, onSubmit }: any) => {
  const [amount, setAmount] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const { address } = useAccount();

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleTokensChange = event => {
    setNumberOfTokens(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(numberOfTokens, amount);
  };

  return (
    <Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="bg-secondary">
        <ModalHeader className="text-white">Create Bid Proposal</ModalHeader>
        <ModalCloseButton color={'white'} />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel className="text-white">Amount to Bid</FormLabel>
            <Input color={'white'} type="number" value={amount} onChange={handleAmountChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel className="text-white">Number of Tokens</FormLabel>
            <Input color={'white'} type="number" value={numberOfTokens} onChange={handleTokensChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button backgroundColor={'red'} color={'red'} onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BidModal;
