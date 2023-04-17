const inputBox = document.querySelector('.inputbox');
const outputBox = document.querySelector('.outputbox');
const submitBtn = document.querySelector('.button');
const stmodal = document.querySelector('.st-modal');
const hintModal = document.getElementById('hint-modal');
const hintTextElement = document.getElementById('hint-text');
const finditemModal = document.getElementById('finditem-modal');
const alreadyModal = document.getElementById('already-modal');
const nameBox = document.querySelector('.itm-namebox');
const infoBox = document.querySelector('.itm-infobox');

const inputSequence = ['시작', '스위치', '사물함', '0423', '큐레이션', 'BACK', '촛불'];
let isCandleLit = false;

let lastOutput = '';

submitBtn.addEventListener('click', showResult);

inputBox.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        showResult();
    }
});

function showHintModal(hintText) {
    hintTextElement.innerText = hintText;
    hintModal.classList.add('active');

    const closeButton = document.getElementById('hint-modal-close');
    closeButton.addEventListener('click', () => {
        hintModal.classList.remove('active');
    });
    hintModal.addEventListener('click', (e) => {
        if (e.target === hintModal) {
            hintModal.classList.remove('active');
        }
    });
}

function showResult() {
    const inputText = inputBox.value;
    const outputText = getInputResult(inputText);
    if (typeof outputText === 'string') {
        if (outputText) {
            lastOutput = outputBox.innerHTML;
            outputBox.innerHTML = outputText;
            addBackButtonListener();
            initPopovers(); // Initialize Bootstrap popovers
        } else {
            if (!hintModal.classList.contains('active') && !alreadyModal.classList.contains('active') && outputText !== false) {
                nokeyModal(stmodal);
            }
        }
    }
    inputBox.value = '';
}


function addBackButtonListener() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            outputBox.innerHTML = lastOutput;
        });
    }
}

