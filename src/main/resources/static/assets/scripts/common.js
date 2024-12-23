
window.addEventListener("scroll", (e) => {
    const $nav = document.getElementById('nav');
    const $notice = $nav.querySelector(':scope > .header-wrapper > div > .notice');
    let scrollY = this.scrollY;
    if(scrollY < 100){
        $nav.style.position = 'relative';
        $notice.style.display = 'block';
        $nav.querySelector(':scope > .header-wrapper').classList.remove('fixed');
        $nav.querySelector(':scope > .header-wrapper > ul').classList.remove('fixed');
        $nav.querySelector(':scope > .header-wrapper > .icon-container').classList.remove('fixed');
        $nav.querySelector(':scope > .header-wrapper > .fixed-search').style.display = 'none';
    } else {
        $nav.style.position = 'fixed';
        $notice.style.display = 'none';
        $nav.querySelector(':scope > .header-wrapper').classList.add('fixed');
        $nav.querySelector(':scope > .header-wrapper > ul').classList.add('fixed');
        $nav.querySelector(':scope > .header-wrapper > .icon-container').classList.add('fixed');
        $nav.querySelector(':scope > .header-wrapper > .fixed-search').style.display = 'flex';
    }
});


HTMLElement.prototype.hide = function () {
    this.classList.remove('-visible');
    return this;
}

HTMLElement.prototype.show = function () {
    this.classList.add('-visible');
    return this;
}

class Dialog {
    /** @type {HTMLElement} */
    static $cover;
    /** @type {Array<HTMLElement>} */
    static $dialogArray= [];

    /**
     * @param {string} content
     * @param {function(HTMLElement)|undefined} onclick
     * */
    static defaultOk(content, onclick = undefined){
        Dialog.show({
            content: content,
            buttons: [{
                text: '확인', onclick: ($dialog) => {
                    Dialog.hide($dialog);
                    if(typeof onclick === 'function'){
                        onclick($dialog);
                    }
                }
            }]
        });
    }


    /**
     * @param {HTMLElement} $dialog
     */
    static hide($dialog) {
        Dialog.$dialogArray.splice(Dialog.$dialogArray.indexOf($dialog), 1);
        if(Dialog.$dialogArray.length === 0){
            Dialog.$cover.hide();
        }
        $dialog.hide();
        setTimeout(() => $dialog.remove(), 1000);
    }

    /**
     * @param {Object} args
     * @param {string} args.content
     * @param {Array<{text: string, onclick: function}>|undefined} args.buttons
     * @param {number} delay
     * @returns {HTMLElement}
     */
    static show(args, delay = 50) {
        const $dialog = document.createElement('div');
        $dialog.classList.add('---dialog');
        const  $content = document.createElement('div');
        $content.classList.add('_content');
        $content.innerHTML = args.content;
        $dialog.append($content);
        if(args.buttons != null && args.buttons.length > 0){
            const $buttonContainer = document.createElement(('div'));
            $buttonContainer.classList.add('_button-container');
            $buttonContainer.style.gridTemplateColumns = `repeat(${args.buttons.length}, 1fr)`;
            for(const button of args.buttons) {
                const $button = document.createElement('button');
                $button.classList.add('_button');
                $button.setAttribute('type', 'button');
                $button.innerText = button.text;
                if(typeof button.onclick === 'function'){
                    $button.onclick = () => button.onclick($dialog);
                }
                $buttonContainer.append($button);
            }
            $dialog.append($buttonContainer);
        }
        document.body.prepend($dialog);
        Dialog.$dialogArray.push($dialog);
        if(Dialog.$cover == null){
            const $cover = document.createElement('div');
            $cover.classList.add('---dialog-cover');
            document.body.prepend($cover);
            Dialog.$cover = $cover;
        }
        setTimeout(() => {
            $dialog.show();
            Dialog.$cover.show();
        }, delay);
        return $dialog;
    }
}


const $category = document.querySelector('#nav > .header-wrapper > .category');
const $menu = $category.querySelector(':scope > .category-container > .category-menu > .menu');


    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (string, type) => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert('오류');
            return;
        }
        const response = JSON.parse(xhr.responseText);
        $menu.innerHTML = '';
        for (const category of response['categories']) {
            const $item = new DOMParser().parseFromString(`
                    <ul class="menu">
                            <li class="item">
                                <div class="img-cover">
                                
                                    <img src="${category['categoryImg']}" alt="${category['categoryName']}" class="image">
                                    <span class="category-name">${category['categoryName']}</span>
                                    <label>
                                        <input type="hidden" class="categoryId" name="${category['categoryId']}" value="${category['categoryId']}">
                                    </label>
                                </div>
                            </li>
                        </ul>
                    `, 'text/html').querySelector('.item');

            $menu.append($item);
        }

    };
    xhr.open('GET', '/item/categories');
    xhr.send();




const $items = Array.from($menu.querySelectorAll(':scope > .item'));
console.log($items);

const $submenu = $menu.querySelector(':scope > .item > .submenu');

// $item.forEach((x) => x.onmouseup = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState !== XMLHttpRequest.DONE){
//             return;
//         }
//         if (xhr.status < 200 || xhr.status >= 300) {
//             alert('오류');
//             return;
//         }
//         const $categoryId = x.querySelector(':scope > .img-cover > .categoryId');
//         const response = JSON.parse(xhr.responseText);
//         for(const subCategory of response['subCategories']){
//             if($categoryId.value === subCategory['parentId']){
//                 const $subItem = new DOMParser().parseFromString(`
//                 <li class="item">
//                     <ul class="submenu">
//                         <li class="subitem">
//                             <div class="text-box">
//                                 <span class="text">${subCategory['subCategoryName']}</span>
//                             </div>
//                         </li>
//                     </ul>
//                 </li>
//             `, "text/html").querySelector('.subitem');
//                 $submenu.append($subItem);
//             }
//             x.append($submenu);
//         }
//     };
//     xhr.open('GET', '/item/sub-categories');
//     xhr.send();
// });
















