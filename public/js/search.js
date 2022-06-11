let url = window.location.href;

if (url.includes("pricemin") ) {
  var pricemin = url.split("pricemin=")[1].split("&")[0];
  var pricemax = url.split("pricemax=")[1];
  const html = `
  <div class="khoibenphai-price-item">
    Giá : ${pricemin}-${pricemax}
    <i class="fas fa-times"></i>
  </div>
  `
  $('.khoibenphai-price').append(html)
} 

if (!url.split('sort=')[1].includes('&')) {
  $('.khoibenphai-price').css('display', 'none')
} 

if ($("#giatoithieu").val().length > 0 || $("#giatoida").val().length > 0) {
  $(".khoibentrai-group-price-btn").addClass("event-click");
}


// * Check empty
function checkEmpty() {
  if ($("#giatoithieu").val() === "" && $("#giatoida").val() === "") {
    $(".khoibentrai-group-price-btn").removeClass("event-click");
  } else {
    $(".khoibentrai-group-price-btn").addClass("event-click");
  }
}

$("#giatoithieu").on("keyup", () => {
  checkEmpty();
});
$("#giatoida").on("keyup", () => {
  checkEmpty();
});

// * Pagination
function changepage(page, name) {
  console.log(page, name);
  window.location.href = `/search?keyword=${name}&page=${page}&sort=popularity`;
  console.log(total1);
}
function changepagetruoc(page, name, pricemin, pricemax) {
  if (pricemax) {
    window.location.href = `/search?keyword=${name}&page=${page - 1}&sort=popularity`;
  } else {
    console.log(page, name);
    if (page > 1) {
      window.location.href = `/search?keyword=${name}&page=${page - 1}&sort=popularity`;
    }
  }
}
function changepagesau(page, name, max) {
  let page2 = page * 1;
  console.log(page, name);
  if (page < max) {
    window.location.href = `/search?keyword=${name}&page=${page2 + 1}&sort=popularity`;
  }
}

// function changepagesau(page,name) {
//  console.log(page,name);
//   window.location.href = `/search?keyword=${name}&page=${page}`
// }

// * Search by price
function timtheogia(page, name) {
  let minprice = $("#giatoithieu").val();
  let maxprice = $("#giatoida").val();
  if (url.includes('pricemin')) {
    let newUrl = url.replace(pricemin , minprice ).replace(pricemax , maxprice)
    window.location.href = newUrl
  } else {
    window.location.href = url + `&pricemin=${minprice}&pricemax=${maxprice}`;
  }
}

// for (let i = 0; i < array.length; i++) {
//   const element = array[i];
// }

function sizeSS(url, size) {
  window.location.href = `${url}&size=${size}`;
}
function themMau(color) {
  let arrduochienthi = [];
  arrduochienthi.push(`${color}`);
}
function xoamaudo(color) {
  if (color == $("#color")) {
    this.html("");
  }
}

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }

// * Sort by
let sortBy = url.split('sort=')[1]

function sortByPrice() {
  const sort = $('#sort').val()
  if (url.split('sort=')[1].includes('&')) {
    window.location.href = url.replace(url.split('sort=')[1].split('&')[0] ,sort )
  } else {
    window.location.href = url.replace(sortBy ,sort )
  }
}

if (sortBy.includes('&')) {
  $('#sort').val(sortBy.split('&')[0])
} else {
  $('#sort').val(sortBy)
}

$('.khoibenphai-price-item i').on('click' , () => {
  let newUrl = url.replace(url.split('&pricemin')[1] , '' ) 
  window.location.href = newUrl.split('&pricemin').join('')
})