function getInputResult(input) {
    const keyword = {

        '시작': '어둠에 눈이 조금 익숙해지고 나서야 내가 도서관에 들어와있다는 걸 알았다. 쉬는시간에 잠깐 잠든 것 뿐인데 내가 왜 여기 있는거지?<br><br>일단 너무 어두워서 전등 스위치를 켜야겠다.<br><br><br>🔔입력 키워드는 지문 안에 숨겨져 있습니다. 다음 장면으로 이동하는 키워드일 수도 있고, 여러분들이 탐색해야 하는 대상일 수도 있습니다.<br><br>힌트를 드리죠. 여기에선 <span class="pp">스위치</span>를 입력해보세요.',

        '스위치': '달칵- 달칵- 전등이 켜지지 않는다. 핸드폰 플래시를 켜려고 주머니에 손을 넣으니 구겨진 초대장이 손에 잡힌다.<br>핸드폰 배터리는 5%밖에 남지 않아 금방이라도 꺼질 것 같다. 눈 앞엔 사물함이 보인다.<br><br><br>🔔입력 키워드는 미스테리를 해결하기 위한 아이템일 수도 있습니다.<br><br>힌트를 드리죠. 여기에선 <span class="pp">초대장</span>을 입력창에 입력해보세요.<br><br>그리고 다음 장면으로 가기 위한 <span class="pp">키워드</span>를 지문에서 찾아보세요.',
        
        '사물함': '사물함은 네자리의 자물쇠로 잠겨있다.<br>자물쇠 몸통엔 MMDD라고 적혀있다.<br><br><br>🔔입력 키워드는 문제의 답을 요구하기도 합니다. 자물쇠 번호를 찾아 입력해보세요.<br><br>힌트는 스토리 흐름이 막히는 친구를 위해 준비했습니다. 최대한 사용하지 않고 풀어보세요.<br><br><div class="btn-group"><button type="button" class="btn btn-secondary popoverBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="주머니 속 초대장을 발견했다면 소지품에 아이템이 등록됩니다. 소지품 창을 열어 아이템 버튼을 클릭하여 실마리를 찾아보세요. m은 month(월) d는 day(일)을 뜻합니다">힌트1</button><button id="backButton" class="btn btn-secondary">이전</button></div>',
        
        '0423': '사물함 안에는 양초와 성냥이 가득 들어있다.<br>배터리가 다 된 핸드폰은 꺼져버렸다.<br><br>불을 붙이니 주변이 밝아졌다. <br>눈 앞에 정기간행물, 북큐레이션, 정수기가 보인다.',
        
        '북큐레이션': '창가 큐레이션 코너에 책이 놓여있다<br><br><br><span class="pp">[세계 책의 날 기념 큐레이션 도서]<br>어린왕자, 꽃들에게 희망을, 멕베스,<br>노인과 바다, 로미오와 줄리엣</span><br>눈 앞엔 메모지가 보인다<br><br><span class="books">소행성에서<br>숨겨진 코드를 찾아와.<br>C K I E N A V O</span><br><div class="btn-group"><button type="button" class="btn btn-secondary popoverBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="이전에 [정기간행물] 코너는 둘러보셨나요?">힌트2  </button><button type="button" class="btn btn-secondary popoverBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="숫자와 알파벳 배열을 매칭하세요. 예를 들어 5는 N입니다. 문제의 답은 소문자와 대문자와 띄어쓰기 구별합니다. 대문자로 적어주세요.">힌트3</button>  <button id="backButton" class="btn btn-secondary">이전</button></div>',

        'BACK': 'BACK...? 뒤집으라는 뜻인가.<br>카드를 뒤집으니 또 다른 문장이 적혀있다.<br><br><span class="books">난 그림자로 끝나고 싶지 않아.<br>난 계속 모습을 드러내고 싶어.<br>"그것"을 내게 가까이 가져와 줘.</span><br><div class="btn-group"><button type="button" class="btn btn-secondary popoverBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="책의 날 큐레이션 도서에서 힌트를 찾아보세요.">힌트4</button><button id="backButton" class="btn btn-secondary">이전</button></div>',

        '촛불': '촛불을 종이에 가까이 대자 따뜻해진 종이에 숨겨진 글씨가 떠오른다.<br><br><span class="books">내 이름을 불러줘.<br>나는 어린왕자가 사랑한 존재.<br>나는 로미오와 줄리엣의 사랑의 상징.<br>세인트 조지의 날에 사람들에게 선물로 전해지는 것.</span>',

        '장미': '장미라고 작게 답을 말하자 갑자기 주변이 환해지며 누군가의 목소리가 들린다.<br><br><span class="roses">나를 불러줘서 고마워.<br>나는 잊혀지고 싶지 않은 이야기야.<br>많은 이야기 속 헌신과 용기와 아름다움과 희망을 통해 자라는 존재야.<br><br>우리는 한 때 무성하게 피어나 세상을 향기로 가득 채웠지만 이제는 점차 사라져가고 있어.<br>이렇게라도 너희들의 기억에 남고 싶었어.<br><br>책을 많이 읽고 이야기꽃을 피울수록<br>우리가 다시 자라날 수 있어.<br><br>기억해 책을 편다는 것은<br>하나의 꽃이 피어나는 것.<br><br>이제 너를 보내줄게.<br>다른 사람들에게 나를 알려줘.</span><button type="button" class="btn btn-secondary popoverBtn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="탈출 성공! 해당 화면을 캡쳐해서 도서부 또는 사서선생님께 보여주세요.">도서관 탈출</button>'
    };

  const hints = {
      '핸드폰': '배터리 충전을 미리 해놓을걸!',
      '양초': '양초가 아주 넉넉하게 들어있다. ',
      '정기간행물': '잡지 표지에 누군가 휘갈겨 쓴 글씨로 “죽은자를 찾아가라”라고 적혀있다.',
      '정수기': '물이 아주 맛있군!',
      '노인과 바다': '물론 바다는 상냥하고 무척이나 아름답지. 하지만 때로는 정말 잔인해지기도 하고 어느 순간 휘몰아치기도 하잖아.',
      '꽃들에게 희망을': '그저 먹고 자라는 것만이삶의 전부는 아닐 거야. 이런 삶과는 다른 무언가가 있을 게 분명해.',
      '최다애': '저를 찾아주시다니 영광이에요!'
  };

  const itemDescriptions = {
    '초대장': '세계 책의 날 행사에 초대합니다.\n\n[세계 책의 날이란?]\n1995년 국제연합총회에서 세계인의 독서증진을 위해 매년 4월 23일로 정함. 책을 사는 사람에게 꽃을 선물하는 스페인 까딸루니아 지방 축제일인 "세인트 조지의 날"과, 1616년 세르반테스와 셰익스피어가 동시에 사망한 날이 이날인 데서 유래...(중략)',
    '어린왕자': '세르반테스 작가의 대표 소설이다.\n커다란 책갈피가 꽂혀있는 페이지엔 이렇게 적혀있다.\n\n그러고서 나는 하나의 행성에 착륙했다. 그것은 소규모 행성 B612였다. 지구에서는 매우 작은 행성이었다. 하지만 나에게는 이 세상에서 가장 아름답고 가장 소중한 것들 중 하나였다. 그것은 아름다운 장미를 품고 있었다.',
    '로미오와 줄리엣': ' 우리가 장미라 부르는 꽃은 다른 어떤 이름으로 불러도 달콤한 향기가 줄지 않아요.',
    '멕베스': '꺼져라, 꺼져라, 덧없는 촛불이여.\n인생은 한낱 흔들리는 그림자일 뿐.\n가련한 배우, 맡은 시간엔 무대 위에서\n활개치고 안달하지만\n얼마 안 가 영영 기억에서 지워져 버리지 않는가.'
};

    if (input === "촛불") {
        isCandleLit = true;
    }
    // 촛불이 입력되기 전에 장미 키워드를 처리하지 않음
    if (input === "장미" && !isCandleLit) {
        return '';
    }
    
    if (input in keyword) {
        return keyword[input];
        } else if (input in hints) {
            showHintModal(hints[input]);
            return false; // Return false to prevent 'nokeyModal' from showing
        } else {
        if (input in itemDescriptions) {
            const existingButton = nameBox.querySelector(`[data-item-name="${input}"]`);
            if (!existingButton) {
                createItemButton(input, itemDescriptions[input]);
                finditemModal.classList.add('active');
                const closeButton = document.getElementById('finditem-modal-close');
                closeButton.addEventListener('click', () => {
                    finditemModal.classList.remove('active');
                });
            } else {
                showAlreadyModal();
                return ''; // Indicate that the 'already-modal' is being shown
            }
            
        } else {
            return ''; // Indicate that the 'stmodal' should be shown
        }
    }
}




