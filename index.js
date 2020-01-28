let net;
let input = document.querySelector('input[type="file"]');


async function app(imgS) {
    console.log('Loading mobilenet..');
    document.querySelector('#imageSection').innerHTML = '';
    document.getElementById('textSection').innerHTML = 'Loading...';
    document.getElementById('list').innerHTML = '';

    try {
        net = await mobilenet.load();
        //throw 'crash';
        console.log('Successfully loaded model');
        const result = await net.classify(imgS);
        //console.log(result);
        if (imgS === document.getElementById('thumb1') ||
        imgS === document.getElementById('thumb2') ||
        imgS === document.getElementById('thumb3')){
        }else {
            document.querySelector('#imageSection').appendChild(imgS);
        }
        document.getElementById('textSection').innerHTML = 'The results are:';
        result.forEach((item) => {
            let node = document.createElement("LI");
            let textnode = document.createTextNode(item.className + " at " + (item.probability * 100).toFixed(2) + "% probability.");
            node.appendChild(textnode);
            document.getElementById('list').appendChild(node);
        })
    } catch (e) {
        document.getElementById('textSection').innerHTML = "For some reason the application failed. Try again and if the problem persist, " +
            "email juho.huhtanen@metropolia.fi. Errormsg: " + e;
    }
}


document.getElementById('thumb1').onclick=()=>{
    app(document.getElementById('thumb1'));
};
document.getElementById('thumb2').onclick=()=>{
    app(document.getElementById('thumb2'));
};
document.getElementById('thumb3').onclick=()=>{
    app(document.getElementById('thumb3'));
};

input.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        app(img);
    };
    reader.readAsDataURL(input.files[0]);
}, false);
