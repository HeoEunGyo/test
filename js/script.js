$(document).ready(function () {
  console.log("load!");

  let clicked = false; // 클릭 상태를 추적하는 변수
  let originalText = `“인간의 억압에 맞서 반란을 일으키고
돼지의 주도로 동물만의 농장을 차지해
평등한 사회를 꿈꾸는 이야기”`;
  let changedText = `“점차 시간이 흐르자 
돼지가 권력을 독점하면서
동물과 인간의 차이가 사라졌다."`;

  // 돼지 머리와 몸에 마우스를 올렸을 때 배경 나타냄
  $(".pig-head, .pig-body").on("mouseover", function () {
    if (!clicked) {
      $(".after").css("opacity", 1); // 배경 투명도 100%
    }
  });

  // 돼지 머리와 몸에서 마우스를 뗐을 때 배경 숨김
  $(".pig-head, .pig-body").on("mouseout", function () {
    if (!clicked) {
      $(".after").css("opacity", 0); // 배경 투명도 0%
    }
  });

  // 타자 효과를 주는 함수
  function typeEffect(element, text, speed) {
    let index = 0;
    element.html(""); // 초기화
    const typingInterval = setInterval(function () {
      const currentChar = text.charAt(index);
      if (currentChar === "\n") {
        element.append("<br />"); // 줄바꿈 추가
      } else {
        element.append(currentChar);
      }
      index++;
      if (index === text.length) {
        clearInterval(typingInterval); // 타이핑이 완료되면 멈춤
      }
    }, speed);
  }

  // 타이핑 효과로 텍스트가 사라지게 하는 함수
  function typeOutEffect(element, speed) {
    let text = element.text();
    let index = text.length;
    const typingInterval = setInterval(function () {
      if (index > 0) {
        element.text(text.substring(0, index - 1));
        index--;
      } else {
        clearInterval(typingInterval); // 모든 글자가 사라지면 멈춤
      }
    }, speed);
  }

  // 돼지 머리 또는 몸을 클릭했을 때 상태를 토글
  $(".pig-head, .pig-body").on("click", function () {
    if (!clicked) {
      // 변경된 상태
      $(".pig-head").css({
        transform: "translate(-120px, -258px) rotate(-30deg)", // 이동 및 회전
        transition: "all 3s ease-in-out",
      });

      $(".pig-body").css({
        transform: "translate(0px, -158px) rotate(-90deg)", // 이동 및 회전
        transition: "all 3s ease-in-out",
      });

      $(".leg1").css({
        transform: "translate(100px, -90px)", // 이동
        transition: "all 3s ease-in-out",
      });

      $(".leg2").css({
        transform: "translate(100px, -100px)", // 이동
        transition: "all 3s ease-in-out",
      });

      $(".leg3, .leg4").css({
        opacity: 0, // 다리 숨김
        transition: "all 1s ease-in-out",
      });

      $(".cow1, .cow2, .wagon").css({
        opacity: 1, // 소와 수레 나타남
        transition: "opacity 3s ease-in-out",
      });

      // "그러나 어떤 동물은 더 평등하다" 텍스트 타이핑 효과로 나타내기
      typeEffect(
        $(".after-board-text p"),
        "그러나 어떤 동물은\n더 평등하다",
        200
      );

      $(".after-board-text").css({
        opacity: 1,
        transition: "opacity 1s ease-in-out",
      });

      // 본문 텍스트 변경 및 타자 효과 적용
      typeEffect($(".text p"), changedText, 100);
    } else {
      // 원래 상태로 복원
      $(".pig-head, .pig-body, .leg1, .leg2").css({
        transform: "translate(0, 0) rotate(0deg)", // 원래 위치 및 각도
        transition: "all 3s ease-in-out",
      });

      $(".leg3, .leg4").css({
        opacity: 1, // 다리 다시 나타남
        transition: "all 5s ease-in-out",
      });

      $(".cow1, .cow2, .wagon").css({
        opacity: 0, // 소, 수레 숨김
        transition: "opacity 3s ease-in-out",
      });

      // "그러나 어떤 동물은 더 평등하다" 텍스트 타이핑 효과로 사라지게 하기
      typeOutEffect($(".after-board-text p"), 100);

      $(".after-board-text").css({
        opacity: 0,
        transition: "opacity 1s ease-in-out",
      });

      // 원래 텍스트로 복구 및 타자 효과 적용
      typeEffect($(".text p"), originalText, 100);
    }
    clicked = !clicked; // 클릭 상태를 토글
  });
});
