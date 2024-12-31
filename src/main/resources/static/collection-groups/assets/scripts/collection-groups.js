const $items = document.querySelectorAll('#main > .top > .menu > .item');

$items.forEach((x) => x.addEventListener('mouseenter', () => {
    x.classList.add('hover');
    x.addEventListener('mouseleave', () => {
        $items.forEach((x) => x.classList.remove('hover'));
    });
}));

const $filterBox = document.querySelectorAll('.container > .content-box > .filter > .filter-area > .filter-box');

$filterBox.forEach((x) => {
    const $button = x.querySelector(':scope > .filter-button');
    const $nav = x.querySelector(':scope > .nav');
    $nav.style.opacity = '1';

    $button.onclick = () => {
        if($nav.style.opacity === '1'){
            $button.querySelector(':scope > .svg').style.transform = 'rotate(180deg)';
            $nav.style.opacity = '0';
            $nav.style.maxHeight = '0';
        } else {
            $button.querySelector(':scope > .svg').style.transform = 'rotate(0deg)';
            $nav.style.opacity = '1';
            $nav.style.maxHeight = '100vh';
        }
    };
});

