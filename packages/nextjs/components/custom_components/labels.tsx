export default function Label({children}:any) {
    return (
        <label className="label my-2">
        <span className="label-text font-bold text-lg">{children}</span>
      </label>
    )
}
