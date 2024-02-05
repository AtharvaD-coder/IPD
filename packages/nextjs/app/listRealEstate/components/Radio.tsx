import Label from '~~/components/custom_components/labels';

export default function Radio({ label, value, onChange, options }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex">
        {options.map((data: string) => (
          <div key={data} className="form-control flex justify-between w-[150px] m-3 my-4">
            <label className="label cursor-pointer">
              <span className="label-text">{data}</span>
              <input
               type="radio" name="radio-2" className="radio radio-primary"
                // checked={data === value}
                onChange={() => onChange(data)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
