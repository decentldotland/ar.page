// @flow 
// import { faSqa } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import * as React from 'react';
// import { useSetRecoilState } from 'recoil';
// import { isEditorOpen } from '../../atoms';
type Props = {
    onClick: Function;
};
export const Fab = (props: Props) => {
    // const setEditEnabled = useSetRecoilState(isEditorOpen)

    return (
        <button className="rounded-full flex p-2 border-2 border-prim1 bg-nftbg" onClick={() => props.onClick()}>
            <FontAwesomeIcon icon={faPenToSquare} className="text-prim1" width="15" height="15" />
        </button>
    );
};