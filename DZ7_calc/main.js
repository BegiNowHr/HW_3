const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const euro = document.querySelector("#euro");

function convert(elem, target, isTrue) {
    elem.addEventListener("input", () => {
        fetch("data.json")
            .then((response)=>response.json())
            .then(data=>{
                if(elem===som){
                    target.value = (elem.value/data.usd).toFixed(2)
                    isTrue.value = (elem.value/data.euro).toFixed(2)
                }
                else if(elem===usd){
                    target.value = (elem.value*data.euro/data.usd).toFixed(2)
                    isTrue.value = (elem.value*data.usd).toFixed(2)
                }
                else if(elem===euro){
                    isTrue.value = (elem.value/data.euro).toFixed(2)
                    target.value = (elem.value*data.usd/data.euro).toFixed(2)
                }
                elem.value ===""&&(target.value="");
            })
            .catch(error=>console.error(error))

        });
    }


const arr = [
    { elem: som,
        target: usd,
        isTrue: euro },
    { elem: usd,
        target: euro,
        isTrue: som },
    { elem: euro,
        target: usd,
        isTrue: som },

];

arr.forEach((item) => {
    convert(item.elem, item.target, item.isTrue);
});
