var aufgabe9;
(function (aufgabe9) {
    window.addEventListener("load", init);
    //Variablen
    let flavour;
    let flavours = ["Vanilla ", "Chocolate ", "Brownie ", "Strawberry ",
        "Berry Mix ", "Tiramisu ", "Mango ", "Cookies ",
        "Coffee ", "Walnut"];
    let inputflavour = [];
    let topping;
    let toppings = ["Whipped Cream ", "Chocolate Sauce ", "Strawberries "];
    let inputtopping = [];
    let container;
    let containers = ["Cone ", "Bowl "];
    let inputcontainer = [];
    let order;
    let creation;
    let creations;
    //Initialisierung
    function init() {
        flavour = document.getElementById("flavours");
        topping = document.getElementById("toppings");
        container = document.getElementById("containers");
        order = document.getElementById("order");
        creation = document.getElementById("send");
        icecreamKit();
        flavour.addEventListener("change", calculateOrder);
        topping.addEventListener("change", calculateOrder);
        container.addEventListener("change", calculateOrder);
        creation.addEventListener("click", orderInput);
    }
    //CHECK ORDER
    function orderInput() {
        let warning = ["Invalid Entry: \n"];
        let name = document.getElementById("name");
        let street = document.getElementById("street");
        let location = document.getElementById("location");
        let delivery = 0;
        let container = 0;
        let scoop = 0;
        //Fehlende Angaben - Kunde
        if (name.validity.valid == false)
            warning.push("Please enter your name \n");
        if (street.validity.valid == false)
            warning.push("Please enter your street \n");
        if (location.validity.valid == false)
            warning.push("Please enter your location \n");
        //Eiscreme
        for (let i = 0; i < inputflavour.length; i++) {
            if (parseInt(inputflavour[i].value) > 0)
                scoop += 1;
        }
        if (scoop == 0)
            warning.push("No ice cream selected\n");
        //Darbietung
        for (let i = 0; i < inputcontainer.length; i++) {
            if (inputcontainer[i].checked)
                container += 1;
        }
        if (container == 0)
            warning.push("No ice container selected\n");
        //Bestellung unvollständig
        if (warning.length > 1) {
            for (let i = 0; i < warning.length; i++)
                warning.push;
            alert(warning.join(""));
        }
        else {
            alert("Your order has been submitted\n");
        }
    }
    //Eiscreme Auswahl
    function icecreamKit() {
        for (let i = 0; i < flavours.length; i++) {
            createInput(flavours[i]);
        }
        for (let i = 0; i < toppings.length; i++) {
            createCheckbox(toppings[i]);
        }
        for (let i = 0; i < containers.length; i++) {
            createRadio(containers[i]);
        }
    }
    //Stepper
    function createInput(_sort) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _sort;
        input.type = "number";
        input.min = "0";
        input.value = "0";
        label.id = _sort;
        label.appendChild(input);
        flavour.appendChild(label);
        inputflavour.push(input);
    }
    //Checkboxes
    function createCheckbox(_topping) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        input.type = "checkbox";
        label.id = _topping;
        label.innerText = _topping;
        label.appendChild(input);
        topping.appendChild(label);
        inputtopping.push(input);
    }
    //Radio Buttons
    function createRadio(_darbietung) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "container";
        label.innerText = _darbietung;
        input.required = true;
        label.id = _darbietung;
        label.appendChild(input);
        container.appendChild(label);
        inputcontainer.push(input);
    }
    //Zusammenrechnen der Bestellung
    function calculateOrder() {
        let sum = 0;
        for (let i = 0; i < inputflavour.length; i++) {
            sum += parseInt(inputflavour[i].value);
        }
        for (let i = 0; i < inputtopping.length; i++) {
            if (inputtopping[i].checked)
                sum += .50;
        }
        showOrder(sum);
    }
    //Kreation + Bestellung des Kunden abfragen
    function showOrder(_sum) {
        creations = document.getElementById("creation");
        creations.innerText = "";
        for (let i = 0; i < inputflavour.length; i++) {
            if (parseInt(inputflavour[i].value) > 0) {
                creations.innerText += (parseInt(inputflavour[i].value)) + " scoop(s) of " + flavours[i] + " " + "\n";
            }
        }
        for (let i = 0; i < inputtopping.length; i++) {
            if (inputtopping[i].checked) {
                creations.innerText += toppings[i] + "\n";
            }
        }
        for (let i = 0; i < inputcontainer.length; i++) {
            if (inputcontainer[i].checked) {
                creations.innerText += containers[i] + "\n";
            }
        }
        let completeSum = document.getElementById("sum");
        completeSum.innerText = _sum.toString() + " €";
    }
})(aufgabe9 || (aufgabe9 = {}));
//# sourceMappingURL=Forms.js.map