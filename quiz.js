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
     var question = $.trim($("#question").val());
     var answer1 = $.trim($("#answer1").val());
     var answer2 = $.trim($("#answer2").val());
     var answer3 = $.trim($("#answer3").val());
     var answer4 = $.trim($("#answer4").val());
     var true_answer = $.trim($("#true-answer").val());
     var tag = $.trim($("#tag").val());
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
             $('#question').removeClass('success');
             $('#answer1').removeClass('success');
             $('#answer2').removeClass('success');
             $('#answer3').removeClass('success');
             $('#answer4').removeClass('success');
             $('#true-answer').removeClass('success');
             $('#tag').removeClass('success');
             $('#level').removeClass('success');
             InsertData(question,answer1,answer2,answer3,answer4,true_answer,tag,level);
             $(".q-success").fadeIn("slow", function() {
                 $(this).delay(2000).fadeOut('slow');
             });
     }else{
         alert('Бүх талбарыг бөглөнө үү ???')
     }
  });

  //Update Data

   function UpdateData(id,question,answer1,answer2,answer3,answer4,true_answer,tag,level) {
             // A post entry.
            var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
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
                date: date,
             };
             var personRef = firebase.database().ref().child("quiz").child(id);

             personRef.once('value', function (snapshot) {

                 if (snapshot.val() === null) {
                     /* does not exist */
                     alert('does not exist');
                 } else {
                     personRef.update(Data);
                 }

             });
   }
  $('.q-update').click(function(){
         var id = $.trim($("#id").val());
         var question = $.trim($("#question").val());
         var answer1 = $.trim($("#answer1").val());
         var answer2 = $.trim($("#answer2").val());
         var answer3 = $.trim($("#answer3").val());
         var answer4 = $.trim($("#answer4").val());
         var true_answer = $.trim($("#true-answer").val());
         var tag = $.trim($("#tag").val());
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
             $('#question').removeClass('success');
             $('#answer1').removeClass('success');
             $('#answer2').removeClass('success');
             $('#answer3').removeClass('success');
             $('#answer4').removeClass('success');
             $('#true-answer').removeClass('success');
             $('#tag').removeClass('success');
             $('#level').removeClass('success');
             UpdateData(id,question,answer1,answer2,answer3,answer4,true_answer,tag,level);
             $(".q-success>span").text('Амжилттай засагдлаа');
             $(".q-success").fadeIn("slow", function() {
                 $(this).delay(2000).fadeOut('slow');
             });
            $('.q-update').css('display','none');
            $('.q-btn').css('display','block');
        }else{
         alert('Бүх талбарыг бөглөнө үү ???')
     }
  });
  //Insert data
  function InsertData(question,answer1,answer2,answer3,answer4,true_answer,tag,level){
      var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
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
         date: date,
     };
     var newPostKey = firebase.database().ref().child('quiz').push().key;
     var updates = {};
     updates['/quiz/' + newPostKey] = Data;
     return firebase.database().ref().update(updates);
  }

  //Read data

  function ReadData(){
     var ref = firebase.database().ref().child("quiz");
     ref.orderByChild('date').on("value", function (snapshot) {
         $('#all').empty();
         var count = 0;
         snapshot.forEach(function (childSnapshot) {
             count += 1;
             // key will be "ada" the first time and "alan" the second time
             var key = childSnapshot.key;
             // childData will be the actual contents of the child
             var childData = childSnapshot.val();
             var li = '<li class="flex wrap">'
                         + '<span class="q-data-title">Асуулт'+ count +'</span>' 
                         + '<a href="#" onClick="DeleteData(`'+key+'`)"><i class="fa fa-times" aria-hidden="true"></i></a>' 
                         + '<a href="#" onClick="EditData(`'+key+'`)"><i class="fa fa-pencil" aria-hidden="true"></i></a>' + 
                      '</li>';
             $('#all').append(li);
        });
        // console.log(snapshot.val().length);
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
        $('.q-btn').css('display','none');
        $('.q-update').css('display','block').css('position','relative').css('bottom','20px');
        FindData(quizId);
    }
    function FindData(quizId) {
        firebase.database().ref('/quiz/' + quizId).once('value').then(function (snapshot) {
            if (snapshot.val() === null) {
                /* does not exist */
             alert('Андаа ийм юм алгаа!!!');
            } else {
                                document.getElementById("id").value = snapshot.key;
                                document.getElementById("question").value = snapshot.val().Question;
                                document.getElementById("answer1").value = snapshot.val().Chooses[0];
                                document.getElementById("answer2").value = snapshot.val().Chooses[1];
                                document.getElementById("answer3").value = snapshot.val().Chooses[2];
                                document.getElementById("answer4").value = snapshot.val().Chooses[3];
                                document.getElementById("true-answer").value = snapshot.val().Answer;
                                document.getElementById("tag").value = snapshot.val().tag;
                                document.getElementById("level").value = snapshot.val().level;
            }
        });
    }

    $('#question').keyup(function() {
        var data = $('#question').val();
        if(data.length == 0){
            $('#question').removeClass('success');
            $('#question').addClass('error');
        }else{
            $('#question').removeClass('error');
            $('#question').addClass('success');
        }
    });
    $('#answer1').keyup(function() {
        var data = $('#answer1').val();
        if(data.length == 0){
            $('#answer1').removeClass('success');
            $('#answer1').addClass('error');
        }else{
            $('#answer1').removeClass('error');
            $('#answer1').addClass('success');
        }
    });
    $('#answer2').keyup(function() {
        var data = $('#answer2').val();
        if(data.length == 0){
            $('#answer2').removeClass('success');
            $('#answer2').addClass('error');
        }else{
            $('#answer2').removeClass('error');
            $('#answer2').addClass('success');
        }
    });
    $('#answer3').keyup(function() {
        var data = $('#answer3').val();
        if(data.length == 0){
            $('#answer3').removeClass('success');
            $('#answer3').addClass('error');
        }else{
            $('#answer3').removeClass('error');
            $('#answer3').addClass('success');
        }
    });
    $('#answer4').keyup(function() {
        var data = $('#answer4').val();
        if(data.length == 0){
            $('#answer4').removeClass('success');
            $('#answer4').addClass('error');
        }else{
            $('#answer4').removeClass('error');
            $('#answer4').addClass('success');
        }
    });
    $('#true-answer').keyup(function() {
        var data = $('#true-answer').val();
        if(data.length == 0){
            $('#true-answer').removeClass('success');
            $('#true-answer').addClass('error');
        }else{
            $('#true-answer').removeClass('error');
            $('#true-answer').addClass('success');
        }
    });
    $("#true-answer").keypress(function(event) {
    return /\d/.test(String.fromCharCode(event.keyCode));
    });
    $('#tag').keyup(function() {
        var data = $('#tag').val();
        if(data.length == 0){
            $('#tag').removeClass('success');
            $('#tag').addClass('error');
        }else{
            $('#tag').removeClass('error');
            $('#tag').addClass('success');
        }
    });
    $('#level').keyup(function() {
        var data = $('#level').val();
        if(data.length == 0){
            $('#level').removeClass('success');
            $('#level').addClass('error');
        }else{
            $('#level').removeClass('error');
            $('#level').addClass('success');
        }
    });
    

