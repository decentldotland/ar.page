// @flow 
import * as React from 'react';
import { LoadingOrNotFound } from './reusables';
import { ARWEAVE_EXPLORER_TX } from '../../../src/constants';
import { ArweaveTransaction, userInfo } from '../../../src/types';
import { arweaveTransactionHandler } from '../../../src/utils';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: Create a general component for this
export const ArweaveActivity = ({transactions, loading}: {transactions: ArweaveTransaction[], loading: boolean}) => {

  const [onLoad, setOnLoad] = React.useState<boolean>(false);

  const epochToDate = (epoch: number) => {
    return (new Date(epoch * 1000)).toLocaleString();
  }

  React.useEffect(() => {
    setOnLoad(true);
  }, [])

  return (
    <>
      {transactions.length > 0 ? (
        <div className={`flex flex-col transition-opacity duration-500 pb-3 opacity-0 ${(onLoad && !loading) && 'opacity-100'}`}>
          {transactions.map((transaction: ArweaveTransaction, index: number) => (
            <a key={index}
              className="flex items-center my-2 rounded-lg transition-all ease-in-out duratino-200 hover:shadow-lg" 
              href={ARWEAVE_EXPLORER_TX + transaction.txid}
              rel="noopener noreferrer" target="_blank"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mr-4">
                <div className="w-12 h-12 bg-yellow-300/80 rounded-full">
                </div>
              </div>
              <div className="grow flex justify-between items-center">
                <div className="flex flex-col ">
                  <div>{arweaveTransactionHandler(transaction) + ""}</div>
                  <div>{epochToDate(transaction.timestamp)}</div>
                </div>
                <div className="flex mr-4">
                  {/* TODO: make it non-static */}
                  <div>
                    <FontAwesomeIcon icon={faCheck} className="w-9 h-9 bg-green-400 text-white rounded-full p-2" />
                  </div>
                </div>
              </div>
            </a>
        ))}
        </div>
      ) : (
        <LoadingOrNotFound loading={loading} jsxNotFound={"No activity found"} />
      )}
    </>
  )
};
