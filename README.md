# PoseNet PubSub

This code allows you to run an animation that receives data from PoseNet, at a
higher frame rate than PoseNet itself.

It works by running PoseNet in one web page (the “publisher”), that uses
[localStorage
API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to
publish data to another web page (the “subscriber”) that is running at a higher
frame rate. This enables smoother animation of elements that are not directly
fixed to the PoseNet positions.

The

## Demo

Run [Live
Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
in (Visual Studio Code) or `python3 -m http.server`. Open `index.html`. This
opens the subscriber, with the publisher running in a hidden iframe within the
page.

The publisher and subscriber can also be opened in separate pages. For this to
work, the they must be each be open in a separate _window_ (not a separate tab
in the _same_ window). You can place the publisher window behind the subscriber
window, but it can't be in a separate workspadce and the subscriber can't be
full screen.

## Usage

To use this in your own code, keep `publisher.html` and `publisher.js` the same.
(You can copy them into your project).

Add the iFrame to your HTML:

```html
<iframe src="./publisher.html" style="display:none"></iframe>
```

Add the subscription functionality to your own code:

```js
let poses = null;

window.addEventListener("storage", event => {
  if (event.key === "posenet") {
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

The same result could presumably be achieved by moving poseNet to a web worker.
As of late 2019 this was not possible.

## License

MIT License
