//Aufgabe 9
//Name: Salome Weisser
//Matrikel: 254669
//Datum: 03.06.2017
//


namespace aufgabe9_Forms {

    window.addEventListener("load", init);
    //    flavours = document.getElementById("flavour"); //auf Boxen zugreifen 
    // Array für alle Sorten, die in meiner Konditorei angeboten werden sollen
    let sorts: string[] = ["Chocolate", "Vanille", "Strawberry", "Blueberry", "Mango", "Walnut"];
    let special: string[] = ["Cream", "Chocolate Sauce", "Chocolate Splits", "Strawberries"];
    let container: string[] = ["Waffle", "Cup"];

    // Das Fieldset in dem alle Inputs für die verschiedenen Kuchen angeordnet werden sollen.
    let fieldset: HTMLFieldSetElement;

    // Array in dem alle inputs für die Sorten untergebracht werden
    let inputs: HTMLInputElement[] = [];
    let inputToppings: HTMLInputElement[] = [];
    let inputCone: HTMLInputElement[] = [];
    let order: HTMLElement;


    function init(_event: Event): void {
        fieldset = document.getElementsByTagName("fieldset")[0];
        createInputs();
        createRadios();
        createCheckboxes();
        fieldset.addEventListener("change", change);



        //auf IDs zugreifen für jedes einzelne fieldset
        let sortsOfIcecream: HTMLElement = document.getElementById("flavours");
        let toppings: HTMLElement = document.getElementById("ConeCup");
        let special: HTMLElement = document.getElementById("Special");
        let shoppingCard: HTMLElement = document.getElementById("shoppingcard");

        //Shopping Card fieldsets
        sortsOfIcecream.addEventListener("change", change);
        toppings.addEventListener("change", change);
        special.addEventListener("change", change);

        order = document.getElementById("proofOrder");
        order.addEventListener("click", proof);

    }

    function createInputs(): void {
        // Erstelle pro Sorte Eis einen Input
        for (let i: number = 0; i < sorts.length; i++) {
            console.log(sorts[i]);
            createInput(sorts[i]);

        }
    }
    function createInput(_sorts: string): void {
        // Ein Label ist ein Text den man anklicken kann um damit den Input auszulösen
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _sorts;
        label.appendChild(input);
        // Die Art des Inputs wird über den Typ definiert
        input.type = "number";
        input.min = "0";
        input.value = "0";

        fieldset.appendChild(label);
        inputs.push(input);

    }

    function createRadios(): void {
        for (let i: number = 0; i < container.length; i++) {
            console.log(container[i]);
            createRadio(container[i]);
        }
    }

    function createRadio(_container: string): void {
        let containerField: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById("ConeCup");

        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.htmlFor = _container;

        label.textContent = _container;
        label.appendChild(input);
        label.id = _container;
        input.type = "radio";
        input.value = "radio1";
        input.id = _container;
        input.name = "Container";
        input.required = true;

        containerField.appendChild(input);
        containerField.appendChild(label);
        inputs.push(input);
        // console.log(inputContainer);

    }


    function createCheckboxes(): void {
        for (let i: number = 0; i < special.length; i++) {
            console.log(special[i]);
            createCheckbox(special[i]);
        }
    }

    //Erzeugung der Checkboxes
    function createCheckbox(_special: string): void {
        let containerField: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById("Special");

        let input: HTMLInputElement = document.createElement("input");
        let label: HTMLLabelElement = document.createElement("label");
        //label wird der Checkbox zugewiesen, damit dieser auch anklickbar ist
        label.htmlFor = _special;

        label.textContent = _special;
        label.appendChild(input);
        label.id = _special;
        input.type = "checkbox";
        input.value = "checkbox1";
        input.id = _special;
        input.name = "darbietung";
        input.required = true;

        //An das Fieldset werden die zuvor definierten Daten angehängt
        containerField.appendChild(input);
        containerField.appendChild(label);
        inputToppings.push(input);
        console.log(inputToppings);
    }



    function change(): void {
        let sum: number = 0;
        //Innerhalb der Array-Länge der Eissorten wird die Summe um 1€ hochgezählt
        for (let i: number = 0; i < inputs.length; i++) {
            sum += parseInt(inputs[i].value);
        }
        //Innerhalb der Array-Länge der Toppings wird die Summe um 0,5€ hochgezählt
        for (let i: number = 0; i < inputToppings.length; i++) {
            if (inputToppings[i].checked)
            { sum += 0.5; }
        }
        //Innerhalb der Array-Länge der inputCone wird die Summe um 1€ hochgezählt
        for (let i: number = 0; i < inputCone.length; i++) {
            if (inputCone[i].checked)
            { sum += 0; }
        }
        changeShoppingcard(sum);
    }

