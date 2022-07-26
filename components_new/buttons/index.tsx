// @flow 
import * as React from 'react';
import styles from '../../styles/templates'

type Props = {
    text: string | object;
    selected?: boolean;
    onClick?: any;
    className?: string;
};
export const Button = (props: Props) => {

    console.log(typeof props.text)
    console.log(props.text)
    const className = (props.className == undefined) ? ' ' : ' ' + props.className
    const click = props.onClick as any;
    return (
        <button onClick={click}
            className={
                (props.selected == undefined)
                    ? styles.button : styles.buttonSelected + className
            }>
            {props.text}
        </button>
    );
};