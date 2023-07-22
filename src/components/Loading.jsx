import "../App.css";
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 w-full">
      {/* <ul class="loader">
        <li class="center"></li>
        <li class="item item-1"></li>
        <li class="item item-2"></li>
        <li class="item item-3"></li>
        <li class="item item-4"></li>
        <li class="item item-5"></li>
        <li class="item item-6"></li>
        <li class="item item-7"></li>
        <li class="item item-8"></li>
      </ul> */}
      <div className="loader1">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}

export default Loading;
