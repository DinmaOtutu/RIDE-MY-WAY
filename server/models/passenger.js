import Friend from './friend';

import { passengers } from '../data';

export default class Passenger {
  constructor(
    email, name, phone,
    password, id = (passengers.length + 1),
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.password = password;
    this.id = id;
  }

  // static methods

  static create({
    email, name,
    phone, password,
  }) {
    if (Passenger.isUnique({ email })) {
      const passenger = new Passenger(
        email, name,
        phone, password,
      );

      passengers.push(passenger);
      return passenger;
    }

    return false;
  }

  // eslint-disable-next-line consistent-return
  static findOne({
    ...all
  }) {
    const allPas = Passenger.all();
    return allPas.find((passenger) => {
      let found = passenger;

      Object.keys(all).forEach((key) => {
        if (!passenger[key] || passenger[key] !== all[key]) {
          found = false;
        }
      });

      return found;
    });
  }

  static all() {
    return passengers;
  }

  static isUnique({ ...properties }) {
    if (Passenger.findOne(properties)) {
      return false;
    }
    return true;
  }

  // instance methods

  destroy() {
    // remove instance from data structure
    let delId;
    passengers.forEach((passenger, index) => {
      if (this.id === passenger.id) {
        delId = index;
      }
    });
    return delId === undefined
      ? false
      : passengers.splice(delId, 1);
  }

  addFriend({
    driverId,
  }) {
    const passengerId = this.id;
    return Friend.create({
      driverId, passengerId,
    });
  }

  removeFriend({
    driverId,
  }) {
    const passengerId = this.id;
    return Friend.unFriend({
      driverId, passengerId,
    });
  }

  isFriend({
    driverId,
  }) {
    const passengerId = this.id;
    return Friend.isFriend({
      driverId, passengerId,
    });
  }


  // getter
  get rideOffers() {
    return this;
  }

  // jwt roles: [ passenger, driver ]
  get friends() {
    const passengerId = this.id;
    return Friend.getFriends({
      passengerId,
    });
  }
}
