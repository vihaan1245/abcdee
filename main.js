objects = [];
status = "";
input_text = "";

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide(); 
    video.size(480,380);  
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

    input_text = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected!";
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text)
            {
              video.stop();
              objectDetector.detect(gotResults);
              document.getElementById("object_status").innerHTML = input_text + " found";
            }
             else
             {
                document.getElementById("object_status").innerHTML = input_text + " not found";
             }
        }
    }
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
