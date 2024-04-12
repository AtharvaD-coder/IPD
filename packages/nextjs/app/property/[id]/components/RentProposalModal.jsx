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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccount } from "wagmi";

const RentProposalModal = ({ isOpen, onClose, onSubmit }) => {
  const [rentee, setRentee] = useState("");
  const [noOfMonths, setNoOfMonths] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const { address } = useAccount();
  const handleRenteeChange = event => {
    setRentee(event.target.value);
  };

  const handleMonthsChange = event => {
    setNoOfMonths(event.target.value);
  };

  const handleDeadlineChange = date => {
    const newDate = new Date(date);
   
    setDeadline(newDate);
  };

  const handleSubmit = () => {
    onSubmit(address, noOfMonths, deadline.getTime());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="bg-secondary">
        <ModalHeader className="text-white" >Create Rent Proposal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel className="text-white">Number of Months</FormLabel>
            <Input className="text-white p-3 b " type="number" value={noOfMonths} onChange={handleMonthsChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel className="text-white">Deadline</FormLabel>
            <DatePicker className="text-white bg-secondary p-3 border-1 rounded-xl" selected={deadline} onChange={handleDeadlineChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button className="text-red-500" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RentProposalModal;
