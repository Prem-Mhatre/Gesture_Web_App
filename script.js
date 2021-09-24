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