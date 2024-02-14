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
import axios from "axios";




const NameModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const { address } = useAccount();
    

    const handleSubmit= async ()=>{
        const data=await axios.post('http://localhost:3000/api/updateName',{address:address,name:name})
        console.log(data.data,"dataaaa")
    }

    const handleNameChange = event => {
        setName(event.target.value);
    };

  


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Chnage Name</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mt={4}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" value={name} onChange={handleNameChange} />
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

export default NameModal;
