
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);




const menu = [
    {
        "title": "Boba Icy Yum",
        "description": "Delicious!",
        "price": 49.0,
        "model": "data/16_3_2025.glb"
    },
    {
        "title": "Chewy Icy Yum",
        "description": "Chewy!",
        "price": 49.0,
        "model": "data/16_3_2025(1).glb"
    },
    {
        "title": "Sharp Icy Yumm",
        "description": "OOhhh!",
        "price": 49.0,
        "model": "data/16_3_2025(2).glb"
    },
    {
        "title": "Premium Congee",
        "description": "Delicious!",
        "price": 49.0,
        "model": "data/compressed_2_4_2025.glb"
    },
    {
        "title": "Deluxe Taco",
        "description": "Yummy!",
        "price": 39.0,
        "model": "data/compressed_2_19_2025.glb"
    },
    {
        "title": "Choco Butter Bun",
        "description": "UM Deluxe",
        "price": 39.0,
        "model": "data/3_18_2025.glb"
    }
];

class ModelManipulator {
    constructor(menu) {
        this.modelId = 0;
        this.menu = menu;
        this.mode = "ar";
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
        console.log("Item bought");
        alert(`You bought a ${this.menu[this.modelId].title} for $${this.menu[this.modelId].price}`);
    }

    toggleMode() {
        this.mode = this.mode === "ar" ? "gyroscopic" : "ar";

        document.querySelectorAll("a-entity").forEach(entity => entity.components["gesture-handler"]?.changeMode(this.mode))
    }
}

const modelManipulator = new ModelManipulator(menu);

modelManipulator.renderMenu();

// addEventListener("mousedown", (event) => {
//     const x = event.x;

//     if (x < (window.innerWidth / 4)) {
//         modelManipulator.previousModel();
//     } else if (x > (window.innerWidth * 3 / 4)) {
//         modelManipulator.nextModel();
//     }
// })


