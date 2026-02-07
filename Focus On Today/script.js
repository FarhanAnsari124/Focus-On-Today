const checkBoxList=document.querySelectorAll('.custom-checkbox')
const errorLabel=document.querySelector('.error-label');
const inputs=document.querySelectorAll('.goal-input');
const progressBar=document.querySelector('.progress-bar');
const progressValue=document.querySelector('.progress-value');
const progressLabel=document.querySelector('.progress-label');
const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D🎉',
    '“Keep Going, You’re making great progress!”',
    '"Move one step ahead, today!"'
]
const allGoal=JSON.parse(localStorage.getItem('allGoal')) || {
    first:{
        name:'',
        completed:false,
    },
    second:{
        name:'',
        completed:false,
    },
    third:{
        name:'',
        completed:false,
    },
};
let widthValue=Object.values(allGoal).filter((goal)=> goal.completed).length
progressValue.style.width=`${widthValue / 3 *100}%`;
progressValue.querySelector('span').innerHTML=`${widthValue}/3 Completed`;
progressLabel.innerHTML = allQuotes[widthValue];
if(widthValue>=1)
{
    document.querySelector('.quote').innerHTML = allQuotes[4];
}else{
    document.querySelector('.quote').innerHTML = allQuotes[5];
}

checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',()=>{
        const allFieldFilled=[...inputs].every((e)=>{
            return e.value;
        })
        if(allFieldFilled){
            checkbox.parentElement.classList.toggle('completed');
            const inputId= checkbox.nextElementSibling.id;
            allGoal[inputId].completed = !allGoal[inputId].completed;
            widthValue=Object.values(allGoal).filter((goal)=> goal.completed).length
            localStorage.setItem('allGoal',JSON.stringify(allGoal))

            progressValue.style.width=`${widthValue / 3 *100}%`;
            progressValue.querySelector('span').innerHTML=`${widthValue}/3 Completed`;
            progressLabel.innerHTML = allQuotes[widthValue];
            if(widthValue>=1){
                document.querySelector('.quote').innerHTML = allQuotes[4];
            }else{
                document.querySelector('.quote').innerHTML = allQuotes[5];
            }
        }else{
            progressBar.classList.add('show-error');
        }
    })
})
inputs.forEach((input)=>{
    input.value = allGoal[input.id].name;

    if (allGoal[input.id].completed) {
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error');
    })
    input.addEventListener('input',(e)=>{
        if (allGoal[input.id]?.completed) {
            input.value=allGoal[input.id].name
            return
        }
        allGoal[e.target.id].name=input.value;
        localStorage.setItem('allGoal',JSON.stringify(allGoal))
    })
})

