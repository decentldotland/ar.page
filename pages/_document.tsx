// @flow
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
type Props = {

};
type State = {

};
export default class _document extends Document {
    render() {
        return (
            <Html>
            <Head />
            <body>
                <Main />
                <div id="portal" className="absolute top-0 left-0 font-mono" />
                <NextScript />
            </body>
            </Html>
        );
    };
};