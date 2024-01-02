window.addEventListener('DOMContentLoaded', () => {
  init();
  setEvents();
});

function init() {
  setGallery();
  setMap();

  Kakao.init('760340e7105c321e7ff96d5fdcb5e524');
}

function setGallery() { 
  setGalleryImage().then(() => {
    const mainSwiper = new Swiper('.gallery-main', {
      speed: 1250,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoHeight: true,
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    const thumbSwiper = ('.gallery-thumb', {
      speed: 1250,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,

    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      thumbs: {
        swiper: mainSwiper
      }
    });
  });
}

async function setGalleryImage() {
  await fetch("/batch/fileList.json")
    .then((res) => res.json())
    .then((files) => {
      for (file of files) {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add("swiper-slide");
        
        const img = document.createElement('img');
        img.src = "/img/gallery/" + file.name;
        img.classList.add("img-fluid");

        swiperSlide.appendChild(img);

        document.getElementById("gallery-images").appendChild(swiperSlide);
        document.getElementById("gallery-thumb").appendChild(swiperSlide);
      }
    });
}

function setMap() {
  const placePosition = new naver.maps.LatLng(37.638932, 127.064727);
  const mapOptions = {
    center: placePosition,
    zoom: 14,
    mapDataControl: false,
    scaleControl: false,
  };
  
  const map = new naver.maps.Map('map', mapOptions);
  new naver.maps.Marker({
    position: placePosition,
    map: map
  });
}

function setEvents() {
  // 계좌 번호 복사
  document.getElementById("account-wrapper").addEventListener("click", (e) => {
    const target= e.target;
    if (target.classList.contains("copy-account")) {
      const accountNumber = target.parentNode.getElementsByClassName("account-number")[0].innerText;

      window.navigator.clipboard.writeText(accountNumber);
    } else return;
  });

  // 카카오톡 공유하기
  document.getElementById("share-kakao").addEventListener("click", () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '동주 ♥ 슬기 결혼합니다.',
        description: '2024년 5월 25일 오후 2시 20분\n비엔티 컨벤션 웨딩홀',
        imageUrl: 'https://do02da.github.io/dongjuseulgi/img/main.jpg',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [{
        title: '모바일 청첩장 보기',
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      }],
    });
  });

  // 링크주소 공유하기
  document.getElementById("share-link").addEventListener("click", () => {
    window.navigator.clipboard.writeText(window.location.href);
    alert("주소가 복사되었습니다.");
  });
}

