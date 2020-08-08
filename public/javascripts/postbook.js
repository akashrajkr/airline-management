$(document).ready(function () {
    var fare = $('#fare').val();
    var seats = $('#seats').val();
    $("#paybody").html(seats*fare);
    $("#seats").change(function (event) {
        var seats = $(this).val();
        $('#fare').val(seats * fare);
        $("#paybody").html(seats*fare);
    })

    $("#bookform").submit(function (event) {
        event.preventDefault();
        searchPost();
    })
    
    function searchPost() {
        var formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            country: $("#country").val(),
            seats: $("#seats").val(),
            address: $("#address").val(),
            age: $("#age").val(),
            phone: $("#phone").val(),
            flightid : $("#flight").val(),
            passportid: $("#passport").val()
        }
        var url = window.location.href;
        console.log(url);
        console.log(formData);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: (url).split("?")[0] + "confirm",
            data: JSON.stringify(formData),
            dataType: 'json',

            success: function (result) {
                window.location.replace(window.location.href.split("?")[0] + 'transdetails/?id=' + result.insertId);
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }

})