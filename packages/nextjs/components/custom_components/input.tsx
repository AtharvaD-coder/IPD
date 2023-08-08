import React, { ChangeEvent, useCallback } from "react";

interface InputProps {
  value: string|number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label:String;
}

export default function Input({ value, onChange, type,label }: InputProps) {
    
    
  const handleChange = useCallback(
    (newValue:any) => {
        // console.log(newValue)
   
      onChange(newValue.target.value);
    },
    [onChange],
  );



  return (
    <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">{label}</span>
   
    </label>
    <input  value={value} onChange={handleChange} type={type} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    </div>
  );
}
