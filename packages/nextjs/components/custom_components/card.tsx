import { ReactNode } from "react";


export default function Card({children}:{children:ReactNode}) {
    return (
        <div className="card w-80 bg-primary text-primary-content">
            {children}
        </div>
    )
}