// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { Button } from '../../buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDollarSign, faGift } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/templates';

export const Items = () => {
    const {
        walletConnected,
        ansData,
    } = useAns();

    return (
        <div className="grid h-[65px] mt-4 mx-5">
            <a href={walletConnected ? ansData?.currentLabel: "/"} className="btn btn-sm btn-primary mb-3">
                <FontAwesomeIcon icon={faUser} className="w-3 mb-0.5 mr-2" />
                <span>Profile</span>
            </a>
            {/* <Button selected className={styles.lpanel.items.buttons.button} text={
                <div className={styles.lpanel.items.buttons.div}>
                <div className={styles.lpanel.items.buttons.divDiv}>
                    <FontAwesomeIcon icon={faDollarSign} className="w-3 mb-1"/>
                    </div>
                    <div className="-mr-2.5">Tokens</div>
                </div>
            } /> */}
            <button className="btn btn-sm btn-primary">
                <FontAwesomeIcon icon={faGift} className="w-3 mb-0.5 mr-2"/>
                <span className="">Collectables</span>
            </button>
        </div>
    );
};