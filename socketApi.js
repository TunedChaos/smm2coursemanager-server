var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var models = require('./models');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/.env')})

socketApi.io = io;

io.on('connection', function(socket){
    // build response object
    var responseObj = {
        success: 0,
        message: null,

    }

    socket.emit('connectSuccess', "Connection to server successful.");

    /**
     * Get the status of a specific course
     * @param personName the person requesting the status
     * @param courseCode the course code to get the status of
     * 
     * @emit  status_course A personalized string message for the requester.
     */
    socket.on('course_status', function(personName, courseCode){
        var courseRegex = /[a-hj-np-y\d]{3}( |-)[a-hj-np-y\d]{3}( |-)[a-hj-np-y\d]{3}/gi;
        if(courseCode.match(courseRegex) === null)
        {
            socket.emit('status_course', "Invalid Course ID " + courseCode + " submitted.")
            socket.emit('refresh_course_list')
        }else{
            models.Course.findOne({ where: {CourseID: courseCode} })
            .then(course => {
                var statusString = " is unplayed"
                switch(course.Status){
                    case 0:
                        statusString = "is unplayed"
                        break
                    case 1:
                        statusString = "is being played"
                        break
                    case 2:
                        statusString = "has been played"
                        break
                    case 3:
                        statusString = "has been completed"
                        break
                }
                socket.emit('status_course', personName + ", the course " + courseCode + ", submitted by " + course.Submitter + " " + statusString + ".")
            })
            .catch(() =>{
                socket.emit('status_course', personName + ", the course " + courseCode + " hasn't been submitted yet.")
            })
        }
    })

    /**
     * Adds a course to the database
     * @param personName the name of the submitter
     * @param courseCode the Mario Maker 2 course or maker code
     * @param authCode   the authcode for confirming access to make changes
     * 
     * @emit  course_add a JSON string confirming or denying the change with messages,
     *                   including a personalized one for bots.
     */
    socket.on('add_course', function (personName, courseCode, authCode){
        responseObj.success = 0
        responseObj.Submitter = personName
        responseObj.CourseID = courseCode
        if(authCode !== process.env.AUTHCODE)
        {
            responseObj.message = "You do not have authorization to add courses."
            socket.emit('course_add', JSON.stringify(responseObj))
            socket.emit('refresh_course_list')
        }else{
            var courseRegex = /[a-hj-np-y\d]{3}( |-)[a-hj-np-y\d]{3}( |-)[a-hj-np-y\d]{3}/gi;
            if(courseCode.match(courseRegex) === null)
            {
                responseObj.message = "Invalid Course ID " + courseCode + " submitted."
                socket.emit('course_add', JSON.stringify(responseObj))
                socket.emit('refresh_course_list')
            }else{
                models.Course.findOne({where: {CourseID: courseCode} })
                .then(course => {
                    var statusString = "is unplayed"
                    switch(course.Status) {
                        case 0:
                            statusString = "is unplayed"
                            break
                        case 1:
                            statusString = "is being played"
                            break
                        case 2:
                            statusString = "has been played"
                            break
                        case 3:
                            statusString = "has been completed"
                            break
                    }
                    responseObj.message = "This course has already been submitted, please submit a different course."
                    responseObj.personalMessage = personName + ", this course has already been submitted by " + course.Submitter + ", and " + statusString + ", please submit a different course."
                    socket.emit('course_add', JSON.stringify(responseObj))
                })
                .catch(() => {
                    models.Course.create({
                        CourseID: courseCode,
                        Submitter: personName,
                        Status: 0
                    })
                    .then(() =>{
                        responseObj.success = 1
                        responseObj.message = "The course " + courseCode + " has been added to the queue of courses to play."
                        responseObj.personalMessage = personName + ", the course, " + courseCode + " has been added to the queue of courses to play."
                        socket.emit('course_add', JSON.stringify(responseObj))
                        socket.broadcast.emit('refresh_course_list')
                        socket.emit('refresh_course_list')
                    })
                    .catch(() => {
                        responseObj.success = 0
                        responseObj.message = "There was an error communicating with the database, please try again later."
                        responseObj.personalMessage = personName + ", there was an error communicating with the database, please try again later."
                        socket.emit('course_add', JSON.stringify(responseObj))
                    })
                })
            }
        }
    })

    /**
     * Removes a course from the database
     * @param courseCode     the Mario Maker 2 course or maker code
     * @param authCode       the authcode for confirming access to make changes
     * 
     * @emit  course_remove  a JSON string confirming or denying the change with messages
     */
    socket.on('remove_course', function (courseCode, authCode){
        responseObj.success = 0
        responseObj.CourseID = courseCode
        if(authCode !== process.env.AUTHCODE)
        {
            responseObj.success = 0
            responseObj.message = "You do not have authorization to remove courses."
            socket.emit('course_remove', JSON.stringify(responseObj))
            socket.emit('refresh_course_list')
        }else{
            models.Course.destroy({
                where: {
                    CourseID: courseCode
                }
            }).then(() => {
                responseObj.success = 1
                responseObj.message = "The course " + courseCode + " has been removed from the database."
                socket.emit('course_remove', JSON.stringify(responseObj))
                socket.broadcast.emit('refresh_course_list')
                socket.emit('refresh_course_list')
            }).catch(() => {
                responseObj.success = 0
                responseObj.message = "There was an error communicating with the database, please try again later."
                socket.emit('course_remove', JSON.stringify(responseObj))
            })
        }
    })

    /**
     * Updates a course in the database.
     * @param index         the index in the database of the course to update
     * @param courseCode    the courseCode to update
     * @param newSubmitter  the new submitter data to update into the course
     * @param newStatus     the new status to update into the course
     * @param authCode      the authcode for confirming access to make changes
     * 
     * @emit  course_update a JSON string with success, failure, and a message.
     */
    socket.on('update_course', function (index, courseCode, newSubmitter, newStatus, authCode){
        responseObj.success = 0
        responseObj.CourseID = courseCode
        responseObj.Submitter = newSubmitter
        responseObj.Status = newStatus
        if(authCode !== process.env.AUTHCODE)
        {
            responseObj.message = "You do not have authorization to update courses."
            socket.emit('course_update', JSON.stringify(responseObj))
        }else{
            var courseRegex = /^[a-hj-np-y\d]{3}( |-)[a-hj-np-y\d]{3}( |-)[a-hj-np-y\d]{3}$/gi;
            if(courseCode.match(courseRegex) === null)
            {
                responseObj.message = "Invalid Course ID " + courseCode + " submitted."
                socket.emit('course_update', JSON.stringify(responseObj))
            }else{
                models.Course.findOne({ where: { id: index }})
                .then(course => {
                    course.update({
                        CourseID: courseCode,
                        Submitter: newSubmitter,
                        Status: newStatus
                    }).then(() => {
                        responseObj.success = 1
                        var statusString = "Unplayed"
                        switch(newStatus){
                        case 0:
                            statusString = "Unplayed"
                            break
                        case 1:
                            statusString = "Playing"
                            break
                        case 2:
                            statusString = "Played"
                            break
                        case 3:
                            statusString = "Completed"
                            break
                        }
                        responseObj.message = "The course " + courseCode + " has been updated."
                        socket.emit('course_update', JSON.stringify(responseObj))
                        socket.broadcast.emit('refresh_course_list')
                    })
                })
            }
        }
    })

    /**
     * Changes the status of a course
     * @param courseCode    the Mario Maker 2 Course or Maker Code
     * @param newStatus     the new status to set
     * @param authCode      the authcode for confirming access
     * 
     * @emit  status_change a JSON string with success/failure, and a message
     */
    socket.on('change_status', function(courseCode, newStatus, authCode) {
        responseObj.success = 0
        if(authCode !== process.env.AUTHCODE)
        {
            responseObj.message = "You do not have authorization to update the status."
            socket.emit('status_change', JSON.stringify(responseObj))
            socket.emit('refresh_course_list')
        }else{
            models.Course.findOne({where: {CourseID: courseCode}})
            .then(course => {
                course.update({
                    Status: newStatus
                })
                .then(() => {
                    responseObj.success = 1
                    var statusString = "Unplayed"
                    switch(newStatus){
                    case 0:
                        statusString = "Unplayed"
                        break
                    case 1:
                        statusString = "Playing"
                        break
                    case 2:
                        statusString = "Played"
                        break
                    case 3:
                        statusString = "Completed"
                        break
                    }
                    responseObj.message = "The status for course " + course.CourseID + " has been changed to " + statusString + "."
                    socket.emit('status_change', JSON.stringify(responseObj))
                    socket.broadcast.emit('refresh_course_list')
                })
                .catch(() => {
                    responseObj.success = 0
                    responseObj.message = "There was an error communicating with the database, please try again later."
                })
            })
        }
    })

    socket.on('currently_playing', function (){
        models.Course.findOne({ where: { Status: 1 }})
        .then (course => {
            socket.emit('playing_currently', JSON.stringify(course))
        })
        .catch(() => {
            socket.emit('playing_currently', null)
        })
    })

    socket.on('list_courses', function () {
        models.Course.findAll().then(function(courses){
            socket.emit('course_list', JSON.stringify(courses))
        })
    })

    socket.on('next_course', function(){
        models.Course.findOne({ where: {Status: 0} })
        .then(course => {
            socket.emit('course_next', JSON.stringify(course))
        })
        .catch(() => {
            socket.emit('course_next', null)
        })

    })
});

module.exports = socketApi;