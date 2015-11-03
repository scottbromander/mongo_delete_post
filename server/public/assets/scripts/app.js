$(document).ready(function(){
   $("#search").submit(function(event){
      event.preventDefault();
      var values = {};

      $.each($(this).serializeArray(), function(i, field){
         values[field.name] = field.value;
      });

      getData(values);
   });

   $("#addSomeone").submit(addSomeone);
   $("#peopleContainer").on('click', '.delete', deletePerson);

   getData();
});

function getData(values){
   $.ajax({
      type: "GET",
      url: "/data",
      data: values,
      success: function(data){
         updateDOM(data);
      }
   })
}

function addSomeone(){
   event.preventDefault();
   var values = {};

   $.each($(this).serializeArray(), function(i, field){
      values[field.name] = field.value;
   });

   $.ajax({
      type: "POST",
      url: "/data",
      data: values,
      success: function(data){
         getData();
      }
   });
}

function deletePerson(){
   var deletedId = {"id" : $(this).data("id")};

   console.log("Meaningful Log: ", deletedId);

   $.ajax({
      type: "DELETE",
      url: "/data",
      data: deletedId,
      success: function(data){

         getData();
      }
   })
}

function updateDOM(data){
   $("#peopleContainer").empty();

   for(var i = 0; i < data.length; i++){
      var el = "<div class='well col-md-3'>" +
                  "<p>" + data[i].name + "</p>" +
                  "<p>" + data[i].location + "</p>" +
                  "<button class='delete btn btn-danger' data-id='" +
                     data[i]._id + "'>Delete</button>" +
               "</div>";

      $("#peopleContainer").append(el);
   }
}
