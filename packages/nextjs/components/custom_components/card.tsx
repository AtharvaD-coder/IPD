

export default function Card({data}:{data:any}) {
    return (
        <div className="card w-80 bg-primary text-primary-content">
            <div className="card-body">
                <h2 className="card-title">Token Id -{data.tokenId}</h2>
                <p>Price Of one token {data.priceOf1Token}</p>
                <div className="card-actions justify-end">
                    <button className="btn">View</button>
                </div>
            </div>
        </div>
    )
}