
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);




const menu = [
    {
        "title": "Premium Congee",
        "description": "Delicious!",
        "price": 49.0,
        "model": "data/compressed_2_4_2025.glb",
        "image":"https://media-hosting.imagekit.io//48bc374b85b34974/%E4%B8%8B%E8%BC%89%20(1).jpeg?Expires=1837015293&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JnXks9Cd2sL-WL~CrIYFWEwbsLIrlvzRWNQevIMIcABKFueQQsiaUIHQ0jQdvUgQB9zno05mMvMGqR5wRxi9SlAy9J5HjL9P-Zas3y5jvJQWjNp28A-V83bNVIC~JRxmHe9jpiAq56fyixHiKGHZMyzVygaCA4T7YJwh57CJbxOM0zwGAM8RRhHYOfcJPKhJJCm2o6h560-Dk7S7TjLi8CnmxEc3AvDkvr5enWfJlgp6n-HdM9boIGQK0pGare6SudKm3JjbcWtfbYtkjSHz-gRck-SBh8bokQ6t8QA3CkThlv~cYqbiIvmoEZpFETj0PQwg3DHQh~O34jy3cmLKlg__" //the image download from web for testing only
    },
    {
        "title": "Deluxe Taco",
        "description": "Yummy!",
        "price": 39.0,
        "model": "data/compressed_2_19_2025.glb",
        "image":"https://media-hosting.imagekit.io//9086b19750314ddc/%E4%B8%8B%E8%BC%89%20(2).jpeg?Expires=1837016800&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=rzWeeB9GbvdXWPVt9gBNSZbD1eo-chZMIMe~o57vF3YXjLZROOgPWN9IoPxlH4H5zqriz8zzB3CoIyV8QpBlxl7w2aPDM2khUSFtbZvU87c6VvvmgjsA6xlCYAp~5Av9bsGzn6ppPVoxE7ODkcT5S--dhoX5OodXWZwq-bf~7V7vF3RdeS3UCAtcrWDNbLlDcZZAqkERCkLF-t3mJHCKIbaotVoT2-4baoy~mVUA3cC4HXyk1t3EceZyuznmNounPJQqZ22jUsY6YVGkfpfNG3rIuuIB8unJ8k3YqzHuz887AkQEl4-XOFhFB9HcCx-W4DxRZwW8qU5TaGlgk2ztrw__" //the image download from web for testing only
    },
    {
        "title": "Chewy Icy Yum",
        "description": "Chewy!",
        "price": 49.0,
        "model": "data/3月16日 下午9_19 (1).glb",
        "image": "https://media.discordapp.net/attachments/738532982985457724/1352154460432105502/IMG-20250318-WA0001.jpg?ex=67dcfb79&is=67dba9f9&hm=f5f86d846b5bab04f9d3849ce5cb904657b108ac8425492c9e579c61d9fcbeaf&=&format=webp&width=972&height=1296"

    },
    {
        "title": "Boba Icy Yumm",
        "description": "OOhhh!",
        "price": 49.0,
        "model": "data/3月16日 下午9_28 (1).glb",
        "image": "https://media.discordapp.net/attachments/738532982985457724/1352154563691548672/IMG_20250316_212221.jpg?ex=67dcfb91&is=67dbaa11&hm=cf820d10edf22e8e38db9e12ac673483bc43f500f1b01229e5db9dabdb46534e&=&format=webp&width=972&height=1296"
    },
    {
        "title": "Choco Butter Bun",
        "description": "UM Deluxe",
        "price": 39.0,
        "model": "data/3_18_2025.glb",
        "image":"https://cdn.discordapp.com/attachments/738532982985457724/1352155531296505917/image.png?ex=67dcfc78&is=67dbaaf8&hm=c7c427679644524f73df0868d4fb740d68367adcf3466505a7dd016f411eb41b&" //the image download from web for testing only

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
        
        document.getElementById("price_text").innerText = `$ ${this.menu[this.modelId].price} \nOrder`;

        document.getElementById("header_image").src = this.menu[this.modelId].image;

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