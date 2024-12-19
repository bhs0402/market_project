
//region modify 페이지 회원 정보 수정 / 삭제

const $modifyForm = document.getElementById('modify-form');

$modifyForm.onsubmit = (e) => {
    e.preventDefault();

    if($modifyForm['password'].value.length < 10 || $modifyForm['password'].value.length > 16 || $modifyForm['password'].value.length < 10){
        alert('비밀번호 길이 확인');
        return;
    }
    if($modifyForm['password'].value !== $modifyForm['password-check'].value){
        alert('비밀번호 서로 다름');
        return;
    }
    if($modifyForm['name'].value.length < 1 || $modifyForm['name'].value.length > 15){
        alert('이름 잘못됨');
        return;
    }

    const formData = new FormData();
    formData.append('password', $modifyForm['password'].value);
    formData.append('name', $modifyForm['name'].value);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE){
            return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
            Dialog.show({
                content: `요청을 전송하는 도중 오류가 발생하였습니다.<br>잠시 후 다시 시도해 주세요.`,
                buttons: [{
                    text: '확인',
                    onclick: ($dialog) => Dialog.hide($dialog)
                }]
            });
            return;
        }
        const response = JSON.parse(xhr.responseText);
        if(response['result'] === 'success'){
            alert('성공');
        } else {
            alert('실패');
        }
    };
    xhr.open('PATCH', '/mypage/info/modify');
    xhr.send(formData);
};

//endregion