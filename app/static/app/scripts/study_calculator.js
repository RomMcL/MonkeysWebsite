
var calc_display_formula = document.getElementById('calc_display_formula');
var calc_display_rez = document.getElementById('calc_display_rez');
var calc_display_error = document.getElementById('calc_display_error');

calc_display_formula.setAttribute("contenteditable", "false");
calc_display_rez.setAttribute("disabled", "");

var calculator_buttons = Array.from(document.querySelectorAll('.calc_btn'));


calculator_buttons.map((calc_btn) => {
    calc_btn.addEventListener("click", (e) => {

        switch (e.target.innerText) {

            case "AC":
                calc_display_formula.innerText = "0";
                calc_display_rez.value = "0";
                calc_display_error.innerText = "";
                break;

            case "back":
                if (calc_display_formula.innerText.length > 1) {
                    calc_display_formula.innerText = calc_display_formula.innerText.slice(0, -1);
                    calc_display_error.innerText = "";
                } else {
                    calc_display_formula.innerText = "0";
                    calc_display_error.innerText = "";
                }
                break;

            case "ans":
                let ans = calc_display_rez.value;
                if (calc_display_formula.innerText.slice(-1) == "=" || calc_display_formula.innerText == "0") {
                    calc_display_formula.innerText = ans;
                } else if (ans.slice(0, 1) == "-" && (calc_display_formula.innerText.slice(-1) == "/" || calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "(")) {
                    calc_display_formula.innerText += "(" + ans + ")";
                } else if (ans.slice(0, 1) != "-" && (calc_display_formula.innerText.slice(-1) == "/" || calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "(")) {
                    calc_display_formula.innerText += ans;
                }
                break;

            case "/":
                calcOperator("/");
                break;

            case "*":
                calcOperator("*");
                break;

            case "-":

                calcOperator("-");
                break;

            case "+":
                calcOperator("+");
                break;

            // доработать 22.06. - хрень
            case ".":
                if (calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "/") {
                    calc_display_formula.innerText += "0.";
                } else if (calc_display_formula.innerText.slice(-1) == "=") {
                    calc_display_formula.innerText = "0.";
                } else if (calc_display_formula.innerText.slice(-1) == ".") {
                    calc_display_error.innerText = "Десятичный разделитель уже установлен";
                    setTimeout(() => { calc_display_error.innerText = ""; }, 1500);
                } else calc_display_formula.innerText += e.target.innerText;
                break;

            case "(":
                if ((calc_display_rez.value == "0" && calc_display_formula.innerText == "0") || calc_display_formula.innerText.slice(-1) == "=") {
                    calc_display_formula.innerText = e.target.innerText;
                } else if (calc_display_formula.innerText.slice(-1) == "(" || calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "/") {
                    calc_display_formula.innerText += e.target.innerText;
                } else {
                    calc_display_error.innerText = "Не хватает математического символа";
                    setTimeout(() => { calc_display_error.innerText = ""; }, 1500);
                }
                break;

            case ")":
                if (calc_display_formula.innerText.slice(-1) == "(") {
                    calc_display_formula.innerText += "1)";

                } else if ((calc_display_rez.value == "0" && calc_display_formula.innerText == "0") || calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "/" || calc_display_formula.innerText.slice(-1) == "." || calc_display_formula.innerText.slice(-1) == "=") {
                    calc_display_error.innerText = "Не стоит сейчас закрывать скобку";
                    setTimeout(() => { calc_display_error.innerText = ""; }, 1500);
                } else calc_display_formula.innerText += e.target.innerText;
                break;

            case "+/-":
                let rez = calc_display_rez.value;
                if (rez != "0")
                    calc_display_rez.value = rez * (-1);
                break;

            case "%":
                if (calc_display_formula.innerText.slice(-1) != "*" || calc_display_formula.innerText.slice(-1) != "-" || calc_display_formula.innerText.slice(-1) != "+" || calc_display_formula.innerText.slice(-1) != "/" || calc_display_formula.innerText.slice(-1) != "." || calc_display_formula.innerText.slice(-1) != "=" || calc_display_formula.innerText.slice(-1) != "(" || calc_display_formula.innerText.slice(-1) != ")") {
                    let mas_numbers = calc_display_formula.innerText.split(/[-+/*)(]/).filter(Number);
                    let mas_operators = calc_display_formula.innerText.split(/[0123456789.)(]/).filter(n => n);
                    let percent = mas_numbers[mas_numbers.length - 1] / 100;
                    let na_zamenu = mas_numbers[mas_numbers.length - 2] + mas_operators[mas_operators.length - 1] + mas_numbers[mas_numbers.length - 1];

                    let rez_percent;

                    switch (mas_operators[mas_operators.length - 1]) {
                        case "*":
                            rez_percent = +mas_numbers[mas_numbers.length - 2] * percent;
                            break;
                        case "/":
                            rez_percent = +mas_numbers[mas_numbers.length - 2] / percent;
                            break;
                        case "+":
                            rez_percent = +mas_numbers[mas_numbers.length - 2] + (+mas_numbers[mas_numbers.length - 2] * percent);
                            break;
                        case "-":
                            rez_percent = mas_numbers[mas_numbers.length - 2] - (mas_numbers[mas_numbers.length - 2] * percent);
                            break;
                    }

                    let rez_percent_scob = "(" + rez_percent + ")";

                    let new_formula = calc_display_formula.innerText.replace(na_zamenu, rez_percent_scob);

                    calc_display_formula.innerText = new_formula;
                    /*
                    console.log("массив чисел = " + mas_numbers);                  
                    console.log("массив операторов = " + mas_operators);
                    console.log("часть на замену = " + na_zamenu);
                    console.log("заменяющая часть = " + rez_percent);
                    console.log("новая формула = " + new_formula);
                    */
                }
                break;

            // переписать eval() ?
            case "=":
                try {
                    if (calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "/" || calc_display_formula.innerText.slice(-1) == "(") {
                        //ничего не делаем
                    } else if (calc_display_formula.innerText.slice(-1) != "=") {

                        calc_display_rez.value = eval(calc_display_formula.innerText);
                        if (calc_display_formula.innerText.slice(-1) == ".")
                            calc_display_formula.innerText += "0=";
                        else calc_display_formula.innerText += "=";
                    }
                    calc_display_error.innerText = "";
                } catch (err) {
                    calc_display_error.innerText = "Ошибка в формуле";
                }
                break;

            default:
                if ((calc_display_formula.innerText == "0" && e.target.innerText != ".") || calc_display_formula.innerText.slice(-1) == "=") {
                    calc_display_formula.innerText = e.target.innerText;
                } else if (calc_display_formula.innerText.slice(-1) == ")") {
                    calc_display_error.innerText = "Не хватает математического символа";
                    setTimeout(() => { calc_display_error.innerText = ""; }, 1500);
                } else calc_display_formula.innerText += e.target.innerText;

        }

    });
});

function calcOperator(operator) {
    if (calc_display_formula.innerText.slice(-1) == "*" || calc_display_formula.innerText.slice(-1) == "-" || calc_display_formula.innerText.slice(-1) == "+" || calc_display_formula.innerText.slice(-1) == "/" || calc_display_formula.innerText.slice(-1) == ".") {
        calc_display_formula.innerText = calc_display_formula.innerText.replace(/.$/, operator);
    } else if (calc_display_formula.innerText.slice(-1) == "=") {
        calc_display_formula.innerText = calc_display_rez.value + operator;
    } else if (calc_display_formula.innerText.slice(-1) == "(") {
    } else calc_display_formula.innerText += operator;
}


var btn_calc_skins = document.getElementById('btn_calc_skins');

btn_calc_skins.addEventListener('click', skinMenu);

function skinMenu() {
    btn_calc_skins.classList.toggle('calc_skins');
    let calc_skins = btn_calc_skins.nextElementSibling;
    if (calc_skins.style.maxHeight) {
        calc_skins.style.maxHeight = null;
    } else {
        calc_skins.style.maxHeight = calc_skins.scrollHeight + 'px';
    }
}


var skin1 = document.getElementById('skin1');
var skin2 = document.getElementById('skin2');
var skin3 = document.getElementById('skin3');

skin1.addEventListener('click', calcSkinCheck);
skin2.addEventListener('click', calcSkinCheck);
skin3.addEventListener('click', calcSkinCheck);

var calculator = document.getElementById('calculator_1_0');
var obert_display_form = document.getElementById('obert_display_form');

function calcSkinCheck() {

    let calculator = document.getElementById('calculator_1_0');
    let calc_main_display = document.getElementById('calc_main_display');
    let obert_display_form = document.getElementById('obert_display_form');
    let calc_display_formula = document.getElementById('calc_display_formula');
    let calc_display_rez = document.getElementById('calc_display_rez');
    let calc_display_error = document.getElementById('calc_display_error');
    let btn_calc_skins = document.getElementById('btn_calc_skins');
    let div_skins = document.getElementById('div_skins');
    let calc_btn_eq = document.getElementById('calc_btn_eq');

    let remove_square_style = function () {
        calculator.classList.remove('calculator_square');
        obert_display_form.classList.remove('obert_display_form_square');
        calc_display_formula.classList.remove('calc_display_formula_square');
        calc_display_rez.classList.remove('calc_display_rez_square');
        calc_display_error.classList.remove('calc_display_error_square');
        btn_calc_skins.classList.remove('btn_calc_skins_square');
        div_skins.classList.remove('calc_skin_content_square');
        for (i = 0; i < calculator_buttons.length; i++) {
            calculator_buttons[i].classList.remove('calc_btn_square');
        }
    }

    let remove_skin_style = function () {
        calculator.classList.remove('calculator_skin');
        calc_main_display.classList.remove('calc_main_display_skin');
        obert_display_form.classList.remove('obert_display_form_skin');
        calc_display_formula.classList.remove('calc_display_formula_skin');
        calc_display_rez.classList.remove('calc_display_rez_skin');
        calc_display_error.classList.remove('calc_display_error_skin');
        btn_calc_skins.classList.remove('btn_calc_skins_skin');
        div_skins.classList.remove('calc_skin_content_skin');
        for (i = 0; i < calculator_buttons.length; i++) {
            calculator_buttons[i].classList.remove('calc_btn_skin');
        }
        calc_btn_eq.classList.remove('calc_btn_eq_skin');
    }

    switch (this.innerText) {

        case "Black Accountant":
            this.classList.add('calc_skin_btn_checked');
            skin2.classList.remove('calc_skin_btn_checked');
            skin3.classList.remove('calc_skin_btn_checked');

            remove_square_style();
            remove_skin_style();
            break;

        case "Square Counter":
            this.classList.add('calc_skin_btn_checked');
            skin1.classList.remove('calc_skin_btn_checked');
            skin3.classList.remove('calc_skin_btn_checked');

            remove_skin_style();

            calculator.classList.add('calculator_square');
            obert_display_form.classList.add('obert_display_form_square');
            calc_display_formula.classList.add('calc_display_formula_square');
            calc_display_rez.classList.add('calc_display_rez_square');
            calc_display_error.classList.add('calc_display_error_square');
            btn_calc_skins.classList.add('btn_calc_skins_square');
            div_skins.classList.add('calc_skin_content_square');
            for (i = 0; i < calculator_buttons.length; i++) {
                calculator_buttons[i].classList.add('calc_btn_square');
            }
            break;

        case "Skin Calculator":
            this.classList.add('calc_skin_btn_checked');
            skin1.classList.remove('calc_skin_btn_checked');
            skin2.classList.remove('calc_skin_btn_checked');

            remove_square_style();

            calculator.classList.add('calculator_skin');
            calc_main_display.classList.add('calc_main_display_skin');
            obert_display_form.classList.add('obert_display_form_skin');
            calc_display_formula.classList.add('calc_display_formula_skin');
            calc_display_rez.classList.add('calc_display_rez_skin');
            calc_display_error.classList.add('calc_display_error_skin');
            btn_calc_skins.classList.add('btn_calc_skins_skin');
            div_skins.classList.add('calc_skin_content_skin');
            for (i = 0; i < calculator_buttons.length; i++) {
                calculator_buttons[i].classList.add('calc_btn_skin');
            }
            calc_btn_eq.classList.add('calc_btn_eq_skin');
            break;

    }
    skinMenu();
}