const buttonArr = document.querySelectorAll('.button-container > div');
const bigDisplay = document.querySelector('.big.display');
const smallDisplay = document.querySelector('.small.display');
const equalButton = document.querySelector('.equal');
const acButton = document.querySelector('.ac');
//executed once when loadin script
function clickButtonsForStyle(e) {
    e.target.style.boxShadow = 'none';
    e.target.style.top = '5px';
    // e.target.style.back = 'none';
    setTimeout(()=>{
        e.target.style.boxShadow = '1px 1px 3px 1px #000';
        e.target.style.top = 'unset';
    }, 100);
}
for(let i = 0; i < buttonArr.length; i++) {
    buttonArr[i].addEventListener('click', clickButtonsForStyle);
}
//executed once when loadin script
let result = '0';
bigDisplay.value = result;
// buttonArr.forEach((item)=> {
//     console.log(item);
// })

//executed once when loadin script
function preventDuplicate(letter) {
    const operator = ['/', 'x', '-', '+', '.'];
    var flag = operator.find((item)=> {
        if(item == letter) {
            return true;
        } else {
            return false; 
        }
    });
    if(flag) {
        return true;
    } else {
        return false;
    }
    
}

function clickButtonsForInputText(e) {
    if(result == 0) {
        result = '';
    }
    result+=e.target.innerText;
    if(result[result.length - 1] == result[result.length - 2]){
        if (preventDuplicate(result[result.length - 1])) {
            result = result.substring(0, result.length - 1);
        } 
    }
    
    // console.log();
    bigDisplay.value = result;
    bigDisplay.selectionStart = bigDisplay.value.length; // ta muốn selection bắt đầu từ value.length tức còn quá cả index cuối nên chẳng select đc gì tuy nhiên lại move được sursor của ta về cuối serving the purpose here.
    bigDisplay.focus()// PHẢI CÓ focus() thì mới set được vị trí của selection (phần nào đó là cả cursor)
    smallDisplay.value = '';
    
}

for(let i = 0; i < buttonArr.length; i++) {
    if(buttonArr[i].id != 'equals' && buttonArr[i].id != 'clear')  buttonArr[i].addEventListener('click', clickButtonsForInputText);
}
//executed once when loadin script
function equalFuntion(e) {
    smallDisplay.value = result + '=';
    result = result + ''; // lưu ý biến number thành lại string để trọt replaceAll method ko bị lỗi.
    result = result.replaceAll('x', '*');
    try {
        result = eval(result);// trả lại 1 number nên phải có dòng 'lứu ý' trên để biến lại number thành string
    }
    catch (error) {
        if(error.name == 'SyntaxError') {
            // console.log(error.name); hoặc console.error(error.name)
            result = '';
            bigDisplay.value = 'SyntaxError';
            return;// terminate the equalFunction call at once
        }

    }
    if(result == 'Infinity') {
        bigDisplay.value = result;
        result = '';
        return;
    }


    bigDisplay.value = result;
    bigDisplay.selectionStart = bigDisplay.value.length;
    bigDisplay.focus();
    smallDisplay.selectionStart = smallDisplay.value.length;
    smallDisplay.focus();
}
equalButton.addEventListener('click', equalFuntion);

//executed once when loadin script
function acButtonFuntion(e) {
    result = '0';
    bigDisplay.value = result;
    smallDisplay.value = '';
}
acButton.addEventListener('click', acButtonFuntion);
console.log(result)