import { useState } from "react";
import { useAccount } from "wagmi";

const BidModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const { address } = useAccount();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTokensChange = (event) => {
    setNumberOfTokens(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(numberOfTokens, amount);
  };

  return (
    <div className={`fixed z-3 inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-secondary rounded-lg p-8 z-10 w-[500px]">
          <div className="text-white font-bold text-2xl">Create Bid Proposal</div>
          <button className="absolute top-0 right-0 mt-2 mr-2 text-white" onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 111.414-1.414L10 12.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="mt-4">
            <label className="text-white">Amount to Bid</label>
            <input
              className="bg-gray-800 text-white mt-1 block w-full rounded-md p-2 m-2"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount in eh"
            />
          </div>

          <div className="mt-4">
            <label className="text-white">Number of Tokens</label>
            <input
              className="bg-gray-800 text-white mt-1 block w-full rounded-md p-2 m-2"
              type="number"
              value={numberOfTokens}
              onChange={handleTokensChange}
              placeholder="Enter number of tokens to bid for"
            />
          </div>

          <div className="mt-4">
            <button
              className="btn btn-primary mr-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button className="btn btn-error" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
