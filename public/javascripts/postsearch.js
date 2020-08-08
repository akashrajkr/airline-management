
$( document ).ready(function(){
    fromfetch();

    function fromfetch(){
        $.ajax({
          type : "GET",
          url : window.location + "/api/fromfetch",
          success: function(result){
            $('#fromid').empty();
            console.log("Success: ", result);
            var html = '<option></option>';
            result.forEach(element => {
                html = html + `
                    <option value = ${element}>${element}</options>
                ` })
            $('#fromid').html(html);
          },
          error : function(e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
          }
    });

    
}
     $("#fromid").change(function(event){
        $( "#fromid option:selected" ).each(function() {
            console.log($( this ).text())
            var text = $( this ).text();
            $.ajax({
                type : "GET",
                url : window.location + "/api/tofetch/?from="+text,
                success: function(result){
                  console.log("Success: ", result);
                  var html = '';
                  result.forEach(element => {
                      html = html + `
                          <option value = ${element}>${element}</options>
                      ` })
                  $('#toid').html(html);
                },
                error : function(e) {
                  $("#getResultDiv").html("<strong>Error</strong>");
                  console.log("ERROR: ", e);
                }
     })
})
})
   $("#searchform").submit(function(event){
       event.preventDefault();
       searchPost();
   })

   function searchPost(){
    var formData = {
        from : $("#fromid").val(),
        to :  $("#toid").val(),
        date : $("#date").val()
      }
      console.log(formData);
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location + "/api/search",
      data : JSON.stringify(formData),
      dataType : 'json',

      success : function(result) {
          $('#search-results').empty();
        var html = '';
        if(result.length > 0){
          result.forEach(element => {
              html +=   `
              <div class="card" class="mb-2" style="width: 12rem;">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">Date: ${new Date(element.departure).toLocaleDateString()}</p>
                <p class="card-text">Departure: ${new Date(element.departure).toLocaleTimeString()}</p>
                <p class="card-text">Arrival: ${new Date(element.arrival).toLocaleTimeString()}</p>
                <p class="card-text">Seats available: ${element.capacity - element.seats_filled}</p>
                <a href="/book/?from=${element.source}&to=${element.destination}&date=${element.departure.substring(0,10)}&flight=${element.schedule_id}" class="btn btn-primary">Book now</a>
              </div>
            </div>
              `
          })
        } else {
            html = `<div class="alert alert-info" role="alert">
            Flights not found!
          </div>`
        }
        $("#search-results").html(html);
         
       console.log(JSON.stringify(result));
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
   }
})