const { Grid } = require('pathfinding');
const PF = require('pathfinding');
const {map} = require("./map"); 

var easystarjs = require('easystarjs');
var easystar = new easystarjs.js();
easystar.setGrid(map);
easystar.setAcceptableTiles([0]);

const grid = new PF.Grid(map); 
const finder = new PF.AStarFinder();


const v_tugger_max = 1.0; // m/s
const v_bmw_max = 2.0;
const convertConst = 0.05; /*multiplication constant to convert from number of "map tiles" to meters 
                            -> must still be changed to actual value -> five centimeters per occupancy block (pixel)*/
<<<<<<< HEAD
                         
=======
                          
>>>>>>> b38a01f8c868be8f98e6081e1fc4b2c6af50ecf0
let coordinates = 
{
    startY: 315,
    startX: 420,
    exchangeY: 315,
    exchangeX: 490,
    endY: 300,
    endX: 484,
    bmwY: 325,
    bmwX: 440,
    tuggerY: 330,
    tuggerX: 500
};

let foo = computeDistances(coordinates);

function computeDistances(coordinates){
    //compute Distances between each robot and start point and each robot and exchange point; next_step: retrieving distance estimation from robot as well -> more precise (Update: not possible)
    //Instead we will compute the distances using A* or Dijkstra; issue -> will only output path coordinates not distance (Distance computation can become costly)
   
    distances = {
        tugger_to_start: findDist(coordinates.tuggerX,coordinates.tuggerY, coordinates.startX, coordinates.startY) * convertConst, //multiply by constant for meters
        bmw_to_start: findDist(coordinates.bmwX,coordinates.bmwY, coordinates.startX, coordinates.startY) * convertConst,
        start_to_exchange: findDist(coordinates.startX,coordinates.startY, coordinates.exchangeX, coordinates.exchangeY) * convertConst,
        tugger_to_exchange: findDist(coordinates.tuggerX,coordinates.tuggerY, coordinates.exchangeX, coordinates.exchangeY) * convertConst,
        bmw_to_exchange: findDist(coordinates.bmwX,coordinates.bmwY, coordinates.exchangeX, coordinates.exchangeY) * convertConst,
        exchange_to_end: findDist(coordinates.exchangeX,coordinates.exchangeY, coordinates.endX, coordinates.endY) * convertConst

       };

       return distances;
}

   

 
 function timeEstimation(distances){
   //might need unit conversions
   times = {
   tugger_to_start:  distances.tugger_to_start / v_tugger_max, //in seconds
   bmw_to_start:  distances.bmw_to_start / v_bmw_max,
   start_tugger_to_exchange: distances.start_to_exchange / v_tugger_max, 
   start_bmw_to_exchange: distances.start_to_exchange / v_bmw_max,
   tugger_to_exchange:  distances.tugger_to_exchange / v_tugger_max,
   bmw_to_exchange: distances.bmw_to_exchange / v_bmw_max,
   exchange_tugger_to_end: distances.exchange_to_end / v_tugger_max,
   exchange_bmw_to_end: distances.exchange_to_end / v_bmw_max
   }
   return times;
 }
 function computeCosts(times){
   combination1 = times.tugger_to_start + times.start_tugger_to_exchange + times.bmw_to_exchange + times.exchange_bmw_to_end;
   combination2 = times.bmw_to_start + times.start_bmw_to_exchange + times.tugger_to_exchange + times.exchange_tugger_to_end;
   return [combination1, combination2];
 }
 
 function pickVehicle(costs){ //calculating the combinations (2!) of the system and picking the most effective one. Need to know if the vehicle velos are approx. equal
 
   if(costs[0] <= costs[1]){
     console.log("Tugger to pick up delivery from start"); //later on implement return of the time estimation for the process to complete
     return true;
      //returns a boolean -> true if tugger is going to start point, false if not (going to exchange directly)
   }else{
     console.log("BMW to pick up delivery from start");
     return false;
     //bmw goes to start first, tugger to exchange
   }
 }
 async function computationProcess(initialPos){
   let distances = computeDistances(initialPos);
   let times = timeEstimation(distances);
   let costs = computeCosts(times);
   let cache = {
     distances: distances,
     times: times
   }
 
   return [pickVehicle(costs),cache];
 }

function findDist(x1,y1,x2,y2){
    if(map[y1][x1] == 1 || map[y2][x2]==1){
        let a = finder.findPath(y1,x1,y2,x2,new PF.Grid(map)).length;
        console.log(a);
    }else{
      console.error("coordinates not accesssible")
    }
}


 
findDist(722,464,714,454);
 
 