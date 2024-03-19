var data_salary = document.getElementById('data_salary');
var color_salary_white = document.getElementById('color_salary_white');
var color_salary_grey = document.getElementById('color_salary_grey');
var payment_jkh = document.getElementById('payment_jkh');
var payment_connection = document.getElementById('payment_connection');
var payment_food = document.getElementById('payment_food');
var payment_clothes_0 = document.getElementById('payment_clothes_0');
var payment_clothes_1 = document.getElementById('payment_clothes_1');
var payment_clothes_2 = document.getElementById('payment_clothes_2');
var payment_hygiene = document.getElementById('payment_hygiene');
var payment_love = document.getElementById('payment_love');
var payment_vacation = document.getElementById('payment_vacation');

data_salary.addEventListener("focus", hintBudget.bind(data_salary, data_salary));
color_salary_white.addEventListener("change", hintBudget.bind(color_salary_white, color_salary_white));
color_salary_grey.addEventListener("change", hintBudget.bind(color_salary_grey, color_salary_grey));
payment_jkh.addEventListener("focus", hintBudget.bind(payment_jkh, payment_jkh));
payment_jkh.addEventListener("keyup", tabloCredit);
payment_jkh.addEventListener("change", tabloCredit);
payment_connection.addEventListener("focus", hintBudget.bind(payment_connection, payment_connection));
payment_connection.addEventListener("keyup", tabloCredit);
payment_connection.addEventListener("change", tabloCredit);
payment_food.addEventListener("focus", hintBudget.bind(payment_food, payment_food));
payment_food.addEventListener("keyup", tabloCredit);
payment_food.addEventListener("change", tabloCredit);
payment_clothes_0.addEventListener("change", hintBudget.bind(payment_clothes_0, payment_clothes_0));
payment_clothes_1.addEventListener("change", hintBudget.bind(payment_clothes_1, payment_clothes_1));
payment_clothes_2.addEventListener("change", hintBudget.bind(payment_clothes_2, payment_clothes_2));
payment_hygiene.addEventListener("focus", hintBudget.bind(payment_hygiene, payment_hygiene));
payment_hygiene.addEventListener("keyup", tabloCredit);
payment_hygiene.addEventListener("change", tabloCredit);
payment_love.addEventListener("focus", hintBudget.bind(payment_love, payment_love));
payment_love.addEventListener("keyup", tabloCredit);
payment_love.addEventListener("change", tabloCredit);
payment_vacation.addEventListener("focus", hintBudget.bind(payment_vacation, payment_vacation));
payment_vacation.addEventListener("keyup", tabloCredit);
payment_vacation.addEventListener("change", tabloCredit);


var hint = document.getElementById('hint_text');

var start_hint = "Распределив свой бюджет тем или иным образом, Мартышка сможет спрогнозировать результат и заглянуть в будущее, узнав, как принятые решения повлияют на её жизнь. Для этого нужно записать на что и в каком объёме Мартышка будет тратить заработанные денежки. Ясное дело, что потратить больше чем имеется в её распоряжении невозможно, так что Расход не должен превышать Доход."

hint.innerText = start_hint;

