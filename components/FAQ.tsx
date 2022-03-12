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
        <div className="w-full h-srceen lg:-py-24 lg:my-24 max-w-3xl mx-auto my-5 -py-10 text-white">
            {/* old user not found divs
            
                <div className="w-full lg:min-h-fit grid lg:p-24 content-center lg:relative absolute bottom-4 top-4 text-center rounded-xl shadow-md border-2 border-prim1 shadow-gray-700">
                <h1 className="text-3xl mx-auto font-extrabold text-prim2 underline">Uh-oh 404</h1>
                <h1 className="text-xl mx-auto text-white">User</h1>
                <h1 className="text-xl mx-auto text-white">Not Found</h1>
                <h1 className="text-xl mx-auto text-white">🙃</h1>
            </div> */}
            {!loading && (
                <div className="container my-auto mx-auto px-8">
                    {<ReactMarkdown
                        components={{
                            // Map `h1` (`# heading`) to use `h2`s.
                            h1: ({ node, ...props }) => <h2 className="text-sviolet capitalize font-bold text-3xl my-8" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-prim2 capitalize font-bold text-xl my-4" {...props} />,
                            p: ({ node, ...props }) => <p className="capitalize indent-8 my-2" {...props} />,
                            // a: ({ node, ...props }) => <a className="capitalize indent-8 my-2" {...props} />,
                        }} remarkPlugins={[remarkGfm]}>
                        {data}
                    </ReactMarkdown>}
                </div>
            )}

        </div>
    );
};
