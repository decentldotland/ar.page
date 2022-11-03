import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import Web3 from 'web3';
import { Ans } from './types';

/**
 * Validates the user's address and display name
 * 
 * 
 * @param arLabel the user's input for display name
 * @returns error message either for invalid wallet address or invalid display name
 */
function useValidateLabel(arLabel: string ): string  {

    const [invalidEVM, setInvalidEVM] = useState('')
    const [invalidLabel, setInvalidLabel] = useState('');

    // Wallet DEtails 
    const { address, isConnected, connector } = useAccount();
    const web3 = new Web3(Web3.givenProvider);
    const [evmAddress, setEvmAddress] = useState('');
    
    
    const [existingANSNames, setExistignANSNames] = useState<Ans[]>([]);

    const checkOwnedLabelsList = () => existingANSNames.map(u => u.ownedLabels).flat().map(l => l.label).find(l => l === arLabel.toLowerCase());
    const EvmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const ArLabelRegex = /^[a-z0-9]{2,15}$/;

    const validateLabel = () => {
      if (arLabel.length === 0) return ''
      if (arLabel.length > 15) return 'Username is too long'
      if (arLabel.toLowerCase() === 'ar') return 'ar is reserved'
      if (!ArLabelRegex.test(arLabel)) return 'Invalid label, try another one.'
      if (checkOwnedLabelsList()) return 'Username is already taken, try another one.'
      return ''
    };

    // Validate Wallet 
    const validateEVM = (suppliedAddress='') => {
      const address = suppliedAddress || evmAddress;
      if (address.length === 0) return ''
      if (!EvmAddressRegex.test(address) || !web3.utils.checkAddressChecksum(address)) return 'Invalid EVM address'
      // if (EVMAddressTaken(address)) return 'This address is already registered'
      return ''
    };

    // Validate the user's input for ar label 
    useEffect(() => {
      setInvalidLabel(validateLabel())
    }, [arLabel])
    
    // Validate the user's walelt 
    useEffect(() => {
      setInvalidEVM(validateEVM())
    }, [evmAddress])
    
    
    // Get's all the Existing names
    useEffect(() => {
      axios.get('/api/ansusers').then(res => {
        setExistignANSNames(res.data?.res)
      })
  
    }, [])
    useEffect(() => {
      if (!address) return;
      if (!existingANSNames) return;
      setInvalidEVM(validateEVM(address))
      setInvalidLabel(validateLabel())
    }, [existingANSNames])
  

    useEffect(() => {
      if (address && isConnected) {
        const result = validateEVM(address);
        setInvalidEVM(result)
        setEvmAddress(address)

      // if error has occurred, mrestart
      //   if (result === '' 
      //   // && !EVMAddressTaken(address)
      //   ) setCurrentStep(1)
      //   else setCurrentStep(0)
      }
      else {
        setEvmAddress('')
      }
    }, [address, isConnected]);


  return invalidEVM || invalidLabel
    
}

export default useValidateLabel