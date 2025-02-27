
const menu = [
    {
        "title": "Premium Congee",
        "description": "Delicious!",
        "price": 49.0,
        "model": "data/compressed_2_4_2025.glb",
        "author": "Kalalib"
    },
    {
        "title": "Deluxe Taco",
        "description": "Yummy!",
        "price": 39.0,
        "model": "data/compressed_2_19_2025.glb",
        "author": "Kalalib"
    }
];

class ModelManipulator {
    constructor(menu) {
        this.modelId = 0;
        this.menu = menu;
    }

    renderMenu() {

        document.getElementById("display_entity").setAttribute("gltf-model", this.menu[this.modelId].model);

        
        document.getElementById("title").innerText = this.menu[this.modelId].title;
        
        document.getElementById("description").innerText = this.menu[this.modelId].description;
        
        document.getElementById("price_text").innerText = `$ ${this.menu[this.modelId].price}`;
    }

    nextModel() {
        const modelId = (this.modelId + 1) % this.menu.length;
        
        this.modelId = modelId;

        this.renderMenu();

        setTimeout(() => {
            if (this.modelId == modelId) {
                console.log("stayed");
            } else {
                console.log("not stayed")
            }
        }, 4000)
    }

    previousModel() {
        this.modelId = (this.modelId - 1 + this.menu.length) % this.menu.length;
        
        this.renderMenu();
    }

    buyItem() {
        console.log("Item bought by kpk");
        alert(`You bought a ${this.menu[this.modelId].title} for $${this.menu[this.modelId].price}`);
    }
}

const modelManipulator = new ModelManipulator(menu);

modelManipulator.renderMenu();

addEventListener("mousedown", (ev) => {
    const x = ev.x;
    if (x < (window.innerWidth / 4)) {
        modelManipulator.previousModel();
    } else if (x > (window.innerWidth * 3 / 4)) {
        modelManipulator.nextModel();
    }
})


function handleRotation(event) {
    if (isMarkerVisible) {
      el.object3D.rotation.y +=
        event.detail.positionChange.x * rotationFactor;

      el.object3D.rotation.x +=
        event.detail.positionChange.y * rotationFactor;
    }
}


function handleScale(event) {
    if (isMarkerVisible) {
        this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

        this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
        );

        el.object3D.scale.x = scaleFactor * initialScale.x;
        el.object3D.scale.y = scaleFactor * initialScale.y;
        el.object3D.scale.z = scaleFactor * initialScale.z;
    }
}

const arScene = document.getElementById("scene")

arScene.addEventListener("markerFound", (e) => {
    isMarkerVisible = true;
});

arScene.addEventListener("markerLost", (e) => {
    isMarkerVisible = false;
});

arScene.addEventListener("onefingermove", handleRotation)
arScene.addEventListener("twofingermove", handleScale)