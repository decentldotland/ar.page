// @flow 
import * as React from 'react';
import { Button } from '../../buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDollarSign, faGift } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/templates';

type Props = {
    
};
export const Items = (props: Props) => {
    return (
        <div className="grid h-[65px] mt-4 mx-5">
        <Button selected className={styles.lpanel.items.buttons.button} text={
                <div className={styles.lpanel.items.buttons.div}>
                <div className={styles.lpanel.items.buttons.divDiv}>
                    <FontAwesomeIcon icon={faUser} className="w-3 mb-1" />
                    </div>
                    <div className="-mr-2.5">Profile</div>
                </div>
            } />
            {/* <Button selected className={styles.lpanel.items.buttons.button} text={
                <div className={styles.lpanel.items.buttons.div}>
                <div className={styles.lpanel.items.buttons.divDiv}>
                    <FontAwesomeIcon icon={faDollarSign} className="w-3 mb-1"/>
                    </div>
                    <div className="-mr-2.5">Tokens</div>
                </div>
            } /> */}
            <Button selected className={styles.lpanel.items.buttons.button} text={
                <div className={styles.lpanel.items.buttons.div}>
                <div className={styles.lpanel.items.buttons.divDiv}>
                    <FontAwesomeIcon icon={faGift} className="w-3 mb-1"/>
                    </div>
                    <div className="-mr-2.5">Collectibles</div>
                </div>
            } />
        </div>
    );
};