function hintBudget(hint_object) {

    const start_hint = "Распределив свой бюджет тем или иным образом, Мартышка сможет спрогнозировать результат и заглянуть в будущее, узнав, как принятые решения повлияют на её жизнь.<br>Для этого нужно записать на что и в каком объёме Мартышка будет тратить заработанные денежки. Ясное дело, что потратить больше чем имеется в её распоряжении невозможно, так что Расход не должен превышать Доход."

    const data_salary_hint = "О, эта прекрасная Дата – дата получения зарплаты. Нужно обязательно ввести её в это поле,что бы знать сколько дней Мартышке осталось ждать до этого праздника жизни. Точно меньше 30, ведь зарплату Мартышка получает регулярно, каждый месяц."
    const color_salary_hint = "Пару дней назад руководство предложило Мартышке выбрать, какую зарплату она будет получать: Белую, полностью легальную или Серую (большей частью в конвертике), что уменьшит подоходный налог, и как следствие увеличит её реальный Доход. Соблазнительно, хотя и несёт ряд неудобств и рисков. Пришло время Мартышке определиться с выбором."
    const payment_jkh_hint = "Мартышка живёт на дереве, а каждым деревом в её джунглях заведует УправДрев, который обеспечивает места проживания мартышек всеми необходимыми благами цивилизации. За эти услуги необходимо вносить ежемесячную плату. Обычно у Мартышки эта плата составляет порядка 8 денежек."
    const payment_connection_hint = "В наше время представить себе жизнь без средств коммуникации, таких как мобильная связь и интернет, довольно сложно. Без этого всего, уже давно, как без рук. Поэтому забыть о данной статье расходов было бы крайне непредусмотрительно. Что бы оплатить эти услуги Мартышке требуется около 2 денежек."
    const payment_food_hint = "Питание, куда же без него? Будешь плохо кушать, не будет сил работать. Не будет сил работать – не будет ничего. Что бы полноценно питаться, Мартышке требуется в среднем 30 денежек в месяц. Можно, конечно, и урезать свой рацион, но не стоит забывать слова одного почтенного орангутанга: «Мы есть то, что мы едим»."
    const payment_clothes_hint = "Ещё одна насущная проблема. У Мартышки поизносились портки! И всё бы ни чего, но в кармашке портков, Мартышка всегда и везде носит с собой талисман в виде бубенчиков, подаренных ей родителями при рождении. Эти бубенчики очень дороги Мартышке, и она бы не хотела потерять или повредить их, прыгая по деревьям и качаясь на лианах. Нужно решить сколько Мартышка готова потратить на новые портки. Купить простые треники за 2 денежки, или красивые и модные штанишки за 8? А может ну их, и в старых ещё можно попрыгать какое-то время?"
    const payment_hygiene_hint = "Каждая уважающая себя мартышка, чтобы не превратиться в гамадрила, должна следить за состоянием своего здоровья и соблюдать гигиену. А значит необходимо восполнять запасы самых необходимых средств и хозяйственных инструментов вроде зубного и стирального порошка, мыла, фурминаторов и прочих средств груминга. На это уходит порядка 2 денежек в месяц, а если хочется побаловать себя душистым шампунем от блох или купить полирольку для бубенчиков, то и все 3-4 денежки. Сколько Мартышка потратит на это всё, решать только ей."
    const payment_love_hint = "Мартышке давным-давно нравится одна соседская Макака, к которой она с упорством достойным горной гориллы пытается подбить клинья. Преследуя эту цель, Мартышка подумала, что не плохо было бы заложить в бюджет некую сумму для возможного свидания с Макакой. Можно, конечно, ограничиться и 1-2 денежками, гуляя с ней по опушке леса и угощая мороженкой, а можно раскошелиться денежек на 10, чтобы сводить её в ресторан и театр."
    const payment_vacation_hint = "Путешествие – одно из самых вожделенных Мартышкой желаний. Но она уже забыла, когда последний раз выбиралась дальше своих джунглей. А так хочется съездить на остров Хонсю, в гости к японским макакам в парк Джигокудани, чтобы в окружении крутых скал и густых холодных лесов покупаться там в горячих термальных источниках и оттянуться по полной. Получится ли у Мартышки откладывать на отпуск хотя бы по 5 денежек в месяц?"

    switch (hint_object) {
        case data_salary:
            hint.innerText = data_salary_hint;
            break;
        case color_salary_grey:
            hint.innerText = color_salary_hint;
            tabloDebit();
            break;
        case color_salary_white:
            hint.innerText = color_salary_hint;
            tabloDebit();
            break;
        case payment_jkh:
            hint.innerText = payment_jkh_hint;
            break;
        case payment_connection:
            hint.innerText = payment_connection_hint;
            break;
        case payment_food:
            hint.innerText = payment_food_hint;
            break;
        case payment_clothes_0:
            hint.innerText = payment_clothes_hint;
            tabloCredit();
            break;
        case payment_clothes_1:
            hint.innerText = payment_clothes_hint;
            tabloCredit();
            break;
        case payment_clothes_2:
            hint.innerText = payment_clothes_hint;
            tabloCredit();
            break;
        case payment_hygiene:
            hint.innerText = payment_hygiene_hint;
            break;
        case payment_love:
            hint.innerText = payment_love_hint;
            break;
        case payment_vacation:
            hint.innerText = payment_vacation_hint;
            break;
        default:
            hint.innerText = start_hint;
    }
}

