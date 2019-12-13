const stats = new Stats();
let latestPoses = [];

export function setup() {
  createCanvas(640, 480);

  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  window.addEventListener("storage", event => {
    if (event.key === "posenet") {
      select("#status").hide();
      latestPoses = JSON.parse(event.newValue);
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
