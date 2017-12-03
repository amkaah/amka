  var config = {
    apiKey: "AIzaSyCPDhkG6IqI9O-txFPeStzf0TimrVTwg8g",
    authDomain: "tv-quiz.firebaseapp.com",
    databaseURL: "https://tv-quiz.firebaseio.com",
    projectId: "tv-quiz",
    storageBucket: "tv-quiz.appspot.com",
    messagingSenderId: "830577001738"
  };
  firebase.initializeApp(config);

  $('.q-btn').click(function(){
     var question = $("#question").val();
     var answer1 = $("#answer1").val();
     var answer2 = $("#answer2").val();
     var answer3 = $("#answer3").val();
     var answer4 = $("#answer4").val();
     var true_answer = $("#true-answer").val();
     var tag = $("#tag").val();
     var level = $("#level").val();
     if(question.length > 0 && answer1.length > 0 && answer2.length > 0 && answer3.length > 0 && answer4.length > 0 && true_answer.length > 0
     && tag.length > 0 && level.length > 0)
     {
             document.getElementById("question").value = "";
             document.getElementById("answer1").value = "";
             document.getElementById("answer2").value = "";
             document.getElementById("answer3").value = "";
             document.getElementById("answer4").value = "";
             document.getElementById("true-answer").value = "";
             document.getElementById("tag").value = "";
             document.getElementById("level").value = "";
             InsertData(question,answer1,answer2,answer3,answer4,true_answer,tag,level);
     }else{
         alert('Алдаа гарчлөө амьдралш дээ...')
     }
  });

  //Insert data
  function InsertData(question,answer1,answer2,answer3,answer4,true_answer,tag,level){
      var Data = {
        Question: question,
         Chooses: [
          answer1,
          answer2,
          answer3,
          answer4
         ],
         Answer: true_answer,
         tag: tag,
         level: level,
     };
     var newPostKey = firebase.database().ref().child('quiz').push().key;
     var updates = {};
     updates['/quiz/' + newPostKey] = Data;
     return firebase.database().ref().update(updates);
  }

  //Read data

  function ReadData(){
     var ref = firebase.database().ref().child("quiz");
     ref.on("value", function (snapshot) {
         $('#all').empty();
         snapshot.forEach(function (childSnapshot) {
             // key will be "ada" the first time and "alan" the second time
             var key = childSnapshot.key;
             // childData will be the actual contents of the child
             var childData = childSnapshot.val();
             var li = '<li class="flex wrap">'
                         + '<span class="q-data-title">'+childData.Question + '</span>' 
                         + '<a href="#" onClick="DeleteData(`'+key+'`)"><i class="fa fa-times" aria-hidden="true"></i></a>' 
                         + '<a href="#" onClick="EditData(`'+key+'`)"><i class="fa fa-pencil" aria-hidden="true"></i></a>' + 
                      '</li>';
             $('#all').append(li);
        });
        console.log(snapshot.val().length);
     }, function (error) {
         console.log("Error: " + error.code);
     });
  }

  //Delete Data

   function DeleteData(quizId) {
     var personRef = firebase.database().ref().child("quiz").child(quizId);
     personRef.once('value', function (snapshot) {

         if (snapshot.val() === null) {
             /* does not exist */
             alert('Андаа ийм юм алгаа!!!');
         } else {
             personRef.remove();
         }

     });
    }

    //Edit Data

    function EditData(quizId){
        FindData(quizId);
    }
    function FindData(quizId) {
        firebase.database().ref('/quiz/' + quizId).once('value').then(function (snapshot) {
            if (snapshot.val() === null) {
                /* does not exist */
             alert('Андаа ийм юм алгаа!!!');
            } else {
                                document.getElementById("question").value = snapshot.val().Question ;
                                document.getElementById("answer1").value = "";
                                document.getElementById("answer2").value = "";
                                document.getElementById("answer3").value = "";
                                document.getElementById("answer4").value = "";
                                document.getElementById("true-answer").value = "";
                                document.getElementById("tag").value = "";
                                document.getElementById("level").value = "";
            }
        });
    }

