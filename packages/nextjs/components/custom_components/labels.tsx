export default function Label({ children, labelStyle = "font-bold text-lg" }: any) {
  return (
    <label className="label my-2">
      <span className={`label-text ${labelStyle}`}>{children}</span>
    </label>
  );
}
