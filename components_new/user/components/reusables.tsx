export function Title (jsx: any) {
  return (
    <div className="w-full text-start font-medium text-xs text-gray-450 tracking-wide uppercase">
      {jsx.children}
    </div>
  )
};
export function Divider () {

  return <div className="bg-gray-300 h-[1.5px] w-full my-6"></div>
}

export function LoadingOrNotFound({loading, jsxNotFound}: {loading: boolean, jsxNotFound: any}) {
  return (
    <div className="flex items-center justify-center text-3xl text-content-100/80 font-bold">
      {loading ? (
        <>
          <span>Loading...</span>
          <span className="btn btn-sm loading"></span>
        </>
      ) : <>{jsxNotFound}</>}
    </div>
  )
}