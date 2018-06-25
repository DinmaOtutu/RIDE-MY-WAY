import { passengers, drivers } from '../data';

import { friends } from '../data';

export default class Friend {
  constructor(passengerId, driverId) {
    this.passengerId = passengerId;
    this.driverId = driverId;
  }

  // static methods

  static create({ passengerId, driverId }) {
    try {
      const friendPair = new Friend(passengerId, driverId);
      if (Friend.isFriend(friendPair)) {
        throw new Error('Already friends!');
      }
      friends.push(friendPair);
    } catch (e) {
      return false;
    }

    return true;
  }

  static isFriend({ passengerId, driverId }) {
    const answer = friends.filter(friend =>
      passengerId === friend.passengerId && driverId === friend.driverId);
    return !!answer.length;
  }

  static unFriend({ passengerId, driverId }) {
    if (Friend.isFriend({ passengerId, driverId })) {
      let delId;
      friends.forEach((friendPair, index) => {
        if (friendPair.passengerId === passengerId && friendPair.driverId === driverId) {
          delId = index;
        }
      });
      friends.splice(delId, 1);
      return true;
    }
    return false;
  }

  static getFriends({ passengerId, driverId = null }) {
    const clearPassword = profiles =>
      profiles.map((profile) => {
        const copy = { ...profile };
        // remove password
        delete copy.password;
        return copy;
      });


    const allFriends = [];
    if (driverId && !passengerId) {
      friends.forEach((friend) => {
        if (friend.driverId) {
          allFriends.push(friend.passengerId);
        }
      });
      const sorted = passengers.filter(passenger => allFriends.includes(passenger.passengerId));
      return clearPassword(sorted);
    }
    friends.forEach((friend) => {
      if (friend.passengerId) {
        allFriends.push(friend.driverId);
      }
    });
    const sorted = drivers.filter(driver => allFriends.includes(driver.driverId));
    return clearPassword(sorted);
  }
}
