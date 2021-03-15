var Items = [];
//console.log("Start");
function Stock() {
  let self = this;
  let stockID;
  let stockWrapper,
    stockDataWrapper,
    stockBonusDataWrapper,
    stockGraphCanvas,
    stockYAxisWrapper;
  let priceMin,
    priceMax,
    priceOpening,
    priceStonks,
    priceCurrent,
    priceCurrentPercentage,
    priceCurrentDifference,
    pricePreviousClose;
  let priceMinComp,
    priceMaxComp,
    priceOpeningComp,
    priceStonksComp,
    priceCurrentComp,
    pricePreviousCloseComp;
  let pixelHeightPreviousClose, pixelHeightOpening, pixelHeightCurrent;

  this.priceArray = [];
  this.startSimulation = function (arg) {
    self.stockID = arg;
    self.getStockComponents();
    self.drawGraph();
  };

  this.getStockComponents = function () {
    self.stockWrapper = document.getElementById("item_" + self.stockID);
    self.stockDataWrapper = self.stockWrapper.children[1];
    self.stockYAxisWrapper = self.stockWrapper.children[2].children[0];
    self.stockGraphCanvas =
      self.stockWrapper.children[2].children[1].children[0];
    self.stockBonusDataWrapper = self.stockWrapper.children[3].children[1];
    self.priceStonksComp = self.stockDataWrapper.children[1].children[3].children[0];
    self.priceCurrentComp = self.stockDataWrapper.children[1].children[1].children[0];
    self.priceOpeningComp =
      self.stockBonusDataWrapper.children[0].children[1].children[0];
    self.priceMaxComp =
      self.stockBonusDataWrapper.children[1].children[1].children[0];
    self.priceMinComp =
      self.stockBonusDataWrapper.children[1].children[1].children[1];
    self.pricePreviousCloseComp =
      self.stockBonusDataWrapper.children[0].children[1].children[1];
  };
  this.stockPrediction = function () {
    ctx.closePath();
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(58.5, self.stockGraphCanvas.height);
    ctx.lineTo(self.stockGraphCanvas.width, self.stockGraphCanvas.height);
    ctx.stroke();
    ctx.closePath();
  }

  this.drawGraph = function (id) {
    let ctx = self.stockGraphCanvas.getContext("2d");
    let startValue, endValue, diff;
    diff = 25;
    ctx.lineWidth = 8;
    ctx.strokeStyle = "grey";
    ctx.setLineDash([2, 117]);
    ctx.beginPath();
    ctx.moveTo(58.5, self.stockGraphCanvas.height);
    ctx.lineTo(self.stockGraphCanvas.width, self.stockGraphCanvas.height);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, 38);
    ctx.lineTo(self.stockGraphCanvas.width, 38);
    ctx.moveTo(0, 76);
    ctx.lineTo(self.stockGraphCanvas.width, 76);
    ctx.moveTo(0, 114);
    ctx.lineTo(self.stockGraphCanvas.width, 114);
    ctx.moveTo(0, 152);
    ctx.lineTo(self.stockGraphCanvas.width, 152);
    ctx.stroke();
    ctx.closePath();

    startValue = Math.floor(Math.random() * 100) * 10;
    endValue = startValue + diff;
    self.pricePreviousClose =
      Math.round(
        (Math.random() * (endValue - 5 - (startValue + 10)) +
          (startValue + 10) +
          Number.EPSILON) *
          100
      ) / 100;
    for (let i = 0; i < 5; i++) {
      self.stockYAxisWrapper.children[i].innerHTML = endValue - i * 5;
    }

    self.pixelHeightPreviousClose =
      (190 * ((diff - (endValue+5 - (self.pricePreviousClose))) * 100)) /
      (diff * 100);
    // console.log(endValue," ",startValue)
    // console.log(self.pricePreviousClose, " ", self.pixelHeightPreviousClose);

    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 6]);
    ctx.beginPath();
    ctx.moveTo(0, 190 - self.pixelHeightPreviousClose);
    ctx.lineTo(
      self.stockGraphCanvas.width,
      190 - self.pixelHeightPreviousClose
    );
    ctx.stroke();
    ctx.closePath();

    self.pricePreviousCloseComp.innerHTML = self.pricePreviousClose;
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    let val = Math.floor(Math.random() * 10),
      x = 0;

    self.priceOpening =
      Math.round(
        (Math.random() * (endValue - 5 - (startValue + 5)) +
          (startValue + 5) +
          Number.EPSILON) *
          100
      ) / 100;

    self.pixelHeightOpening =
      (190 * ((diff - (endValue - (self.priceOpening - 5))) * 100)) /
      (diff * 100);
    self.pixelHeightCurrent = self.pixelHeightOpening;

    self.priceOpeningComp.innerHTML = self.priceOpening;

    self.priceMin = self.priceOpening;
    self.priceMax = self.priceOpening;
    ctx.beginPath();
    var interval = setInterval(function () {
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, 190 - self.pixelHeightCurrent);
      x += 6;
      if (self.pixelHeightCurrent > 152) {
        //console.log("BONK")
        if(self.pixelHeightCurrent > 180){
          self.pixelHeightCurrent =
          self.pixelHeightCurrent + Math.floor(Math.random() * 30) - 28;
        }
        else{
          self.pixelHeightCurrent =
          self.pixelHeightCurrent + Math.floor(Math.random() * 30) - 18;
        }
      } else if (self.pixelHeightCurrent < 38) {
        //console.log("MOON")
        if(self.pixelHeightCurrent < 10){
          self.pixelHeightCurrent =
          self.pixelHeightCurrent + Math.floor(Math.random() * 30) - 2;
        }
        else{
          self.pixelHeightCurrent =
          self.pixelHeightCurrent + Math.floor(Math.random() * 30) - 12;
        }
      } else {
        //console.log("STONKS")
        self.pixelHeightCurrent =
          self.pixelHeightCurrent + Math.floor(Math.random() * 35) - 18;
      }

      self.priceCurrentDifference =
        Math.round(
          ((self.pixelHeightCurrent - self.pixelHeightPreviousClose) / 7.6 + Number.EPSILON) * 100
        ) / 100;

          if(x <= self.stockGraphCanvas.width - 58.5){

            if (self.priceCurrentDifference > 0) {
              self.priceStonksComp.style.color = "green";
              ctx.strokeStyle = "green";
            } else if (self.priceCurrentDifference < 0) {
              self.priceStonksComp.style.color = "red";
              ctx.strokeStyle = "red";
            } else {
              self.priceStonksComp.style.color = "black";
              ctx.strokeStyle = "green";
            }
          } 
          else ctx.strokeStyle = "grey";
            
      ctx.lineTo(x, 190 - self.pixelHeightCurrent);
      ctx.stroke();

      self.priceCurrentPercentage =
        Math.round(
          ((self.priceCurrentDifference * 100) / 95 + Number.EPSILON) * 100
        ) / 100;
      self.priceCurrent =
        Math.round(
          (startValue + 5 + self.pixelHeightCurrent / 7.6 + Number.EPSILON) *
            100
        ) / 100;
      //console.log(self.pixelHeightCurrent, " ", self.priceCurrent);
      self.priceArray.push(self.priceCurrent);
      
      //console.log(self.priceArray);
      
      for (let j = 0; j < self.priceArray.length; j++) {
        if (self.priceArray[j] < self.priceMin)
        self.priceMin = self.priceArray[j];
        if (self.priceArray[j] > self.priceMax)
        self.priceMax = self.priceArray[j];
      }
      
      if(x <= self.stockGraphCanvas.width - 58.5){
        self.priceStonksComp.innerHTML =
        self.priceCurrentDifference + " (" + self.priceCurrentPercentage + "%)";
        self.priceMaxComp.innerHTML = self.priceMax;
        self.priceMinComp.innerHTML = self.priceMin;
        self.priceCurrentComp.innerHTML = self.priceCurrent;
      }

     
      if (x >= self.stockGraphCanvas.width - 58.5){
        //ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(x, 190 - self.pixelHeightCurrent)
      }
      if (x >= self.stockGraphCanvas.width) clearInterval(interval);
  
    },500);

    ctx.closePath();
  };
}
