//Parameters
const debug = 1;


const renderupdates = 1;

const colores = {
    testred: "rgb(200 0 0)",
    testblue: "rgb(0 0 200 / 50%)"
}

//constants 
const canvas = document.querySelector("body > canvas");
const renderObjects = [];
const debugmessages = [];

class main{
Drawline(startPoint, endpoint, thickness, color){
    console.log("a");
    
}
}

const Main = new main();

class Rendering{
constructor(){
    
}
Resizeupdate(){
    const canvas = document.querySelector("canvas");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Renderer.Drawframe();
}
Drawframe(){
    const canvas = document.querySelector("canvas");
    if(canvas.getContext){
        
        const cntx = canvas.getContext("2d");

        //clear frame
        cntx.canvas.width = cntx.canvas.width; //This actually clears the frame
        //cntx.clearRect(0, 0, cntx.canvas.width, cntx.canvas.height); 
        
        //console.log(renderObjects);


        debugmessages.push("Objects: "+renderObjects.length); //Print Object count
        
        //loop pver all Objects
        for (let obji = 0; obji < renderObjects.length; obji++) {
            const RenObject = renderObjects[obji];

            //Call appropriate Function for object
            switch (RenObject.ObjType){
                case "Rect":
                    cntx.fillRect(RenObject.posX, RenObject.posY, RenObject.SizeX, RenObject.SizeY);
                case "Line":
                    cntx.moveTo(RenObject.posX, RenObject.posY);
                    cntx.lineTo(RenObject.PointsToX, RenObject.PointsToY);
                    cntx.stroke();
                
            }


        }
        if(debug){
            const ctx = canvas.getContext("2d");
            cntx.font = "20px Arial";

            for (let msgnum = 0; msgnum < debugmessages.length; msgnum++) {
                const Message = debugmessages[msgnum];
                cntx.fillText(Message,10,20*(msgnum+1));
                debugmessages.splice(msgnum, 1); //remove debug message from array
            }
            

            
        }

    }
}
Testrect(x, y){
    const canvas = document.querySelector("canvas");
    if(canvas.getContext){
        
        

        ctx.fillRect(x-5, y-5, 10, 10);
        //ctx.clearRect(45, 45, 60, 60);
        //ctx.strokeRect(50, 50, 50, 50);
        


    }
}
Testline(x, y, dx, dy){
    const canvas = document.querySelector("canvas");
    if(canvas.getContext){
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x-dx, y-dy);
        ctx.stroke();
    }
    
}
}

class Scene{
constructor(){

}
initialise(){
    //Scatterpoints(100);
    //createarrows();
}
update(){

}

}



function Scatterpoints(Pointcount){
const canvas = document.querySelector("canvas");
if(canvas.getContext){
    for (let index = 0; index < Pointcount; index++) {
        //console.log();
        var canvcontext = canvas.getContext("2d");
        var camvwidth = canvcontext.canvas.width;
        var camvheight = canvcontext.canvas.width;
        //console.log("Canv "+camvwidth + " | " + camvwidth);
        var posxxx = Math.random()*camvwidth;
        var posyyy = Math.random()*camvheight;

        //console.log("Pos "+posxxx + " | " + posyyy);

        var Newobj = {
            ObjType: "Rect",
            Type: "Fill",
            posX: posxxx,
            posY: posyyy,
            SizeX: 5,
            SizeY: 5,
            name: "ScattrPoint"
        };
        renderObjects.push(Newobj);
        
        
    }
    //console.log(renderObjects);
}



}
function createarrows(){
for (let rendddd = 0; rendddd < renderObjects.length; rendddd++) {
    const Currobj = renderObjects[rendddd];
    //if arrow
    if(Currobj.name == "Arrow"){
        renderObjects.splice(rendddd, 1);
    }
}

for (let rendddd = 0; rendddd < renderObjects.length; rendddd++) {
    const Currobj = renderObjects[rendddd];


    //if scatter point
    if(Currobj.name == "ScattrPoint"){
        var Newobj = {
            ObjType: "Line",
            posX: Currobj.posX,
            posY: Currobj.posY,
            PointsToX: 0,
            PointsToY: 0,
            name: "Arrow"
        };
        renderObjects.push(Newobj);
    }

    //update arrows

}
}



//######################### Start
const Renderer = new Rendering();
const RendScene = new Scene();

//######################### Event Handleling
onload = (eh) => {
Renderer.Resizeupdate();

RendScene.initialise();
//set the framerate
setInterval(Renderer.Drawframe, renderupdates);
}
onresize = (event) => {
Renderer.Resizeupdate();
};
onmousemove = (evnt) => {
//console.log(evnt);

//console.log(evnt.clientX + " | "+ evnt.clientY);

//renderObjects.find(name=>"MouseRect");

for (let rendddd = 0; rendddd < renderObjects.length; rendddd++) {
    const Currobj = renderObjects[rendddd];
    //Remove mousepoint
    if(Currobj.name == "MouseRect"){
        renderObjects.splice(rendddd, 1);
    }
    //update arrows
    if(Currobj.name == "Arrow"){
        Currobj.PointsToX = evnt.clientX;
        Currobj.PointsToY = evnt.clientY;
        //override the obj.
        renderObjects[rendddd] = Currobj;
    }

}


//make mouserect
var Newobj = {
    ObjType: "Rect",
    Type: "Fill",
    posX: evnt.clientX-10,
    posY: evnt.clientY-10,
    SizeX: 20,
    SizeY: 20,
    name: "MouseRect"
};
//renderObjects.push(Newobj);

//console.log(renderObjects);

}
onclick = (clickevent) => {
console.log(clickevent);

}
onkeydown = (keydonwevent) => {
console.log(keydonwevent);
if(keydonwevent.code == "Space"){
    //console.log("Space");
    Scatterpoints(1);
}
if(keydonwevent.code == "Enter"){
    createarrows();
}
if(keydonwevent.code == "KeyO"){
    console.log(renderObjects);
    
}

}

function Draw(){
const canvas = document.querySelector("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      //ctx.fillStyle = colores.testred;
      //ctx.fillRect(10, 10, 50, 50);

      //ctx.fillStyle = colores.testblue;
      //ctx.fillRect(30, 30, 50, 50);
    }
}

//class Input

function gatherdata(){
    
}