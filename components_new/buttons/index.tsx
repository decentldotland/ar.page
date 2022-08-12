// @flow 
import * as React from 'react';
import styles from '../../styles/templates'

type Props = {
    text: string | object;
    selected?: boolean;
    onClick?: any;
    className?: string;
};
export const Button = (pr: Props) => {

    // console.log(typeof props.text)
    // console.log(props.text)
    let props = {
        className: '',
        onClick: () => {},
        slelected: false,
         ...pr}

    const click = props.onClick as any;
    return (
        <button onClick={click}
            className={
                (props.selected == undefined)
                    ? styles.button : styles.buttonSelected + props.className
            }>
            {props.text}
        </button>
    );
};