
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
              <div class="row">
              <div class="col">
              <div class="cuscard">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <span style="padding-right: 20px;" class="card-text"><strong>Date:</strong> ${new Date(element.departure).toLocaleDateString()}</span>
                <span style="padding-right: 20px;" class="card-text"><strong>Departure:</strong> ${new Date(element.departure).toLocaleTimeString()}</span>
                <span style="padding-right: 20px;" class="card-text"><strong>Arrival:</strong> ${new Date(element.arrival).toLocaleTimeString()}</span>
                <span style="padding-right: 20px;" class="card-text"><strong>Seats available:</strong> ${element.capacity - element.seats_filled}</span>
                <a style="margin-bottom: 20px;" href="/book/?from=${element.source}&to=${element.destination}&date=${element.departure.substring(0,10)}&flight=${element.schedule_id}" class="btn btn-primary float-right">Book now</a>
              </div>
            </div>
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