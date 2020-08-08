$(document).ready(function () {
    $("#cancelticket").submit(function (event) {
        event.preventDefault();
        searchPost();
    })

    $("#confirmbtn").click(function () {
       // event.preventDefault();
        cancelticket();
    })

    function searchPost() {
        var formData = {
            transid: $("#cancel").val()
        }
        var url = window.location.href;
        console.log(formData);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: (url).split("?")[0] + "/search",
            data: JSON.stringify(formData),
            dataType: 'json',

            success: function (result) {
                $('#search-results').empty();
                var html = '';



                if (result) {
                    console.log(result);
                    html += `<div class="card">
                    <div class="card-body mt-2">
                        <h3 class="card-title">Your Ticket</h3>
                        <div class="row">
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Transaction ID</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.transid}" id="transid" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Name</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.name}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Age</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.age}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Email-Id</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.email}" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">From</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.airport}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">To</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.destination}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Departure</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.departure}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Arrival</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.arrival}" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Airplane</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.type}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Amount Paid</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.fare * result.seats_booked}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Seats</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.seats_booked}" readonly>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Date</span>
                                    </div>
                                    <input type="text" class="form-control" value="${result.date}" readonly>
                                </div>
                            </div>
                            
                        </div><div class="text-center mt-3">
                        <button onClick="cancelticket()" class="btn btn-danger" id="confirmbtn">Confirm Cancellation</button></div>
                    </div>`;
                } else {
                    html = `<div class="alert alert-danger" role="alert">
                                Incorrect transaction id, try again.
                            </div>`
                }
                $("#search-results").html(html);
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
})
function cancelticket() {
    var url = window.location + "/confirm/?id=" + document.getElementById('cancel').value;
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            console.log("Success: ", result);
            var html = '';
            if(result.affectedRows == 1)
            {
                html+=`
                <div class="alert alert-success" role="alert">
                     Ticket cancellation Successful!!
                     <a href="/" class="float-right">Back to Home</a>
                </div>
                `
            } 
            $("#alert").html(html);       
        },
        error: function (e) {
            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }

    })
}