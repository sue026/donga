gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

console.log('innerWidth:', window.innerWidth);
console.log('devicePixelRatio:', window.devicePixelRatio);






/* 헤더 스크롤*/
window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    header.classList.add('scroll')
  }
  else {
    header.classList.remove('scroll')
  }
})


// menu_popup 열었을 때 브라우저 스크롤x
// 메뉴 열기 버튼
document.querySelector('.header_menu').addEventListener('click', function () {
  // 메뉴 팝업 보이기
  document.querySelector('.header_menu_popup').classList.add('on');
  // 스크롤 막기
  document.body.classList.add('fixed');
});

// 메뉴 닫기 버튼 (닫기 아이콘)
document.querySelector('.header_menu_popup .ri-close-line').addEventListener('click', function () {
  // 메뉴 팝업 숨기기
  document.querySelector('.header_menu_popup').classList.remove('on');
  // 스크롤 풀기
  document.body.classList.remove('fixed');
});





/* 헤더 */
const header = document.querySelector('header');
const menuItems = document.querySelectorAll('header #gnb .dep1 > li');
const dep2Links = document.querySelectorAll('header .dep2 a');

// 메뉴 hover 시 열기
menuItems.forEach((item) => {
  item.addEventListener('mouseenter', function () {
    header.classList.add('on');
    this.classList.add('over');
  });

  item.addEventListener('mouseleave', function () {
    this.classList.remove('over');
  });
});

// dep2 클릭 시 닫기
dep2Links.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('on');
    menuItems.forEach(item => item.classList.remove('over'));
  });
});

// header 전체에서 마우스 빠져나가면 닫기
header.addEventListener('mouseleave', function (e) {
  if (!header.contains(e.relatedTarget)) {
    header.classList.remove('on');
    menuItems.forEach(item => item.classList.remove('over'));
  }
});

/* 헤더 util */
const utilBtn = document.querySelector('.header_util button')
const utilList = document.querySelector('.header_util ul')

// utilBtn.addEventListener('click', function() {})
utilBtn.addEventListener('click', function () {
  if (utilList.style.display === 'none') {
    utilList.style.display = 'block'
  } else {
    utilList.style.display = 'none'
  }
})

/* 헤더 검색 */
const searchBtn = document.querySelector('.search_wrap')
const searchBox = document.querySelector('.search_box')

// *********** 마우스 가져다대면 열림.
// 처음엔 검색 박스를 숨겨둠
searchBox.style.display = 'none';

// 마우스를 올리면 검색 박스를 보여줌
searchBtn.addEventListener('mouseenter', () => {
  searchBox.style.display = 'block';
});

// 마우스가 벗어나면 다시 숨김
searchBtn.addEventListener('mouseleave', () => {
  searchBox.style.display = 'none';
});


// 메뉴 관련 요소 선택
const menuBtn = document.querySelector('.header_menu'); // 햄버거 아이콘
const menuBox = document.querySelector('.header_menu_popup'); // 사이트맵 팝업
const menuClose = document.querySelector('.header_menu_popup .ri-close-line'); // 닫기 아이콘

// 처음엔 팝업 숨김
menuBox.style.display = 'none';

// 햄버거 버튼 클릭 시 사이트맵 열기
menuBtn.addEventListener('click', () => {
  menuBox.style.display = 'block';
});

// 닫기 아이콘 클릭 시 사이트맵 닫기
menuClose.addEventListener('click', () => {
  menuBox.style.display = 'none';
});

// 브라우저 크기 변경 시 자동 닫기 (781px 이상일 때)
window.addEventListener('resize', () => {
  if (window.innerWidth > 1281) {
    menuBox.style.display = 'none';
  }
});


/* 메뉴 팝업 - 모바일 */
// (1) 플러스 아이콘(i)과 dep2 메뉴 리스트 가져오기
// 메뉴 아이콘과 dep2 리스트 가져오기
const menuIcons = document.querySelectorAll('.header_menu_popup .dep1 > li > a > i');
const dep2Menus = document.querySelectorAll('.header_menu_popup .dep2');

