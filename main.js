song="";
status="";
objects=[];

function preload(){
    song= loadSound("alert.mp3");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(500,400);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Object Detecting ";
}

function modelLoaded(){
    console.log("model has loaded");
    status=true;
}

function gotResults(error,results){
if(error){
    console.log(error);
}
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,500,400);
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are:"+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label=="person"){
            document.getElementById("number_of_objects").innerHTML="Baby Found";
            song.stop();
        }
        else{
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            song.play();
        }
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            song.play();
        }
    }
}