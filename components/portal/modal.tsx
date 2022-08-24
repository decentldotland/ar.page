// @flow 
import * as React from 'react';
import { createPortal } from 'react-dom';
import ReactPortal from './reactPortal';

type Props = {
    isOpen: boolean;
};
const Modal =
    ({ children, isOpen, handleClose }:
        { children: any, isOpen: boolean, handleClose: any }) => {
        if (!isOpen) return null;

        return (
            <ReactPortal wrapperId="portal">
                <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center overflow-hidden z-50" onClick={handleClose}>
                <div className="absolute container" onClick={e => e.stopPropagation()}>{children}</div>
                </div>
            </ReactPortal>
        )
    };

export default Modal;