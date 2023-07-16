import "../App.css";
function Loading(props) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 w-full">
      {props.realdata === undefined ? (
        <h1 className="text-2xl font-semibold text-gray-800">
          You might have entered wrong details logout and try again!
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-800">
          {props.realdata}
        </h1>
      )}
      <br />
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}

export default Loading;
