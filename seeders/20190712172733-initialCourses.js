'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Courses', [
    {id: 1, CourseID: 'J68-5M4-D1G', Submitter: 'RPC543', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:16:15'},
    {id: 2, CourseID: '3SD-M8V-WCG', Submitter: 'elliotzgamer', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-09 20:08:33'},
    {id: 3, CourseID: '42R-JPG-FJG', Submitter: 'PumpkinLight82', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '0000-00-00 00:00:00'},
    {id: 4, CourseID: 'VFM-SQM-9PF', Submitter: 'scaleb53', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '0000-00-00 00:00:00'},
    {id: 5, CourseID: 'V1H-T23-V56', Submitter: 'lunamoonchilde', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-09 20:24:24'},
    {id: 6, CourseID: 'DSS-BGK-CVF', Submitter: 'stixjellyfish246', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '0000-00-00 00:00:00'},
    {id: 7, CourseID: 'J81-722-CNG', Submitter: 'puntmutsen', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '0000-00-00 00:00:00'},
    {id: 8, CourseID: '510-KCW-4VF', Submitter: 'iknowfunn', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:24:13'},
    {id: 9, CourseID: '6RH-WW1-17G', Submitter: 'ComparedMage335', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:25:15'},
    {id: 10, CourseID: 'BF3-8C3-92G', Submitter: 'sunshadow24', Status: 0, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:49:19'},
    {id: 11, CourseID: '06G-4GS-HDG', Submitter: 'piggyman267', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:29:56'},
    {id: 12, CourseID: '97V-15F-QRF', Submitter: 'lunamoonchilde', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:30:04'},
    {id: 13, CourseID: 'Y3K-8HJ-GQG', Submitter: 'stixjellyfish246', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:33:50'},
    {id: 14, CourseID: 'QMK-7HC-0FG', Submitter: 'mightyjopro', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:48:59'},
    {id: 15, CourseID: 'C8G-1GP-QDG', Submitter: 'nickgrisanti', Status: 2, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 00:58:48'},
    {id: 16, CourseID: 'P7H-WVD-JDG', Submitter: 'CCheukKa', Status: 2, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 01:13:05'},
    {id: 17, CourseID: 'DD0-5X7-FFF', Submitter: 'OakToaster20555', Status: 3, createdAt: '0000-00-00 00:00:00', updatedAt: '2019-07-11 01:13:07'},
    {id: 18, CourseID: 'KFW-K9K-8RF', Submitter: 'findus_the_fat', Status: 3, createdAt: '2019-07-11 00:22:41', updatedAt: '2019-07-11 01:17:13'},
    {id: 19, CourseID: '69G-6Y2-34G', Submitter: 'lunamoonchilde', Status: 3, createdAt: '2019-07-11 00:22:47', updatedAt: '2019-07-11 01:21:51'},
    {id: 20, CourseID: '2M6-F67-SMF', Submitter: 'stixjellyfish246', Status: 3, createdAt: '2019-07-11 00:26:13', updatedAt: '2019-07-11 01:30:22'},
    {id: 21, CourseID: '8J5-XK8-FKG', Submitter: 'lunamoonchilde', Status: 3, createdAt: '2019-07-11 00:27:44', updatedAt: '2019-07-11 01:33:31'},
    {id: 22, CourseID: 'R0P-LF8-0HF', Submitter: 'CCheukKa', Status: 2, createdAt: '2019-07-11 00:29:50', updatedAt: '2019-07-11 01:44:50'},
    {id: 23, CourseID: 'BT7-M91-0PG', Submitter: 'Mobzillaface', Status: 3, createdAt: '2019-07-11 00:34:26', updatedAt: '2019-07-11 01:55:02'},
    {id: 24, CourseID: 'YM1-J35-8MG', Submitter: 'CCheukKa', Status: 1, createdAt: '2019-07-11 01:10:42', updatedAt: '2019-07-11 01:55:47'},
    {id: 25, CourseID: 'SQL-9NJ-GYG', Submitter: '4Ley', Status: 0, createdAt: '2019-07-11 01:13:45', updatedAt: '2019-07-11 01:13:45'},
    {id: 26, CourseID: '69G-6Y2-346', Submitter: 'CursedBM81', Status: 0, createdAt: '2019-07-11 01:36:48', updatedAt: '2019-07-11 01:36:48'},
    {id: 27, CourseID: '23S-8R6-PNF', Submitter: 'FlyingMongoose', Status: 0, createdAt: '2019-07-11 02:01:16', updatedAt: '2019-07-11 02:01:16'}
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Course', null, {});
  }
};
