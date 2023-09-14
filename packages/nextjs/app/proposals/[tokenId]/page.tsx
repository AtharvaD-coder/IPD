'use client'
import axios from "axios"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Button from "~~/components/custom_components/button";
import Card from "~~/components/custom_components/card";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Proposal } from "~~/types/proposal";
import { ProposalType } from "~~/utils/enums";



export default function ViewProposals() {
    const router = useRouter();
    const { tokenId } = router.query;
    const [proposals, setProposals] = useState<Proposal[] | null>(null);

    const { writeAsync: voteFunc } = useScaffoldContractWrite({
        contractName: 'RealEstateERC1155',
        functionName: 'vote',
        args: [BigInt(1), true]
    })
  

    useEffect(() => {

        async function getProposals() {
            if (!tokenId) {
                return;
            }
            try {
                console.log(tokenId);
                const result = await axios.post('http://localhost:3000/api/getProposals', { tokenId });
                console.log(result.data);
                setProposals(result?.data?.data)

            }
            catch (error) {
                console.log(error);
            }

        }
        getProposals()
    }, [tokenId])
    return (
        <div>
            {
                proposals && proposals?.map((data: Proposal) => {
                    let deadlineDate = new Date(data.deadline * 1000);
                    const date = deadlineDate.toDateString()

                    return (
                        <div key={data.proposalId}>
                            <Card>
                                <div>Proposal Id : {data?.proposalId}</div>
                                <div>proposal Type : {ProposalType[data?.proposalType]}</div>
                                <div>Positive Votes : {data.positiveVotes}</div>
                                <div>Negative Votes : {data.negativeVotes}</div>
                                <div>proposal Creator : {data.proposalCreator}</div>
                                {
                                    data.proposalType === 3 ?
                                        <div>
                                            RentInfo :
                                            <div>Deposit Amount: {data.Rentinfo.depositAmount}</div>
                                            <div>rent of one month :{data.Rentinfo.rentof1Month}</div>
                                            <div>feesForLateInstallments : {data.Rentinfo.feesForLateInstallments}</div>


                                        </div>
                                        :
                                        null
                                }
                                <div>deadline : {date} </div>
                                <div className="vote flex w-full justify-around">
                                    <Button label="Upvote" onClick={() => voteFunc({args: [BigInt(data.proposalId),true]})} />
                                    <Button label="DownVote" onClick={() => voteFunc({args: [BigInt(data.proposalId),false]})} />
                                </div>

                            </Card>

                        </div>
                    )
                })
            }
        </div>
    )
}