export function CardBox({ className ,children}:any){
    return (
        <div className={`p-5 m-2 border-4 rounded-xl bg-[#F5F7F8] ${className}` } >
            {children}
        </div>
    )
}