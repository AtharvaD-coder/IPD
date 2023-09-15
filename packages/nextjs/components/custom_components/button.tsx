
interface ButtonInterface {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
}
export default function Button({label, onClick}:ButtonInterface){

    return (
        <button onClick={onClick} className="btn btn-outline">{label}</button>
    )
}