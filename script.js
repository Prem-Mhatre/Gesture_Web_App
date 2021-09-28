prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    img_format: "png",
    png_quality: 100
});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src="+data_uri+">"
    })
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/vAmMALrwP/model.json", modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    syth = window.speechSynthesis;
    speak_data1 = "the first prediction is " + prediction1 + " ";
    speak_data2 = "the second prediction is " + prediction2;
    utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    syth.speak(utter_this);
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_name1").innerHTML = result[0].label;
        document.getElementById("result_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if(prediction1 == "amazing"){
            document.getElementById("emoji1").innerHTML = "&#128076;";
        }
        if(prediction1 == "best"){
            document.getElementById("emoji1").innerHTML = "&#128077;"
        }
        if(prediction1 == "victory"){
            document.getElementById("emoji1").innerHTML = "&#9996;";
        }
        if(prediction2 == "amazing"){
            document.getElementById("emoji2").innerHTML = "&#128076;";
        }
        if(prediction2 == "best"){
            document.getElementById("emoji2").innerHTML = "&#128077;"
        }
        if(prediction2 == "victory"){
            document.getElementById("emoji2").innerHTML = "&#9996;";
        }
    }
}