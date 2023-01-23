// @flow 
import * as React from 'react';
import { createPortal } from 'react-dom';


const ReactPortal =
    ({ children, wrapperId = "portal" }:
        { children: any, wrapperId: string }) => {
        return createPortal(children, (document.getElementById(wrapperId) as any));
    };

export default ReactPortal;