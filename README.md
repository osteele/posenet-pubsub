# PoseNet PubSub

This code allows you to run PoseNet at a low frame rate in one web page, and
publish the data to another web page that is running at a higher frame rate in
order to provide smoother animation of elements that are not directly fixed to
the PoseNet positions.

## Demo

Run [Live
Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
in (Visual Studio Code) or `python3 -m http.server`. Open `publisher.html` in
one browser window, and `subscriber.html` in another.

In order for PoseNet to run, the publisher and subscriber must be each be open
in a separate *window* (not a separate tab in the *same* window). The windows
don't both need to be *visible*. You can place the publisher window behind the
subscriber window, or move it to a separate workspace.

`subscriber.html` is example code that subscribes to the data that
`publisher.html` publishes.

## Usage

To use this in your own code, keep `publisher.html` and `publisher.js` the same.
(You can copy them into your project). Add the subscription functionality to
your own code:

```js
let poses = null;

window.addEventListener('storage', (event) => {
  if (event.key === 'posenet') {
    poses = JSON.parse(event.newValue);
  }
});
```

This stores the most recent pose data into `poses`, where you an use it
elsewhere in your code, for example in a p5.js draw function.

## How it Works

`publisher.html` stores the PoseNet data in
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

`subscriber.html` subscribes to `localStorage`.

## Timings

On my 2019 15" MacBook Pro, `publisher.html` runs at 20 frames per second (fps).
(It runs as slowly as 5fps on an older or less powerful computer.)

`subscriber.html` runs at 60fps on the same computer, with `publisher.html`
running at the same time. It’s only getting new PoseNet data at 20fps, but since
it’s running the animations at 60fps they can look smooth.

## License

MIT License
