// for (let i = 0; i < $(".khoibentrai-group-price input").length; i++) {
//   const formPrice = $(".khoibentrai-group-price input").eq(i);
//   formPrice.on("keyup", () => {
//     if (formPrice.val() == "") {
//       console.log(123);
//     } else {
//       console.log(456);
//     }
//   });
// }

let url = window.location.href;

if (url.includes("pricemin")) {
  let pricemin = url.split("pricemin=")[1].split("&")[0];
  $("#giatoithieu").val(pricemin);
} else {
  $("#giatoithieu").val("");
}
if (url.includes("pricemax")) {
  let pricemax = url.split("pricemax=")[1];
  console.log(pricemax);
  $("#giatoida").val(pricemax);
} else {
  $("#giatoida").val("");
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
  window.location.href = `/search?keyword=${name}&page=${page}`;
  console.log(total1);
}
function changepagetruoc(page, name, pricemin, pricemax) {
  if (pricemax) {
    window.location.href = `/search?keyword=${name}&page=${page - 1}`;
  } else {
    console.log(page, name);
    if (page > 1) {
      window.location.href = `/search?keyword=${name}&page=${page - 1}`;
    }
  }
}
function changepagesau(page, name, max) {
  let page2 = page * 1;
  console.log(page, name);
  if (page < max) {
    window.location.href = `/search?keyword=${name}&page=${page2 + 1}`;
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
  window.location.href = url + `&pricemin=${minprice}&pricemax=${maxprice}`;
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
