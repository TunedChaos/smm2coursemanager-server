function loadPlaying(courseData) {
    var courseHTML = ''
    if(courseData === "null"){
        courseHTML = '<td colspan="100%">There are no courses currently being played.</td>'
    }else{
        var course = JSON.parse(courseData)
        courseHTML += ' <td>Current Course: ' + course.CourseID +'</td>'
        courseHTML += ' <td>Submitted by: ' + course.Submitter + '</td>'
    }
    document.getElementById('currentstatus').innerHTML = courseHTML
}

function loadNext(courseData) {
    var courseHTML = ''
    if(courseData === "null"){
        courseHTML = '<td colspan="100%">There are no unplayed courses in the list.</td>'
    }else{
        var course = JSON.parse(courseData)
        courseHTML += ' <td>Next Course: ' + course.CourseID +'</td>'
        courseHTML += ' <td>Submitted by: ' + course.Submitter + '</td>'
    }
    document.getElementById('nextstatus').innerHTML = courseHTML
}