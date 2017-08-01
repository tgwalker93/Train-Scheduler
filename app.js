  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyArExV3Eh1Rmrur1fz9RMi0Lx98B-fULpc",
      authDomain: "trainscheduler-a53d6.firebaseapp.com",
      databaseURL: "https://trainscheduler-a53d6.firebaseio.com",
      projectId: "trainscheduler-a53d6",
      storageBucket: "",
      messagingSenderId: "51232932883"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  var name = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";
  var nextArrival= "";
  var minutesAway = "";

  // database.ref().push({
  //     name: name,
  //     role: role,
  //     startDate: startDate,
  //     monRate: monRate

  // })


  $("#submit-bid").on("click", function() {
      // Don't refresh the pstartDate!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      name = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#firstTrainTime").val().trim();
      frequency = $("#frequency").val().trim();
      // To calculate the months worked
      // var monthsWorked = moment().diff(moment.unix(startDate, "X"), "months");
      // console.log(monthsWorked);

      // totalBiled = 
      var currentTime = moment().format('LT');
      // Changed to hh:mm format. subtract a year to make sure it comes before current time.
      var trainTimePretty = moment(firstTrainTime, "hh:mm");

      // Difference between now and time of first train subtracting current time from first train time.
      var diffTime = moment().diff(moment(trainTimePretty), "minutes");

      // Time apart
      var remainderTime = diffTime % frequency;

      // Minutes until next train
      var trainMinutesAway = frequency - remainderTime;

      // Calculate next train time
      var trainNext = moment().add(trainMinutesAway, "minutes");

      var nextArrival = moment(trainNext).format("hh:mm a");


      console.log("Difference in time: " + diffTime);
      console.log("Remainder: " + remainderTime);
      console.log("Next arrival: " + moment(trainNext).format("hh:mm"));
        minutesAway = nextArrival;

      var firstTrainCurrentTimeDifference = moment(firstTrainTime).diff(moment(), "minutes");
      database.ref().push({
          name: name,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency,
          minutesAway: minutesAway,
          nextArrival: nextArrival
      });
      // total
      $('#myTable').append("<tr><td>" +
          name +
          "</td>" +
          "<td>" +
          destination +
          "</td><td>" +
          frequency +
          "</td><td>" +
          nextArrival +
          "</td><td>" +
          minutesAway +
          "</td></tr>");

  });


  $("#reset").on("click", function() {
      // Don't refresh the pstartDate!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      name = ""
      destination = ""
      firstTrainTime = ""
      frequency = ""

      // database.ref().push({
      // name: name,
      // role: role,
      // startDate: startDate,
      // monRate: monRate
      //  });

      // database.ref("inclassproject-d543c").remove();

  });
  // Firebase watcher + initial loader HINT: .on("value")


  // function addEmployee() {


  database.ref().on("child_added", function(snapshot) {

      // Log everything that's coming out of snapshot

      console.log(snapshot.val());

      console.log(snapshot.val().name);

      console.log(snapshot.val().destination);

      console.log(snapshot.val().firstTrainTime);

      console.log(snapshot.val().frequency);

      // Change the HTML to reflect

      name = snapshot.val().name;


      destination = snapshot.val().destination;

      startDate = snapshot.val().frequency;

      monthsWorked = snapshot.val().firstTrainTime;

      // monRate = snapshot.val().monRate;

      $("#currentEmployeeBody").append(
          "<div class='well'>" +
          " name : " + name +
          " destination : " + destination +
          " startDate : " + firstTrainTime +
          " monRate : " + frequency +
          "</div>"
      );



      // $("#name-display").html(snapshot.val().name);

      // $("#role-display").html(snapshot.val().role);

      // $("#startDate-display").html(snapshot.val().startDate);

      // $("#monthly-rate").html(snapshot.val().monRate);

      // Handle the errors

  }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

  });


  // }