function createItemButton(itemName, itemDescription) {
  const existingButton = nameBox.querySelector(`[data-item-name="${itemName}"]`);

  if (!existingButton) {
      const itemButton = document.createElement('button');
      itemButton.innerText = itemName;
      itemButton.dataset.itemName = itemName; 
      itemButton.addEventListener('click', () => {
        infoBox.innerHTML = itemDescription.replace(/\n/g, '<br>');
        });
      nameBox.appendChild(itemButton);
      return true; // Return true when a new item is added
  } else {
      showAlreadyModal();
      return false; // Return false when the item already exists
  }
}

function initPopovers() {
    const popoverButtons = document.querySelectorAll('.popoverBtn');
    popoverButtons.forEach(button => {
      const popover = new bootstrap.Popover(button);
  
      // 팝오버가 보여질 때 이벤트 처리
      button.addEventListener('shown.bs.popover', () => {
        setTimeout(() => {
          popover.hide();
        }, 4000);
      });
    });
  }
  


function nokeyModal(stmodal) {
  if (!finditemModal.classList.contains('active')) {
      stmodal.classList.add('active');
      setTimeout(function () {
          stmodal.classList.remove('active');
      }, 1200);
  }
}


function showAlreadyModal() {
  alreadyModal.classList.add('active');
  setTimeout(function () {
      alreadyModal.classList.remove('active');
  }, 2000);
}
