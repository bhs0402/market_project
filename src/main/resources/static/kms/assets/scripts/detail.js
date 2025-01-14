document.addEventListener("DOMContentLoaded", function () {
    // '닫기' 버튼 (첫 번째, 두 번째)
    const firstCloseButton = document.querySelectorAll('.goods-close-button')[0];
    const secondCloseButton = document.querySelectorAll('.goods-close-button')[1];

    document.querySelectorAll('.goods-close-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
    });

    // 첫 번째 버튼: 7, 15, 21번째 div 토글
    if (firstCloseButton) {
        firstCloseButton.addEventListener('click', function () {
            const targetDivs = [
                document.querySelectorAll('.goods-guide-change2')[0],
                document.querySelectorAll('.goods-guide-change2')[1],
                document.querySelectorAll('.goods-guide-change2')[2]
            ];

            targetDivs.forEach(div => div.classList.toggle('hidden'));

            if (firstCloseButton.textContent.trim() === "닫기") {
                firstCloseButton.textContent = "자세히보기";
                firstCloseButton.classList.replace('arrow-up', 'arrow-down');
            } else {
                firstCloseButton.textContent = "닫기";
                firstCloseButton.classList.replace('arrow-down', 'arrow-up');
            }
        });
    }

    // 두 번째 버튼: 33, 42번째 div 토글
    if (secondCloseButton) {
        secondCloseButton.addEventListener('click', function () {
            const targetDivs = [
                document.querySelectorAll('.goods-guide-change2')[3],
                document.querySelectorAll('.goods-guide-change2')[4]
            ];

            targetDivs.forEach(div => div.classList.toggle('hidden'));

            if (secondCloseButton.textContent.trim() === "닫기") {
                secondCloseButton.textContent = "자세히보기";
                secondCloseButton.classList.replace('arrow-up', 'arrow-down');
            } else {
                secondCloseButton.textContent = "닫기";
                secondCloseButton.classList.replace('arrow-down', 'arrow-up');
            }
        });
    }

    // 스크롤 이벤트
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.goods-nav-a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        sections.forEach(section => {
            if (section.getAttribute('id') === currentSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });

    // 부드럽게 스크롤 이동
    document.querySelectorAll('.goods-nav-a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            document.querySelectorAll('.goods-nav-a').forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
            targetElement.classList.add('active');
        });
    });

    // 알림 버튼
    const buttons = document.querySelectorAll(".goods-notification-button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const targetElement = button.parentElement.nextElementSibling;

            if (targetElement && targetElement.tagName.toLowerCase() === "p") {
                targetElement.style.display = targetElement.style.display === "block" ? "none" : "block";
            }
        });
    });

    const deleteButtons = document.querySelectorAll('.review-delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const reviewIndex = button.getAttribute('data-index');
            if (!reviewIndex) {
                alert("잘못된 요청입니다.");
                return;
            }

            if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const response = JSON.parse(xhr.responseText);
                            if (response.result === 'success') {
                                alert('리뷰가 삭제되었습니다.');
                                button.closest('.goods-review-member').style.display = 'none';
                            } else {
                                alert('리뷰 삭제에 실패했습니다.');
                            }
                        } else {
                            alert('삭제에 실패했습니다.');
                        }
                    }
                };
                xhr.open('DELETE', `/goods/delete?index=${reviewIndex}`);
                xhr.send();
            }
        });
    });
});

// 모달 처리
function openModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('reviewModal');
    modal.style.display = 'none';
}

// 장바구니 담기 버튼
const $cartButton3 = document.getElementById('cart-button3');
$cartButton3.addEventListener('click', () => {
    const $itemId = document.getElementById('itemId');
    const $count = document.getElementById('quantity');
    const $packaging = document.getElementById('packaging');
    const formData = new FormData();
    formData.append('itemId', $itemId.value);
    formData.append('itemStatus', $packaging.innerHTML);
    formData.append('quantity', $count.innerHTML);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            alert('오류');
            return;
        }
        const response = JSON.parse(xhr.responseText);
        if(response["result"] === 'success'){
            const $result = '상품을 장바구니에 담았습니다.';
            Dialog.show({
                content: $result,
                buttons: [{
                    text: '확인',
                    onclick: ($dialog) => Dialog.hide($dialog)
                }]
            });
        } else {
            const $result = `상품을 장바구니에 담지 못했습니다.<br>잠시 후 다시 시도해 주세요.`;
            Dialog.show({
                content: $result,
                buttons: [{
                    text: '확인',
                    onclick: ($dialog) => Dialog.hide($dialog)
                }]
            });
        }

    };
    xhr.open('POST', '/cart/in');
    xhr.send(formData);
});