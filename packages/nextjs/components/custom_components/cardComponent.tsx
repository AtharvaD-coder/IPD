export function CardBox({ className ,children}:any){
    return (
        <div className={`p-5 m-2 border-4  bg-[#F5F7F8] rounded-xl ${className}  `  } >
            {children}
        </div>
    )
}