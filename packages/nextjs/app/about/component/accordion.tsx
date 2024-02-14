import React, { useState } from "react";

const Accordion = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  console.log("isOpen", isOpen);

  return (
    <div tabIndex={index} className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        {answer.map(item => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
