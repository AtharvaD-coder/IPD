import { useState } from 'react';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAccount } from 'wagmi';

const RentProposalModal = ({ isOpen, onClose, onSubmit }) => {
  const [rentee, setRentee] = useState('');
  const [noOfMonths, setNoOfMonths] = useState('');
  const [deadline, setDeadline] = useState(new Date());
    const {address}=useAccount();
  const handleRenteeChange = (event) => {
    setRentee(event.target.value);
  };

  const handleMonthsChange = (event) => {
    setNoOfMonths(event.target.value);
  };

  const handleDeadlineChange = (date) => {
    const newDate = new Date();
    newDate.setMinutes(newDate.getMinutes() + 1);
    setDeadline(newDate);
  };
  

  const handleSubmit = () => {
    onSubmit(address, noOfMonths, deadline.getTime());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Rent Proposal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         
          <FormControl mt={4}>
            <FormLabel>Number of Months</FormLabel>
            <Input type="number" value={noOfMonths} onChange={handleMonthsChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Deadline</FormLabel>
            <DatePicker selected={deadline} onChange={handleDeadlineChange} />
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

export default RentProposalModal;
