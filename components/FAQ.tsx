// @flow 
import axios from 'axios';
import * as React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useFetchData from '../src/useFetch';
// type Props = {
//     children?: any;
// };
export const FAQ = () => {

    // const [md, setMd] = React.useState<string>("");
    const {
        data,
        loading,
    } = useFetchData("https://raw.githubusercontent.com/charmful0x/ar.page.faq/main/README.md")

    return (
        <div className="w-full h-srceen lg:-py-24 lg:my-10 max-w-3xl mx-auto my-5 -py-10 text-white">
            {/* old user not found divs
            
                <div className="w-full lg:min-h-fit grid lg:p-24 content-center lg:relative absolute bottom-4 top-4 text-center rounded-xl shadow-md border-2 border-prim1 shadow-gray-700">
                <h1 className="text-3xl mx-auto font-extrabold text-prim2 underline">Uh-oh 404</h1>
                <h1 className="text-xl mx-auto text-white">User</h1>
                <h1 className="text-xl mx-auto text-white">Not Found</h1>
                <h1 className="text-xl mx-auto text-white">🙃</h1>
            </div> */}
            {!loading && (
                <div className="container my-auto mx-auto px-8 pb-1">
                    {<ReactMarkdown
                        components={{
                            // Map `h1` (`# heading`) to use `h2`s.
                            h1: ({ node, ...props }) => <h2 className="text-sviolet capitalize font-extrabold text-4xl w-full pb-4 border-b-2 border-sviolet" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-prim2 capitalize font-extrabold text-xl my-4" {...props} />,
                            p: ({ node, ...props }) => <p className="capitalize indent-8 my-2 mb-10 last:text-center" {...props} />,
                            a: ({ node, ...props }) => <a className="underline text-prim1" {...props} />,
                            code: ({node, inline, className, children, ...props}) => <code className={"py-0.5 px-1.5 bg-prim1 rounded-md text-back font-extrabold lg:w-1/5 w-full"} {...props}>
                            {children}
                          </code>,
                        }} remarkPlugins={[remarkGfm]}>
                        {data}
                    </ReactMarkdown>}
                </div>
            )}

        </div>
    );
};
