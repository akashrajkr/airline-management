$(document).ready(function () {
    $("#searchpnr").submit(function (event) {
        event.preventDefault();
        searchPost();
    })

    function searchPost() {
        var formData = {
            transid: $("#pnr").val()
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
                
              /*  result = JSON.parse(JSON.stringify(result));
                console.log("result = " + result.length);
                console.log(typeof(result))*/
                
                if (result ) {
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
                                    <input type="text" class="form-control" value="${result.transid}" readonly>
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
                        </div>
                    </div>`;
                } else {
                    html = `<div class="alert alert-danger" role="alert">
                                Incorrect transaction id
                            </div>`
                }
                $("#search-form").html(html);

                console.log(JSON.stringify(result));
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
    }
})