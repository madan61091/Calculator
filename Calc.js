
let inputValue = "";
const input = document.getElementById('input');


function get_priority(op){
    if(op == "%") return 2;
    if(op == "*" || op == '/') return 1;
    if(op == '+' || op == '-') return 0;
    
}

function get_ans(a,b,op){

    if(op == '+') return +a+ +b;
    if(op == '-') return a-b;
    if(op == '*') return a*b;
    if(op == '%') return a%b;
    return a/b;

}

function keypressHandler(event){
    
    if(event.key >= '0' && event.key <= '9'){
        return true
    }

    alert("Enter only numbers")
    return false;
}



function operation(option){

    if(input.value == ""){
        alert("first enter some number");
        return;
    }

    input.value = input.value + option;
}

document.getElementById('multiply').addEventListener('click',() => {
    operation('*');
})

document.getElementById('divide').addEventListener('click',() => {
    operation('/');
})


document.getElementById('add').addEventListener('click',() => {
    operation('+');
})


document.getElementById('sub').addEventListener('click',() => {
    operation('-');
})

document.getElementById('mod').addEventListener('click',() => {
    operation('%');
})



document.getElementById('calculate').addEventListener('click',() => {

    calculate(input.value);
})


function calculate(s){
    let st = [];
    let op = [];

    let i = 0;
    while(i < s.length){

        if(s[i] == ' '){
            i++;
            continue;
        }

        if(!isNaN(s[i])){
        
            let val = s[i]-'0';
            i++;

            while(i < s.length && !isNaN(s[i])){
                val = val*10 + (s[i]-'0');
                i++;
            }

            st.push(val);
            continue;
        }


        while(op.length  && get_priority(op[op.length-1]) >= get_priority(s[i])){
             console.log(op[op.length-1] , s[i]);
            let a =st[st.length-1];
            st.pop();
            let b = st[st.length-1];
            st.pop();
            let ans = get_ans(b,a,op[op.length-1]);
            op.pop();
            st.push(ans);
        }


        op.push(s[i]);
        i++;

        



    }

    while(op.length){
        let a = st[st.length-1];
        st.pop();
        let b = st[st.length-1];
        st.pop();

        let ans = get_ans(b,a,op[op.length-1]);
        op.pop();
        st.push(ans);
    }

    if(isNaN(st[0])){
        alert("enter valid operations");
        return;
    }

    document.getElementById('result').textContent = "RESULT" + " " + st[0];

}