menuIcons.forEach(function (item, i) {
  item.addEventListener('click', function (event) {
    event.preventDefault(); // a 태그의 기본 동작 방지

    const isActive = dep2Menus[i].classList.contains('active');

    // 모든 dep2 닫기
    dep2Menus.forEach(dep2 => dep2.classList.remove('active'));

    // 클릭한 항목이 기존에 닫혀있던 경우만 열기
    if (!isActive) {
      dep2Menus[i].classList.add('active');
    }
  });
});


/* 예시 */
// const esgImg = document.querySelectorAll('.esg_img img')
// const esgCon = document.querySelectorAll('.esg_content div')

// esgCon.forEach(function(item, i){
//         item.addEventListener('mouseover',function(){

//             esgImg.forEach(function(img) {
//                 img.classList.remove('active')
//             })
//             esgImg[i].classList.add('active')
//         })
//     })



// menuPlus.addEventListener('click', () => {
//   menuDep2.style.display = 'block';
// });
// menuPlus.addEventListener('click', function() {
//   if(menuDep2.style.display === 'none') {
//     menuDep2.style.display = 'block'
//   } else {
//     menuDep2.style.display = 'none'
//   }
// })



/* 메인 비주얼 */
const mainSwiper = new Swiper('.main-swiper', {
  loop: true,
  autoplay: {
    delay: 9999999, // 동영상 길이로 제어할 것이므로 의미 없는 값
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  on: {
    slideChangeTransitionStart() {
      if (!isPaused) {
        const currentVideo = document.querySelectorAll('.swiper-slide video')[mainSwiper.realIndex];
        resetProgressBar(currentVideo.duration);
      }
    }
  }
});

const progressBar = document.querySelector('.progress .bar');
const playBtn = document.querySelector('.btn-play-stop i');
let isPaused = false;
let progressTimeout = null;

// 프로그레스바 초기화 함수
function resetProgressBar(duration) {
  clearTimeout(progressTimeout);
  progressBar.style.animation = 'none';
  progressBar.offsetHeight; // 리플로우 강제 발생
  progressBar.style.animation = `slideBar ${duration}s linear forwards`;

  // 해당 영상 끝나면 다음 슬라이드로 전환
  progressTimeout = setTimeout(() => {
    mainSwiper.slideNext();
  }, duration * 1000);
}


// 구조가 너무 복잡해진 것 같아요,,이방법밖에 없나용
// 영상 프로그래스바가 작동 잘하는 것 같다가도 영상길이에 맞게 작동안해요 
// play pause버튼 작동 x



/* ESG */
const esgSwiper = new Swiper('.preview_swiper', {
  autoplay: {
    delay: 5000,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


/* Business2 */
/*
const businesSwiper2 = new Swiper('.business2_swiper', {
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  effect: 'fade',
  // fadeEffect: {
  //   crossFade: true, // 이미지 부드럽게 페이드 처리
  // },
  loop: true,
  clickable: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      return `
        <div class="custom_pagination_wrap">
          <span class="num">0${current}</span>
          <div class="progress">
            <div class="bar"></div>
          </div>
          <span class="num">0${total}</span>
        </div>
      `;
    },
  },

  // ✅ 텍스트와 이미지에 동시에 fade 적용
  on: {
    slideChangeTransitionStart: function () {
      const slides = document.querySelectorAll('.business2_swiper .swiper-slide');

      // 모든 슬라이드의 텍스트/이미지 숨기기
      slides.forEach(slide => {
        const textBox = slide.querySelector('.txt_box');
        const imgBox = slide.querySelector('.img_box');

        if (textBox) textBox.style.opacity = '0';
        if (imgBox) imgBox.style.opacity = '0';
      });

      // 현재 슬라이드 텍스트/이미지만 보이게
      const activeSlide = document.querySelector('.business2_swiper .swiper-slide-active');
      if (activeSlide) {
        const activeTextBox = activeSlide.querySelector('.txt_box');
        const activeImgBox = activeSlide.querySelector('.img_box');

        setTimeout(() => {
          if (activeTextBox) activeTextBox.style.opacity = '1';
          if (activeImgBox) activeImgBox.style.opacity = '1';
        }, 100);
      }
    }
  }
});

*/
const currentEl = document.querySelector('.custom_pagination_wrap .current');
const totalEl = document.querySelector('.custom_pagination_wrap .total');
const barEl = document.querySelector('.custom_pagination_wrap .bar');
const businesSwiper2 = new Swiper('.business2_swiper', {
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  autoplay: {
    delay: 3000,
  },
  on: {
    init: function () {
      const totalSlides = document.querySelectorAll('.business2_swiper .swiper-slide:not(.swiper-slide-duplicate)').length;
      totalEl.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
      currentEl.textContent = `01`;

      setTimeout(() => {
        barEl.classList.add('animate');
      }, 50);

      const activeSlide = document.querySelector('.swiper-slide-active .txt_box');
      if (activeSlide) activeSlide.style.opacity = '1';
    },
    slideChange: function () {
      const current = this.realIndex + 1;
      currentEl.textContent = current < 10 ? `0${current}` : current;

      barEl.classList.remove('animate');
      void barEl.offsetWidth;
      barEl.classList.add('animate');
    },
    slideChangeTransitionStart: function () {
      const slides = document.querySelectorAll('.business2_swiper .swiper-slide');
      slides.forEach(slide => {
        const textBox = slide.querySelector('.txt_box');
        if (textBox) textBox.style.opacity = '0';
      });

      const activeSlide = document.querySelector('.business2_swiper .swiper-slide-active');
      if (activeSlide) {
        const activeTextBox = activeSlide.querySelector('.txt_box');
        setTimeout(() => {
          if (activeTextBox) activeTextBox.style.opacity = '1';
        }, 100);
      }
    }
  }
});

/* News */
const newsSwiper = new Swiper('.news_img_swiper', {
  autoplay: true,
  slidesPerView: 5,
  spaceBetween: 40,
  centeredSlides: true,
  loopedSlides: 2,
  loop: true,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
})
const newsSwiper2 = new Swiper('.news_text_swiper', {
  autoplay: true,
  loop: true,
  slidesPerView: 5,
  spaceBetween: 40,
  centeredSlides: true,
  loopedSlides: 2,
  // navigation: {
  //   nextEl: '.swiper-next',
  //   prevEl: '.swiper-prev',
  // },
  effect: 'fade',
  // watchSlidesProgress: true,
  // freeMode: true,
})




/* product_swiper */
const productSwiper = new Swiper('.product_swiper', {
  autoplay: true,
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
})



// business → business2 스크롤 애니메이션
gsap.registerPlugin(ScrollTrigger);

// 📌 1. business 섹션: 비디오 확대 + 텍스트 등장
gsap.timeline({
  scrollTrigger: {
    trigger: '.business',
    start: 'top top',
    end: '+=1200',
    pin: true,
    scrub: 1.5,
  }
})
  .to('.business video', {
    scale: 3.3,
    borderRadius: '0%',
    duration: 1
  })
  .to('.business_text', {
    autoAlpha: 1,
    y: 0,
    duration: 2
  });

// 📌 2. business2가 등장할 때 텍스트 & 비디오 사라짐
gsap.to('.business_text', {
  scrollTrigger: {
    trigger: '.business2',
    start: 'top 90%',
    end: 'top center',
    scrub: 1.5,
  },
  autoAlpha: 0,
  duration: 1.5,
});

gsap.to('.business video', {
  scrollTrigger: {
    trigger: '.business2',
    start: 'top 90%',
    end: 'top center',
    scrub: 1.5,
  },
  opacity: 0,
  duration: 1.5,
});

// 📌 3. business2 슬라이드 전체 등장 (부드럽게 페이드 인)
gsap.from('.business2_swiper', {
  scrollTrigger: {
    trigger: '.business2',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
  autoAlpha: 0,
  y: 50,
  duration: 1.2,
  ease: 'power2.out'
});
