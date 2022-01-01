function Vehicle() {}

function Car() {
  this.say = function () {
    console.log('I am a Car');
  };
}

function Bike() {
  this.say = function () {
    console.log('I am a Bike');
  };
}

function Train() {
  this.say = function () {
    console.log('I am a Train');
  };
}

function VehicleFactory() {
  this.createVehicle = function (vehicleType) {
    let vehicle;
    switch (vehicleType) {
      case 'car':
        vehicle = new Car();
        break;
      case 'Bike':
        vehicle = new Bike();
        break;
      case 'Train':
        vehicle = new Train();
        break;
      default:
        vehicle = new Vehicle();
    }

    return vehicle;
  };
}

const vehicleFactory = new VehicleFactory();

let car = vehicleFactory.createVehicle('car');

car.say();