var debit = document.getElementById('tablo_debit');
var credit = document.getElementById('tablo_credit');

function tabloDebit() {
    if (color_salary_white.checked) denejka = 45;
    else if (color_salary_grey.checked) denejka = 60;
    else denejka = 0;
    debit.innerHTML = denejka;
}

function tabloCredit() {

    jkh = Number(payment_jkh.value);
    connection = Number(payment_connection.value);
    food = Number(payment_food.value);
    hygiene = Number(payment_hygiene.value);
    love = Number(payment_love.value);
    vacation = Number(payment_vacation.value);
    let shtanishki = 0;

    if (payment_clothes_1.checked) shtanishki = 2;
    else if (payment_clothes_2.checked) shtanishki = 8;
    else shtanishki = 0;

    credit.innerHTML = jkh + connection + food + hygiene + love + vacation + shtanishki;
}

var btn_budget_go = document.getElementById('btn_budget_go');
btn_budget_go.addEventListener("click", checkFormBudget);

function checkFormBudget() {

    const data_today = Date.now();
    const data_sal = new Date(data_salary.value);
    const do_zarplati = Math.ceil((data_sal.getTime() - data_today) / 86400000);

    const form_error_text = document.getElementById('form_error_text');
    let text_error = "";

    if (Number(credit.innerHTML) > Number(debit.innerHTML))
        text_error = "Расходы не могут превышать доходы. <br> Денежки не берутся из воздуха.";
    else if (data_salary.value == "")
        text_error = "Дата ближайшей зарплаты не определена.";
    else if (do_zarplati < 0)
        text_error = "Не корректная дата зарплаты. <br> Прошлая зарплата уже потрачена. <br> Введите дату следующей!";
    else if (do_zarplati > 31)
        text_error = "До зарплаты больше месяца? <br> Мартышке нужно не бюджет считать, <br> а срочно менять работу!";


    if (text_error != "")
        form_error_text.innerHTML = text_error;
    else {
        form_error_text.innerText = "";

        const result_data = document.getElementById('result_data');

        if (do_zarplati == 0)
            result_data.innerText = "Поздравляю! Сегодня счастливый день зарплаты! Мартышка наспех рассчитала свой бюджет, но лучше поздно, чем никогда.";
        else if (do_zarplati < 15)
            result_data.innerText = "До зарплаты осталось подождать " + do_zarplati + " " + dayTitle(do_zarplati) + ". Мартышка очень вовремя рассчитала свой бюджет. Предупрежден, значит вооружён.";
        else if (do_zarplati >= 15)
            result_data.innerText = "До зарплаты ещё " + do_zarplati + " " + dayTitle(do_zarplati) + ". Мартышка заранее рассчитала свой бюджет, чтобы во всеоружии встретить грядущий месяц.";

        const result_color_salary = document.getElementById('result_color_salary');

        if (color_salary_white.checked)
            result_color_salary.innerText = "Зарплата у Мартышки была не большая, но честно заработанная и полностью легальная. Заплати налоги и спи спокойно – вот девиз честной обезьяны.";
        else if (color_salary_grey.checked)
            result_color_salary.innerText = "Мартышка получала серую зарплату, скрывая часть своих доходов, и вскоре к ней пришли бабуины из ИФНС. Они отвесили Мартышке весьма увесистых подзатыльников, пинков и прочих лещей различного калибра. Но самое печальное, что в процессе всего этого, бабуины помяли Мартышке её драгоценные бубенчики. Мартышка была весьма опечалена этим фактом.";

        const result_payment_jkh = document.getElementById('result_payment_jkh');

        if (Number(payment_jkh.value) >= 8)
            result_payment_jkh.innerText = "Все коммунальные услуги Мартышка оплачивала своевременно и в полном объёме, поэтому у неё никогда не было проблем с УправДревом, и все блага цивилизации были ей доступны в любой момент времени.";
        else if (Number(payment_jkh.value) < 8)
            result_payment_jkh.innerText = "Увидев задолженность по коммунальным платежам, УправДрев прислал к Мартышке гамадрилов Котлекторов, вооруженных острыми зубами, когтистыми лапами, перегаром и большой мясорубкой.  Что бы не превратиться в котлету, Мартышке пришлось оплатить долги и бешеные пени. Если она что-то и планировала отложить на отпуск и личную жизнь, то все эти планы пошли скунсу под хвост.";

        const result_payment_connection = document.getElementById('result_payment_connection');

        if (Number(payment_connection.value) >= 2)
            result_payment_connection.innerText = "Счета за телефон и интернет были оплачены, поэтому Мартышка всегда оставалась на связи, оперативно решая как рабочие, так и личные вопросы.";
        else if (Number(payment_connection.value) < 2)
            result_payment_connection.innerText = "Профукав оплату счетов за связь, Мартышка выпала из современного общества. С ней никто не мог связаться и начались проблемы с работой. Да и личная жизнь пострадала, ведь она не могла даже позвонить Макаке и спросить как у той дела.";

        const result_payment_food = document.getElementById('result_payment_food');

        if (Number(payment_food.value) >= 30)
            result_payment_food.innerText = "Питалась Мартышка довольно неплохо, сбалансированный рацион позволял ей сохранять силы и держать себя в форме.";
        else if (Number(payment_food.value) < 30)
            result_payment_food.innerText = "Попытки урезать свой рацион привели к тому, что Мартышка начала питаться всякой гадостью, уровень её здоровья начал снижаться, а самочувствие ухудшалось с каждым днём.";

        const result_payment_clothes = document.getElementById('result_payment_clothes');

        if (payment_clothes_0.checked)
            result_payment_clothes.innerText = "Мартышка не стала обновлять свой гардероб и продолжила бегать в старых портках, что привело к неизбежному. Прыгая с дерева на дерево, бубенчики Мартышки выскочили из рваного кармана портков и сильно поцарапались о ветки и сучья. Это очень сильно опечалило Мартышку и ввергло её в состояние глубокой депрессии.";
        else if (payment_clothes_1.checked)
            result_payment_clothes.innerText = "В новых трениках Мартышка чувствовала себя весьма комфортно. Ведь они были удобные и тёплые, а главное бубенчикам теперь ничего не угрожало, они были надежно спрятаны в кармашке новых портков.";
        else if (payment_clothes_2.checked)
            result_payment_clothes.innerText = "Модные штанишки пришлись Мартышке по вкусу. Пусть они и не слишком удобные, но выглядят просто шикарно. Возможно даже Макака оценит эту обновку.";

        const result_payment_hygiene = document.getElementById('result_payment_hygiene');

        if (Number(payment_hygiene.value) > 2)
            result_payment_hygiene.innerText = "Немного увеличив свои расходы на средства ухода за собой, Мартышка стала выглядеть гораздо лучше. От неё исходил модный в этом сезоне аромат бразильского шампуня «Блошиная сила», её шелковистая мохнатость переливалась в лучах солнца, а отполированные до блеска бубенчики приковывали своим видом восхищённые взгляды других обезьян, как только Мартышка доставала их из кармашка. Не Мартышка, а Альфа-Самец!";
        else if (Number(payment_hygiene.value) == 2)
            result_payment_hygiene.innerText = "Поддерживая гигиену на должном уровне, Мартышка выглядела вполне приличным приматом, с которым можно общаться и вести дела.";
        else if (Number(payment_hygiene.value) < 2)
            result_payment_hygiene.innerText = "Недофинансирование такой важной статьи как гигиена привело к тому, что Мартышка стала похожа на старого, не чёсанного орангутанга. Вонь от Мартышки стала на столько сильной, что другие обезьяны шарахались от неё, а количество блох превысило все критические нормы.";

        const result_payment_love_1 = document.getElementById('result_payment_love_1');
        const result_payment_love_2 = document.getElementById('result_payment_love_2');
        const result_payment_love_22 = document.getElementById('result_payment_love_22');
        const result_payment_love_3 = document.getElementById('result_payment_love_3');

        if (Number(payment_jkh.value) < 8)
            result_payment_love_1.innerText = "Из-за накопленных долгов Мартышке пришлось решать проблемы с Котлекторами. Ни о каких амурных делах с Макакой думать было некогда, а все более или менее свободные средства приходилось отдавать в счет погашения задолженностей и процентов по ним.";
        else if (Number(payment_love.value) <= 2)
            result_payment_love_1.innerText = "Средств на свидания с Макакой совершенно не нашлось, поэтому в её глазах Мартышка предстала в образе жадного скряги.";
        else if (Number(payment_love.value) < 10 && Number(payment_love.value) > 2)
            result_payment_love_1.innerText = "Мартышка не смогла выделить на отдых с Макакой много денежек, поэтому они гуляли, держась за лапки по тенистым садам, встречали вместе рассвет и придавались прочим романтичным удовольствиям, не требующим больших финансовых затрат.";
        else if (Number(payment_love.value) >= 10)
            result_payment_love_1.innerText = "Мартышка решила серьёзно подойти к процессу обольщения Макаки и заложила под это дело приличную часть своего дохода. Подарки, цветы, свежие фрукты, походы в рестораны и театры - всё это должно было по мнению Мартышки произвести сильное впечатление на Макаку.";

        if (Number(payment_hygiene.value) < 2) {
            result_payment_love_2.innerText = "В тоже время вонь, исходящая от Мартышки и её неопрятный вид, заставляли Макаку с огромным скепсисом относится к потугам Мартышки наладить связь между ними.";
            if (payment_clothes_2.checked)
                result_payment_love_22.innerText = "Не спасали ситуацию даже модные штанишки от известного бренда.";
            else if (payment_clothes_1.checked)
                result_payment_love_22.innerText = "Новые треники ни как не скрашивали ситуацию.";
            else if (payment_clothes_0.checked)
                result_payment_love_22.innerText = "Старые рваные портки лишь усугубляли ситуацию.";
        }
        else if (Number(payment_hygiene.value) == 2) {
            result_payment_love_2.innerText = "В тоже время выглядела Мартышка довольно прилично, было видно, что она за собой следит, хоть и без фанатизма.";
            if (payment_clothes_2.checked)
                result_payment_love_22.innerText = "Модные штанишки от известного бренда только усиливали эти ощущения.";
            else if (payment_clothes_1.checked)
                result_payment_love_22.innerText = "Купленные Мартышкой новые треники слегка портили общую картину, но кто его знает, может Мартышка – особый вид Хипстеров!";
            else if (payment_clothes_0.checked)
                result_payment_love_22.innerText = "Старые рваные портки ни как не вписывались в эту картину,  но кто его знает, может Мартышка – особый вид Хипстеров!";
        }
        else if (Number(payment_hygiene.value) > 2) {
            result_payment_love_2.innerText = "В тоже время шикарный, ухоженный внешний вид Мартышки, её ароматный запах и шелковистая мохнатость, зарождали в голове Макаки мысль: «А не это ли Самец моей мечты?».";
            if (payment_clothes_2.checked)
                result_payment_love_22.innerText = "Модные штанишки от известного бренда только усиливали эти ощущения.";
            else if (payment_clothes_1.checked)
                result_payment_love_22.innerText = "Купленные Мартышкой новые треники слегка портили общую картину, но кто его знает, может Мартышка – особый вид Хипстеров!";
            else if (payment_clothes_0.checked)
                result_payment_love_22.innerText = "Старые рваные портки ни как не вписывались в эту картину,  но кто его знает, может Мартышка – особый вид Хипстеров!";
        }

        if (color_salary_grey.checked && payment_clothes_0.checked)
            result_payment_love_3.innerText = "Не смотря на все усилия, добиться расположения Макаки так и не удалось. Как только та увидела бубенчики Мартышки, помятые бабуинами из ИФНС и до кучи истерзанные ветками и сучьями из-за ненадёжных портков, она сразу же отказалась продолжать с Мартышкой общение, т.к. если мартышка не смогла уберечь свои бубенчики, то и Макаку она не убережёт. «Береги штанишки снову, а бубенцы смолоду» - так сказали родители, когда дарили Мартышке этот фамильный талисман.";
        else if (color_salary_grey.checked)
            result_payment_love_3.innerText = "Не смотря на все усилия, добиться расположения Макаки так и не удалось. Как только та увидела бубенчики Мартышки, помятые бабуинами из ИФНС, она сразу же отказалась продолжать с Мартышкой общение, т.к. если мартышка не смогла уберечь свои бубенчики, то и Макаку она не убережёт. «Береги штанишки снову, а бубенцы смолоду» - так сказали родители, когда дарили Мартышке этот фамильный талисман.";
        else if (payment_clothes_0.checked)
            result_payment_love_3.innerText = "Не смотря на все усилия, добиться расположения Макаки так и не удалось. Как только та увидела бубенчики Мартышки, постоянно вываливающиеся из ненадёжных портков, истерзанные ветками и сучьями, она сразу же отказалась продолжать с Мартышкой общение, т.к. если мартышка не смогла позаботиться о своих бубенчиках, то и Макаку она не убережёт. «Береги штанишки снову, а бубенцы смолоду» - так сказали родители, когда дарили Мартышке этот фамильный талисман.";
        else if (Number(payment_jkh.value) < 8)
            result_payment_love_3.innerText = "Но это всё ни что по сравнению с тем фактом, что Мартышка являлась должником. В обезьяньем обществе быть объектом внимания Котлекторов – это наихудший сценарий, который может привести в мясорубку не только самого должника, но и его близких. И поэтому Макака решила прекратить всяческие контакты с Мартышкой от греха подальше.";
        else if (Number(payment_connection.value) < 2)
            result_payment_love_3.innerText = "Как бы то ни было, оставшись без связи и средств коммуникации, Мартышка не смогла поддерживать полноценный уровень общения с Макакой, что не позволило ей наладить контакт. Их общение потихоньку угасло.";
        else if (Number(payment_food.value) < 30)
            result_payment_love_3.innerText = "В конечном счете, из-за того, что Мартышка урезала свой рацион и не доедала, на одном из свиданий, она с голодухи укусила Макаку за филейную часть, после чего незамедлительно получила оплеуху и потеряла всякие надежды на дальнейшее развитие отношений.";
        else if (Number(payment_hygiene.value) >= 2)
            result_payment_love_3.innerText = "Возможно что-то у них и получится. Совет да любовь, как говорится!";
        else result_payment_love_3.innerText = "";

        const result_payment_vacation = document.getElementById('result_payment_vacation');

        if (Number(payment_vacation.value) >= 5 && Number(payment_jkh.value) >= 8)
            result_payment_vacation.innerText = "Мартышке удалось собрать некоторую сумму для путешествия во время отпуска. Но доставит ли ей удовольствие этот отдых, учитывая, как сложились обстоятельства?";
        else if (Number(payment_vacation.value) >= 5 && Number(payment_jkh.value) < 8)
            result_payment_vacation.innerText = "Мартышке удалось собрать некоторую сумму для путешествия во время отпуска. Но все эти накопления пришлось отдать Котлекторам, что бы не угодить в их мясорубку.";
        else if (Number(payment_vacation.value) < 5)
            result_payment_vacation.innerText = "Мартышке так и не удалось отложить достаточно средств на отпуск. Ей всё чаще вспоминались слова её начальника: «Работайте, приматы, солнце ещё высоко», - сказанные им откуда-то с Мальдивских островов, где он то ли отдыхал, то ли проживал, удаленно руководя обезьяним коллективом трудового пролетариата. Работать – это, конечно, хорошо, но было бы не плохо при этом ещё и зарабатывать.";

        document.getElementById('budget_result').hidden = false;
        document.getElementById('form_budget').hidden = true;
        document.getElementById('hint_budget').hidden = true;
    }


}

function dayTitle(number) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней';
    last_num = number % 10;
    if (last_num == 1) return 'день';
    if ([2, 3, 4].includes(last_num)) return 'дня';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней';
}

var btn_budget_nextres = document.getElementById('btn_budget_nextres');
btn_budget_nextres.addEventListener("click", showNextResult);

var number_result = 0;
var mas_results = Array.from(document.querySelectorAll('.result_point'));

function showNextResult() {

    for (i = 0; i < mas_results.length; i++) {
        mas_results[i].hidden = true;
    }

    if (number_result == (mas_results.length - 2))
        btn_budget_nextres.innerText = "Изментить бюджет";
    hint.innerText = start_hint;

    if (number_result < (mas_results.length - 1)) {
        number_result++;
        mas_results[number_result].hidden = false;
    } else {
        document.getElementById('budget_result').hidden = true;
        document.getElementById('form_budget').hidden = false;
        document.getElementById('hint_budget').hidden = false;
        number_result = 0;
        mas_results[0].hidden = false;
        btn_budget_nextres.innerText = "Далее";
    }
}

// максимальная длина input[type="number"]

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.oninput = () => {
        if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
    };
});