const stats = new Stats();
const poseStats = new Stats();
let latestPoses = [];

export function setup() {
  createCanvas(windowWidth, windowHeight);

  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  poseStats.showPanel(0);
  document.body.appendChild(poseStats.dom);
  poseStats.dom.style.left = "80px";

  window.addEventListener("storage", event => {
    if (event.key === "posenet") {
      select("#status").hide();
      poseStats.begin();
      latestPoses = JSON.parse(event.newValue);
      rescalePoses(latestPoses);
      poseStats.end();
    }
  });
}

export function draw() {
  stats.begin();
  clear();
  if (latestPoses) {
    drawPoses(latestPoses);
  }
  stats.end();
}

// The camera image is always 640 x 480. Rescale it to the current canvas size,
// while preserving its aspect ratio.
function rescalePoses(poses) {
  const ratio = min(width / 640, height / 480);
  const dx = (width - 640) / ratio / 2;
  function xform({ position: pt }) {
    pt.x = pt.x * ratio + dx;
    pt.y *= ratio;
  }
  poses.forEach(({ pose, skeleton }) => {
    pose.keypoints.forEach(xform);
    skeleton.forEach(([p1, p2]) => {
      xform(p1);
      xform(p2);
    });
  });
}

export function drawPoses(poses) {
  translate(width, 0);
  scale(-1.0, 1.0);
  drawKeypoints(poses);
  drawSkeleton(poses);
}

function drawKeypoints(poses) {
  poses.forEach(pose =>
    pose.pose.keypoints.forEach(keypoint => {
      if (keypoint.score > 0.2) {
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    })
  );
}

function drawSkeleton(poses) {
  poses.forEach(pose => {
    pose.skeleton.forEach(skeleton => {
      const [p1, p2] = skeleton;
      stroke(255, 0, 0);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    });
  });
}
