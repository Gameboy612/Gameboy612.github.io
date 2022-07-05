function barrier() {
    return "{string:0, barrier:1, light:-1, slab:0}"
}

function string() {
    return "{string:1, barrier:0, light:-1, slab:0}"
}

function light() {
    return "{string:0, barrier:0, light:" + document.forms["createBlock"]["light_level"].value + ", slab:0}"
}

function slab() {
    return "{string:0, barrier:0, light:-1, slab:1}"
}

function form() {


    const part1 = "give @s minecraft:bat_spawn_egg{display:{Name:'{\"text\":\""
    var part2 = document.forms["createBlock"]["block_name"].value
    const part3 = "\",\"color\":\"white\",\"italic\":\"false\"}\'},CustomModelData:"
    var part4 = document.forms["createBlock"]["custom_model_data"].value
    const part5 = ",EntityTag:{id:\"minecraft:marker\",Tags:[\"gbfurniture.marker\"],data:{gbfurniture:{Type:"
    var part6
    var blockchoice = document.forms["createBlock"]["base_block"].value

    if(blockchoice == "Barrier") {
        part6 = barrier();
    }
    else if(blockchoice == "String") {
        part6 = string();
    }
    else if(blockchoice == "Light") {
        part6 = light();
    }
    else if(blockchoice == "Slab") {
        part6 = slab();
    }

    const part7 = ",Item:{id:\"minecraft:bat_spawn_egg\",tag:{display:{LocName:\'{\"text\":\""
    var part8 = document.forms["createBlock"]["block_name"].value
    const part9 = "\",\"color\":\"white\",\"italic\":\"false\"}\'},CustomModelData:"
    var part10 = document.forms["createBlock"]["custom_model_data"].value
    const part11 = "},Count:1b}}}}} 1"


    document.getElementById("output").innerHTML = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9 + part10 + part11;

    return false;
}