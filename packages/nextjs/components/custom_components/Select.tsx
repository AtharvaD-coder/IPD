import { ChangeEvent, useCallback } from "react";

export default function Select({options,onChange}:{options:Array<{value:number,text:string}>,onChange: (event: ChangeEvent<HTMLInputElement>) => void}){
    const handleChange = useCallback(
        (newValue:any) => {
            // console.log(newValue)
       
          onChange(newValue.target.value);
        },
        [onChange],
      );
    
    return (
        <select onChange={handleChange}  className="select w-full max-w-xs">
            {
                options?.map(({value,text})=>{
                    return <option value={value}>{text}</option>
                })
            }
</select>
    )
}