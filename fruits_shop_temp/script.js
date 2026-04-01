// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/

function filterAndSortFruits() {
  //화면에 다시 출력
  let data = [];
  for (let i = 0; i < fruits.length; i++) {
    let id = fruits[i].id;
    let name = fruits[i].name;
    let price = fruits[i].price;
    let img = fruits[i].img;
    data[i] = { id, name, price, img };
  }

  //겁색
  data = fruits.filter((item) => {
    return item.name.toLowerCase().includes(searchBox.value.toLowerCase());
  });

  //정렬
  if (sortSelect.value === "low") {
    data.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high") {
    data.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "name") {
    data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  renderProducts(data, fruitList); //1. 과일에 대한 정보, 2. 햇과일 index.html의 id
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  // 채소 출력 (3개씩 증가)
  veggiePage += 3;
  //화면에 다시 출력
  let data = [];
  for (let i = 0; i < veggiePage; i++) {
    let id = veggies[i].id;
    let name = veggies[i].name;
    let price = veggies[i].price;
    let img = veggies[i].img;
    data[i] = { id, name, price, img };
  }
  //과일 출력 끝나면 버튼 사라짐
  if (veggiePage >= veggies.length) {
    loadMoreBtn.style.display = "none";
  }

  renderProducts(data, veggieList); //더보기 버튼 누를 때 실행 할 거임
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
