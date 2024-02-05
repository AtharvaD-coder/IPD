import { useState } from 'react';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAccount } from 'wagmi';

const BidModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [numberOfTokens, setNumberOfTokens] = useState('');
  const { address } = useAccount();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTokensChange = (event) => {
    setNumberOfTokens(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(amount, numberOfTokens);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Rent Proposal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel>Amount to Bid</FormLabel>
            <Input type="number" value={amount} onChange={handleAmountChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Number of Tokens</FormLabel>
            <Input type="number" value={numberOfTokens} onChange={handleTokensChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BidModal;
