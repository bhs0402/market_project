new Swiper('.swiper', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    speed: 500,


    navigation: {
        prevEl: '.prev',
        nextEl: '.next',
    },
});

new Swiper('.swiper2', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    speed: 500,
    spaceBetween: 23.5,

    navigation: {
        prevEl: '.prev2',
        nextEl: '.next2',
    },
});

new Swiper('.swiper3', {
    slidesPerView: 5,
    speed: 500,
    spaceBetween: 23.5,
    loop: true,

    autoplay: {
        delay: 900,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    navigation: {
        prevEl: '.prev3',
        nextEl: '.next3',
    },
});


const $cartBtn = document.querySelectorAll('.slide-container > .swiper > .swiper-wrapper > .swiper-slide > .link > .button-wrapper > button');
const $cartBtn2 = document.querySelectorAll('.slide-container > .swiper-initialized > .wrapper2 > .slide2 > .link > .button-wrapper2 > button')
const reg = new RegExp(/\([^)]+\)/gi);

$cartBtn.forEach((x) => x.onclick = (e) => {
    e.preventDefault();
    const $img = x.parentElement.parentElement.querySelector(':scope > .img-wrapper > .img-box > .img-box2 > span > img');
    const $title = x.parentElement.parentElement.querySelector(':scope  > .product-info > .product-name');
    const $price = x.parentElement.parentElement.querySelector(':scope > .product-info > .content-row > .product-price > div > .dimmed-price > .price-number');
    const $salesPrice = x.parentElement.parentElement.querySelector(':scope > .product-info > .content-row > .product-price > .discount > .sales-price > .price-number');

    CartDialog.show({
        img: $img.src,
        title: $title.textContent,
        content: $title.textContent.replace(reg, '').trim(),
        price: `${$price.textContent}원`,
        salesPrice: `${$salesPrice.textContent}원`,
        total: '합계',
        totalPrice: `${$salesPrice.textContent}`,
        buttons: [{
            text: '취소',
            onclick: ($dialog) => {
                CartDialog.hide($dialog);
            }
        }, {
            text: '장바구니 담기',
            onclick: ($dialog) => {
                CartDialog.hide($dialog);
            }
        }]
    });
    plusMinus();

});

$cartBtn2.forEach((x) => x.onclick = (e) => {
    e.preventDefault();
    const $img2 = x.parentElement.parentElement.querySelector(':scope > .img-wrapper > .img-box > .img-box2 > span > img');
    const $title2 = x.parentElement.parentElement.querySelector(':scope  > .img-wrapper > .product-info2 > .content > .title');
    const $price2 = x.parentElement.parentElement.querySelector(':scope > .img-wrapper > .product-info2 > .content > .product-price > div > .dimmed-price > .price-number');
    const $salesPrice2 = x.parentElement.parentElement.querySelector(':scope > .img-wrapper > .product-info2 > .content > .product-price > .discount > .sales-price > .price-number');

    CartDialog.show({
        img: $img2.src,
        title: $title2.textContent,
        content: $title2.textContent.replace(reg, '').trim(),
        price: `${$price2.textContent}원`,
        salesPrice: `${$salesPrice2.textContent}원`,
        total: '합계',
        totalPrice: `${$salesPrice2.textContent}`,
        buttons: [{
            text: '취소',
            onclick: ($dialog) => {
                CartDialog.hide($dialog);
            }
        }, {
            text: '장바구니 담기',
            onclick: ($dialog) => {
                CartDialog.hide($dialog);
            }
        }]
    });

    plusMinus();
});


const plusMinus = () => {
    const $div23 = document.querySelector('.---cartDialog > ._div2 > ._div20 > ._div23');
    const $minusButton = $div23.querySelector('._minus');
    const $count = $div23.querySelector('._count');
    const $plusButton = $div23.querySelector('._plus');
    const $totalPrice = document.querySelector('.---cartDialog > ._div3 > ._totalPrice');
    const $realPrice = document.querySelector('.---cartDialog > ._div2 > ._div20 > ._div22 > ._salesPrice');
    let i = parseInt($count.innerText);
    let j = parseInt($realPrice.innerText.replaceAll(',', ''));

    $plusButton.onclick = () => {
        i += 1;
        $count.innerHTML = `${i}`;
        $minusButton.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=)';
        $minusButton.style.userSelect = 'pointer';
        $minusButton.style.pointerEvents = 'all';
        $totalPrice.innerHTML = (i*j).toLocaleString();
    };

    $minusButton.onclick = () => {
        if(i > 1){
            i -= 1;
        }
        $count.innerHTML = `${i}`;
        if(i === 1) {
            $minusButton.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iI0RERCIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=)';
            $minusButton.style.userSelect = 'none';
            $minusButton.style.pointerEvents = 'none';
        }
        $totalPrice.innerHTML = (i*j).toLocaleString();
    }
};