    function changeShoppingcard(_sum: number): void {
        //Variable, um eine Übersicht der ausgewählten Produkte in Form einer Liste anzeigen zu lassen
        let selectedProducts: HTMLElement = document.getElementById("productlist");
        //Zu Beginn muss dieses Feld leer sein
        selectedProducts.innerText = "";

        //Anzeige der Eissorte in der Bestellübersicht
        for (let i: number = 0; i < inputs.length; i++) {
            if (parseInt(inputs[i].value) > 0) {
                selectedProducts.innerText += sorts[i] + ": " + (parseInt(inputs[i].value) * 1) + "€" + "\n";
            }
        }

        //Anzeige der Toppings in der Bestellübersicht
        for (let i: number = 0; i < inputToppings.length; i++) {
            if (inputToppings[i].checked) {
                selectedProducts.innerText += special[i] + ": " + " 0,50€" + "\n";
            }
        }

        //Anzeige, ob Waffel oder Becher gewählt wurde
        for (let i: number = 0; i < inputCone.length; i++) {
            if (inputCone[i].checked) {
                selectedProducts.innerText += container[i] + "\n";
            }
        }
        //Ausgabe der Summe
        let summeHtml: HTMLElement = document.getElementById("total");
        summeHtml.innerText = "Sum: " + _sum.toString() + "€";
    }

    //Funktion, welche die Kundendaten überprüft
    function proof(): void {
        //Korrektur-Kommentar, welcher erscheint, sobald eine Eingabe nicht gültig ist
        let comment: string[] = ["Check input/n: \n"];
        let firstname: HTMLInputElement = <HTMLInputElement>document.getElementById("firstname");
        let name: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
        let street: HTMLInputElement = <HTMLInputElement>document.getElementById("street");
        let PLZ: HTMLInputElement = <HTMLInputElement>document.getElementById("PLZ");
        let city: HTMLInputElement = <HTMLInputElement>document.getElementById("city");
        let mail: HTMLInputElement = <HTMLInputElement>document.getElementById("mail");
        let delivery: HTMLInputElement = <HTMLInputElement>document.getElementById("delivery");
        let numberOfIce: number = 0;
        let containers: number = 0;

        //Fallunterscheidung    
        //Überprüfung des Vornamens
        if (firstname.validity.valid == false) {
            comment.push("- Vorname \n");
            firstname.style.backgroundColor = "#ff5c33";
        }
        else {
            firstname.style.backgroundColor = "#a6a6a6";
        }

        //Überprüfung des Nachnamens
        if (name.validity.valid == false) {
            comment.push("- Nachname \n");
            name.style.backgroundColor = "#ff5c33";
        }
        else {
            name.style.backgroundColor = "#a6a6a6";
        }

        //Überprüfung der Straße
        if (street.validity.valid == false) {
            comment.push("- Straße \n");
            street.style.backgroundColor = "#ff5c33";
        }
        else {
            street.style.backgroundColor = "#a6a6a6";
        }

        //Überprüfung der Postleitzahl
        if (PLZ.validity.valid == false) {
            comment.push("- Postleitzahl \n");
            PLZ.style.backgroundColor = "#ff5c33";
        }
        else {
            PLZ.style.backgroundColor = "#a6a6a6";
        }

        //Überprüfung des Ortes
        if (city.validity.valid == false) {
            comment.push("- City \n");
            city.style.backgroundColor = "#ff5c33";
        }
        else {
            city.style.backgroundColor = "#a6a6a6";
        }

        //Überprüfung der E-Mail
        if (mail.validity.valid == false) {
            comment.push("- Email \n");
            mail.style.backgroundColor = "#ff5c33";
        }
        else {
            mail.style.backgroundColor = "#a6a6a6";
        }

        //Überprüfung der Lieferoptionen
        if (delivery.value != "Express" && delivery.value != "Standard")
            comment.push("- Shipping options \n");

        for (let i: number = 0; i < inputs.length; i++) {
            if (parseInt(inputs[i].value) > 0)
                numberOfIce += 1;
        }
        if (numberOfIce == 0)
            comment.push("- Sort\n");

        for (let i: number = 0; i < inputCone.length; i++) {
            if (inputCone[i].checked)
                containers += 1;
        }

        if (containers == 0)
            comment.push("- Waffle or Cup?");

        if (comment.length > 1) {
            for (let i: number = 0; i < comment.length; i++)
                comment.push();
            alert(comment.join(""));
        }
        else {
            alert("Thank you for your order!");
        }
    }
}