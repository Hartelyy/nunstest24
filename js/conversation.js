import { scripts, scripts2, scripts3, scripts4, scripts5, scripts6, scripts8,
  scripts9, scripts10, scripts11, scripts12, scripts13, scripts14, scripts15, scripts16} from './con_data.js'

// 질문 화면의 각 요소를 찾아요!
const scriptEl = document.querySelector('.script');
const choice1El = document.querySelector('.choice1')
const choice2El = document.querySelector('.choice2')
const imgEl = document.querySelector('.question-box');
const overlay = document.querySelector('.overlay');
const button = document.getElementById('darken');

let currentNumber = 0; // 현재 질문 번호
let currentScriptSetIndex = 0; // 현재 스크립트 세트 인덱스

const scriptSets = [scripts, scripts2, scripts3, scripts4, scripts5, scripts6, scripts8,
  scripts9, scripts10, scripts11, scripts12, scripts13, scripts14, scripts15, scripts16]; // 모든 스크립트 세트를 배열로

// 화면에 질문을 랜더링하는 함수에요!
function renderQuestion() {
  const currentScriptSet = scriptSets[currentScriptSetIndex];
  const script = currentScriptSet[currentNumber]
  scriptEl.innerHTML = script.script
  imgEl.style.backgroundImage = `url(${script.img})`; //img 경로 설정

  gtag('event', 'transition', {
    'event_category': 'Button',
    'event_label': 'Buy Now Button',
    'value': `${currentScriptSetIndex} / ${currentNumber}`
  });

  if (script.choices) {
    choice1El.style.visibility = 'visible';
    choice2El.style.visibility = 'visible';
    choice1El.innerHTML = script.choices[0].text;
    choice2El.innerHTML = script.choices[1].text;
  } else {
    choice1El.style.visibility = 'hidden';
    choice2El.style.visibility = 'hidden';
  }
}

let waitingTransition = false;

// 다음 질문으로 넘어가는 함수
function nextQuestion() {
  const currentScriptSet = scriptSets[currentScriptSetIndex];

  if (waitingTransition) return;

  if (currentNumber === currentScriptSet.length - 1) {

    // 스크립트 세트가 끝나면 다음 스크립트 세트로 넘어감
    if (currentScriptSetIndex < scriptSets.length - 1) {
      waitingTransition = true;
      screenblack(true);
      setTimeout(() => {
        currentScriptSetIndex++;
        currentNumber = 0;
        screenblack(false);
        renderQuestion();

        setTimeout(() => {
          waitingTransition = false;
        }, 1000)
      }, 1000);
    } else {
      // 모든 스크립트 세트가 끝나면 검은 화면
      showResultPage();
    }
  } else {
    currentNumber++;
    renderQuestion();
  }
}

function handleChoice(choiceIndex) {
  const currentScriptSet = scriptSets[currentScriptSetIndex];
  const script = currentScriptSet[currentNumber];

  if (script.choices) {
    scriptEl.innerHTML = script.choices[choiceIndex].value;
    choice1El.style.visibility = 'hidden';
    choice2El.style.visibility = 'hidden';
  } else {
    nextQuestion();
  }
}

// 클릭했을 때 동작하는 코드.
scriptEl.addEventListener('click', function () {
  nextQuestion();
})

// '답변1' 혹은 '답변2'를 클릭했을 때 동작하는 코드에요!
choice1El.addEventListener('click', function () {
  handleChoice(0);
})

choice2El.addEventListener('click', function () {
  handleChoice(1);
})

renderQuestion();

function screenblack(fadeToBlack) {
  // 검은 화면 만들기
  if (fadeToBlack) {
    overlay.style.opacity = '0.98';
  } else {
    // 다시 복구
    overlay.style.opacity = '0';
  }
}

// 결과 페이지로 이동!
function showResultPage() {
  location.href = '/result.html';
}
