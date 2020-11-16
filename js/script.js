$(document).ready(function () {
    $(".nav-link").click(showTab);
    $("#order input").change(updateTotal);
    $("#review-link").click(reviewOrder);

    /*Updates total on order page whenever an input is changed*/
    function updateTotal() {
        var costSize = parseInt($("#pizza-size input[type='radio']:checked").val());
        var meatsChecked = $("#pizza-meat input[type='checkbox']:checked").length;
        var costMeat = meatsChecked * 1.50;
        var veggiesChecked = $("#pizza-veggies input[type='checkbox']:checked").length;
        var currentTotal = costSize + costMeat + veggiesChecked;
        $(".total-number").text("$" + currentTotal.toFixed(2));
        /*currentTotal is returned to use for calculateTotal function*/
        return currentTotal;
    }

    /*Fills in review tab when clicked*/
    function reviewOrder() {
        $("#name-review").text($("#info-name").val());
        $("#address-review").text($("#info-address").val());
        $("#phone-review").text($("#info-phone").val());

        $("#size-review").text($("input[name='size']:checked").data("size"));
        $("#crust-review").text($("input[name='crust']:checked").data("crust"));

        var listOfMeats = "";
        var meatsChecked = $("#pizza-meat input[type='checkbox']:checked");
        meatsChecked.each(function() {
            listOfMeats += $(this).data("meat") + ", ";
        });
        $("#meat-review").text(listOfMeats);

        var listOfVeggies = "";
        var veggiesChecked = $("#pizza-veggies input[type='checkbox']:checked");
        veggiesChecked.each(function() {
            listOfVeggies += $(this).data("veggies") + ", ";
        });
        $("#veggies-review").text(listOfVeggies);

        calculateTotal();
    }

    /*Calculates and fills in all totals in review tab*/
    function calculateTotal() {
        var subtotal = updateTotal();
        var tax = subtotal * .051;
        var deliveryFee = 2;
        var grandTotal = subtotal + tax + deliveryFee;

        $("#subtotal-review").text("$" + subtotal.toFixed(2));
        $("#tax-review").text("$" + tax.toFixed(2));
        $("#fee-review").text("$" + deliveryFee.toFixed(2));
        $("#total-review").text("$" + grandTotal.toFixed(2));
    }

    /*Bootstrap tab functionality*/
    function showTab(event) {
        event.preventDefault();
        $(this).tab("show");
    }
});