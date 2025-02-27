/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    scaleFactor: {default : 1},
    minScale: { default: 1 },
    maxScale: { default: 8 },
    mode: { default: "ar" }
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;

      if (this.data.mode == "gyroscopic") {
        this.el.object3D.rotation.x +=
          event.detail.positionChange.y * this.data.rotationFactor;
      }
    }
  },

  changeMode: function (mode) {
    this.data.mode = mode;
    if (mode == "ar") {
      this.el.object3D.rotation.x = 0;
      this.el.object3D.rotation.y = 0;
      this.el.object3D.scale.set(1, 1, 1);
      this.data.scaleFactor = 0;
    } else if (mode == "gyroscopic") {
      this.data.scaleFactor = this.schema.scaleFactor.default;
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.data.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.data.scaleFactor = Math.min(
        Math.max(this.data.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.data.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.data.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.data.scaleFactor * this.initialScale.z;
    }
  },
});