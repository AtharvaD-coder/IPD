import React, { useState } from "react";

interface AccordionProps {
  items: { title: string; content: string[] }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div id="accordion" data-accordion>
      {items.map((item, index) => (
        <div key={index}>
          <h2
            onClick={() => handleClick(index)}
            className={`accordion-header ${activeIndex === index ? "active" : ""}`}
          >
            {item.title}
          </h2>
          <div
            className={`accordion-body ${activeIndex === index ? "visible" : "hidden"}`}
            aria-hidden={activeIndex !== index}
          >
            <ul>
              {item.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
