import { useEffect, useState } from "react";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function VotesComponent({ address }: any) {
    const { data: votesData } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getUserVotesCount",
        args: [address],
        watch:true
    });

    const { writeAsync: upvvote } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "upvoteUser",
        args: [address]
    })

    const { writeAsync: downvote } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "downvoteUser",
        args: [address]
    })


    console.log(votesData, "votesData")
    const positiveVotes = Number(votesData?.[0] ?? 0);
    const negativeVotes = Number(votesData?.[1] ?? 0);
    const max = Number(positiveVotes) + Number(negativeVotes);






    return (
      <CardBox>
            <h1 className="text-3xl font-bold ">Votes</h1>
            <div className="flex flex-col m-3">
                <div className="mt-4">
                    <div className="flex justify-between">
                        <div>
                            Up votes
                        </div>
                        <div>
                            {
                                max===0?"0 %":(positiveVotes / max) * 100 + ' %'
                            }
                            
                        </div>

                    </div>
                    <progress className="progress progress-primary w-56 " value={positiveVotes} max={max}></progress>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between">
                        <div>
                            Down votes
                        </div>
                        <div>
                            {
                                max===0?"0 %":Number(negativeVotes / max) * 100 + ' %'
                            }
                        </div>

                    </div>
                    <progress className="progress progress-primary w-56 " value={negativeVotes} max={max}></progress>
                </div>
            </div>

            <div className="flex">
                <div>
                    <button onClick={() => upvvote()} className="btn btn-primary m-3">UpVote</button>
                    <button onClick={() => downvote()} className="btn btn-primary m-3">DownVote</button>
                </div>
            </div>
        </CardBox>
    );
}
