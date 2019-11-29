const stats = new Stats();
let video;

export function setup() {
  createCanvas(640, 480);
  video = select("video") || createCapture(VIDEO);
  video.size(width, height);
  const poseNet = ml5.poseNet(video, () => select("#status").hide());
  poseNet.on("pose", drawPoses);
  video.hide();

  stats.showPanel(0);
  document.body.appendChild(stats.dom);
}

function drawPoses(poses) {
  stats.begin();
  push();
  translate(width, 0);
  scale(-1.0, 1.0);
  image(video, 0, 0, video.width, video.height);
  localStorage['posenet'] = JSON.stringify(poses);
  drawKeypoints(poses);
  drawSkeleton(poses);
  pop();
  stats.end();
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
