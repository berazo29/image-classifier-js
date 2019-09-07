// Upload the image
const imgLoad = document.getElementById('file-1');
const imgDisplay = document.querySelector('.previewImg');
let imgVerification = false;

const ans = document.getElementById('answer');

imgLoad.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            console.log(this);
            imgDisplay.setAttribute("src", this.result);

        });
        reader.readAsDataURL(file);
        imgVerification = true;
    }
    if (imgVerification === true) {
        console.log('Image Uploaded');
        console.log('Reading...');

        async function app() {
            console.log('Loading mobilenet..');

            // Load the model.
            net = await mobilenet.load();
            console.log('Sucessfully loaded model');

            // Make a prediction through the model on our image.
            const imgEl = document.querySelector('.previewImg');
            const result = await net.classify(imgEl);
            console.log(result);


            // Change text
            let roundProb = result[0].probability*100;
            let textDis = result[0].className;
            document.getElementById('answer').innerHTML = textDis;
            document.getElementById('percentage').innerHTML = roundProb.toFixed(2)+'%';
        }
        app();

    }
    else {
        console.log('No Image Uploaded')
    }
});


//  EXPRESSION TO CHANCE THE TEXT
/*
    document.getElementById("p1").innerHTML = "New text!";
*/