import * as React from "react";
import { localhost } from "wagmi/dist/chains";
import Web3 from "web3";
import { CardBox } from "~~/components/custom_components/cardComponent";
import contracts from "~~/generated/deployedContracts";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { realEstateStatus } from "~~/utils/utils";

export default function CustomizedTimeline({ tokenId }: any) {
  const [events, setEvents] = React.useState([]);
  const localhostUrl = process.env.NEXT_PUBLIC_RPC??'http://127.0.0.1:8545/'; // Update the port if needed
  const web3 = new Web3(localhostUrl); // Replace 'YOUR_PROVIDER_URL' with your Ethereum node provider URL
  const targetNetwork = getTargetNetwork();
  console.log(targetNetwork,"targetNetwork")
  const contractAddress = contracts[targetNetwork.id][0].contracts.RealEstateERC1155.address;
  const contractAbi = contracts[targetNetwork.id][0].contracts.RealEstateERC1155.abi;

  const contractweb3 = new web3.eth.Contract(contractAbi, contractAddress);
  async function getEvents() {
    const events = await contractweb3.getPastEvents("allEvents", {
      fromBlock: 0,
      toBlock: "latest",
    });
    console.log(events, "events", tokenId);
    const filteredEvents = events.filter(event => Number(event.returnValues.tokenId) == tokenId);

    const eventsWithTxDetails = await Promise.all(
      filteredEvents.map(async event => {
        const tx = await web3.eth.getTransaction(event.transactionHash);
        const timestamp = (await web3.eth.getBlock(tx.blockNumber)).timestamp;

        return {
          ...event,
          timestamp: new Date(Number(timestamp) * 1000), // Convert UNIX timestamp to JavaScript Date object
          sender: tx.from,
        };
      }),
    );

    console.log(eventsWithTxDetails, "eventsWithTxDetails");
    setEvents(eventsWithTxDetails);
  }

  React.useEffect(() => {
    getEvents();
  }, [tokenId]);

  return (
    <CardBox
    className='w-[100%] flx '
  >
    <h1 className="text-3xl font-bold mb-3">Activity </h1>
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical ">
      {events?.map(({ timestamp, event, sender, returnValues }: any, index: any) => {
        let eventName = "";
        let date = new Date(timestamp).toLocaleString();
        if (event === "RealEstateListed") {
          eventName = "Real Estate Listed";
        } else if (event === "RealEstateUpdated") {
          eventName = "Real Estate Updated";
        } else if (event === "RealEstateRented") {
          eventName = "Real Estate Rented";
        } else if (event === "RealEstateStatusUpdated") {
          eventName = " Status Updated";
        }
        else if (event === "TokensTransfered") {
          eventName = "Tokens Transfered"
        }

        return (
          <li>

            <div className={`timeline-${index % 2 == 0 ? "start" : "end"}   md:text-end mb-20`} >
              <div style={{
                transform: 'scaleY(-1)',

              }} className={`chat chat-${index % 2 === 0 ? "end" : "start"}  flex flex-row justify-center   `}>
                <div className="chat-bubble chat-bubble-secondary  ">


                  <div style={{
                    transform: 'scaleY(-1)'

                  }} >

                    <time className="font-mono italic">{date}</time>
                    <div className="text-lg font-black">{eventName}</div>
                    <div>
                      {event === "RealEstateListed" ? (
                        <div>
                          <p>
                            <span className="font-bold   ">By :</span> {sender}
                          </p>
                          <p>
                            <span className="font-bold">Initail number of Tokens : </span>
                            {Number(returnValues.noOfTokens)}
                          </p>
                          <p>
                            <span className="font-bold">Inital Price of 1 Token : </span>
                            {Number(returnValues.priceOf1Token)}
                          </p>
                        </div>
                      ) : event === "RealEstateStatusUpdated" ? (
                        <div>
                          <p>
                            <span className="font-bold   ">By :</span> {sender}
                          </p>
                          <p>
                            <span className="font-bold">Status : </span>
                            {realEstateStatus(Number(returnValues.status))}
                          </p>
                        </div>
                      ) : event === "TokensTransfered" ? (
                        <div>
                          <p>
                            <span className="font-bold   ">from :</span> {returnValues.from}
                          </p>
                          <p>
                            <span className="font-bold   ">To :</span> {returnValues.to}
                          </p>
                          <p>
                            <span className="font-bold ">Number of tokens : </span>
                            {Number(returnValues.noOfTokens)} tokens
                          </p>
                        </div>
                      ) :
                        (
                          ""
                        )
                      }
                    </div>
                  </div>


                </div>
              </div>

            </div>
            <div className="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>

            </div>
            <hr />
          </li>
        );
      })}
      {/* <li>
                <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">1984</time>
                    <div className="text-lg font-black">First Macintosh computer</div>
                    The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal computer. It played a pivotal role in establishing desktop publishing as a general office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated carrying handle; it came with a keyboard and single-button mouse.
                </div>
                <hr />
            </li> */}
      {/* <li>
                <hr />
                <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end mb-10">
                    <time className="font-mono italic">1998</time>
                    <div className="text-lg font-black">iMac</div>
                    iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the primary part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved through seven distinct forms
                </div>
                <hr />
            </li>
            <li>
                <hr />
                <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">2001</time>
                    <div className="text-lg font-black">iPod</div>
                    The iPod is a discontinued series of portable media players and multi-purpose mobile devices designed and marketed by Apple Inc. The first version was released on October 23, 2001, about 8+1⁄2 months after the Macintosh version of iTunes was released. Apple sold an estimated 450 million iPod products as of 2022. Apple discontinued the iPod product line on May 10, 2022. At over 20 years, the iPod brand is the oldest to be discontinued by Apple
                </div>
                <hr />
            </li>
            <li>
                <hr />
                <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end mb-10">
                    <time className="font-mono italic">2007</time>
                    <div className="text-lg font-black">iPhone</div>
                    iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone accounts for 15.6% of global smartphone market share
                </div>
                <hr />
            </li>
            <li>
                <hr />
                <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">2015</time>
                    <div className="text-lg font-black">Apple Watch</div>
                    The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with iOS and other Apple products and services
                </div>
            </li> */}
    </ul>
    </CardBox>
  );
}
