import "../App.css";
function Loading() {
  const quotes = [
    "Go ahead -- hold your breath!",
    "Alt-F4 speeds things up...",
    "We're working very Hard .... Really",
    "You are number 2843684714 in the queue",
    "Well, this is embarrassing",
    "It's not you. It's me",
    "My other loading screen is much faster",
    "Web developers do it with <style>",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
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
      <p className="quote text-white">{randomQuote}</p>
    </div>
  );
}

export default Loading;
