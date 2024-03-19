var slide_main = document.querySelectorAll('.slider_item'),
    monkey_name = document.querySelectorAll('.monkey_name'),
    monkey_description = document.querySelectorAll('.monkey_description'),
    main_slider_btn_prev = document.querySelector('.slider_btn_prev'),
    main_slider_btn_next = document.querySelector('.slider_btn_next'),
    main_slider_indicator = document.querySelectorAll('.slider_indicator'),
    slide_btn_detail = document.querySelectorAll('.slide_btn_detail'),
    slide_detail = document.querySelector('.slide_detail'),
    carousel_btn_next = document.querySelector('.carousel_btn_next'),
    carousel_btn_prev = document.querySelector('.carousel_btn_prev'),
    carousel_btn_anim = document.querySelector('.carousel_btn_anim'),
    carousel_face = document.querySelectorAll('.study_carousel_face'),
    carousel = document.querySelector('.study_carousel'),
    modal = document.querySelector(".study_carousel_modal"),
    modal_image = document.querySelector(".study_carousel_modal-image");

var index_main = 0;
var position_detail = 0;


main_slider_btn_prev.addEventListener('click', prevMain);
main_slider_btn_next.addEventListener('click', nextMain);

main_slider_indicator.forEach((indicator, index_indicator) => {
    indicator.addEventListener('click', () => {
        index_main = index_indicator;
        for (i = 0; i < main_slider_indicator.length; i++) {
            slide_main[i].classList.remove('active-slide');
        }
        slide_main[index_indicator].classList.add('active-slide');
        activeSlide(index_main);
    });
});

slide_btn_detail.forEach((btn_detail) => {
    btn_detail.addEventListener('click', () => {
                                    
        switch (index_main) {      
            case 0:                 
                for (i = 0; i < carousel_face.length; i++) {
                    carousel_face[i].style.backgroundImage = `url('../static/app/content/img/monkeys_foto/m1_${i}.png')`;
                } break;
            case 1:
                for (i = 0; i < carousel_face.length; i++) {
                    carousel_face[i].style.backgroundImage = `url('../static/app/content/img/monkeys_foto/m2_${i}.png')`;
                } break;
            case 2:
                for (i = 0; i < carousel_face.length; i++) {
                    carousel_face[i].style.backgroundImage = `url('../static/app/content/img/monkeys_foto/m3_${i}.png')`;
                } break;
            case 3:
                for (i = 0; i < carousel_face.length; i++) {
                    carousel_face[i].style.backgroundImage = `url('../static/app/content/img/monkeys_foto/m4_${i}.png')`;
                } break;
            case 4:
                for (i = 0; i < carousel_face.length; i++) {
                    carousel_face[i].style.backgroundImage = `url('../static/app/content/img/monkeys_foto/m5_${i}.png')`;
                } break;
            case 5:
                for (i = 0; i < carousel_face.length; i++) {
                    carousel_face[i].style.backgroundImage = `url('../static/app/content/img/monkeys_foto/m6_${i}.png')`;
                } break;
        }
        slide_detail.classList.toggle('slide_detail_hidden');
    });
});

carousel_btn_prev.addEventListener('click', prevCarousel);
carousel_btn_next.addEventListener('click', nextCarousel);
carousel_btn_anim.addEventListener('click', animCarousel);

carousel_face.forEach((face) => {
    face.addEventListener('click', () => {

        modal.style.display = "flex";
        modal_image.src = face.style.backgroundImage.replace(/(url\(|\)|")/g, '');
        animCarousel();

    });
});

modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target == modal_image) {
        modal.style.display = "none";
    }
    animCarousel();
});



function nextMain() {
    slide_main[index_main].classList.remove('active-slide');
    index_main = (index_main + 1) % slide_main.length;
    slide_main[index_main].classList.add('active-slide');
    activeSlide(index_main);
}

function prevMain() {
    slide_main[index_main].classList.remove('active-slide');
    index_main = (index_main - 1 + slide_main.length) % slide_main.length;
    slide_main[index_main].classList.add('active-slide');
    activeSlide(index_main);
}

function activeSlide(index) {
    for (i = 0; i < main_slider_indicator.length; i++) {
        main_slider_indicator[i].classList.remove('slider_indicator_active');
    }
    main_slider_indicator[index].classList.add('slider_indicator_active');

    for (i = 0; i < monkey_name.length; i++) {
        monkey_name[i].classList.remove('monkey_name_active');
    }
    monkey_name[index].classList.add('monkey_name_active');

    for (i = 0; i < monkey_description.length; i++) {
        monkey_description[i].classList.remove('monkey_description_active');
    }
    monkey_description[index].classList.add('monkey_description_active');

    slide_detail.classList.add('slide_detail_hidden');
}

function nextCarousel() {
    for (i = 0; i < carousel_face.length; i++) {
        let position_detail_str = carousel_face[i].style.transform.match(/-?\d+/)[0];
        position_detail = parseInt(position_detail_str, 10);
        position_detail -= 40;
        carousel_face[i].style.transform = `rotateY(${position_detail}deg) translateZ(172px)`;
    }
}

function prevCarousel() {
    for (i = 0; i < carousel_face.length; i++) {
        let position_detail_str = carousel_face[i].style.transform.match(/-?\d+/)[0];
        position_detail = parseInt(position_detail_str, 10);
        position_detail += 40;
        carousel_face[i].style.transform = `rotateY(${position_detail}deg) translateZ(172px)`;
    }
}

function animCarousel() {
    carousel.classList.toggle('carousel_anim');
    carousel_btn_anim.classList.toggle('carousel_btn_anim_play');
}


/*
setInterval(() => {
    next_main();
}, 3000)
*/