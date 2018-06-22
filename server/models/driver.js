import Passenger from './passenger';

import Friend from './friend';

import { drivers } from '../data';

export default class Driver extends Passenger {
  constructor(
    email, name,
    phone, homeAddress,
    password, carModel,
    driverLicense, plateNumber, id = (drivers.length + 1),
  ) {
    super(email, name, phone, password);
    this.homeAddress = homeAddress;
    this.carModel = carModel;
    this.driverLicense = driverLicense;
    this.plateNumber = plateNumber;
    this.id = id;
  }


  // static methods
  static create({
    email, name,
    phone, homeAddress,
    password, carModel,
    driverLicense, plateNumber,
  }) {
    const driver = new Driver(
      email, name,
      phone, homeAddress,
      password, carModel,
      driverLicense, plateNumber,
    );

    drivers.push(driver);
    return driver;
  }

  static all() {
    return drivers;
  }

  // eslint-disable-next-line consistent-return
  static findOne({
    ...all
  }) {
    const allDrivers = Driver.all();
    for (let i = 0; i <= allDrivers.length; i += 1) {
      const driver = allDrivers[i];

      let found = driver;
      Object.keys(all).forEach((key) => {
        if (driver[key] === undefined || (driver[key] !== all[key])) {
          found = null;
        }
      });
      return found || false;
    }
  }

  // instance methods
  destroy() {
    // remove instance from data structure
    let delId;
    drivers.forEach((driver, index) => {
      if (this.id === driver.id) {
        delId = index;
      }
    });
    return delId === undefined
      ? false
      : drivers.splice(delId, 1);
  }

  addFriend({
    passengerId,
  }) {
    const driverId = this.id;
    return Friend.create({
      driverId, passengerId,
    });
  }

  removeFriend({
    passengerId,
  }) {
    const driverId = this.id;
    return Friend.unFriend({
      driverId, passengerId,
    });
  }

  isFriend({
    passengerId,
  }) {
    const driverId = this.id;
    return Friend.isFriend({
      driverId, passengerId,
    });
  }

  // getters
  get rideRequests() {
    return this;
  }

  get friends() {
    const driverId = this.id;
    return Friend.getFriends({
      driverId,
    });
  }
}


// drivers
// passengers
// ride-offers
// ride-requests
// friends

// drivers.hasMany(friends);
// drivers.hasMany(ride-offers);
// passengers.hasMany(ride-requests);
// passengers.hasMany(friends);

// ride-offers.belongsTo(drivers);
// ride-requests.belongsTo(passengers);
