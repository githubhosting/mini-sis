import "../App.css";
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}

export default Loading;
