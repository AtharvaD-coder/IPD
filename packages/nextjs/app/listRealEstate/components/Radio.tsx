import Label from "~~/components/custom_components/labels";

export default function Radio({ label, value, onChange, options }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex">
        {options.map((data: string) => {
          return (
            <div className="form-control flex justify-between w-[150px] m-3 my-4">
              <label className="label cursor-pointer">
                <span className="label-text">{data}</span>
                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
