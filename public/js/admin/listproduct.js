var current = "";

async function but(page, total) {
  current = page;
  const res = await $.ajax({
    url: `/product/get?page=${page}&limit=5`,
    type: "GET",
  });
  $(".button").html("");
  $(".button").html(res);
  const pagea = String(page);
  if (page >= total) {
    $(".next").attr("disabled", true);
    $(".next").css({ opacity: "0.5" });
  }
  if (pagea >= total) {
    $(".next").attr("disabled", true);
    $(".next").css({ opacity: "0.5" });
  } else {
    $(".next").attr("disabled", false);
    $(".next").css({ opacity: "2" });
  }
  if (page === 1) {
    $(".back").attr("disabled", true);
    $(".back").css({ opacity: "0.5" });
  }
  if (pagea === "1") {
    $(".back").attr("disabled", true);
    $(".back").css({ opacity: "0.5" });
  } else {
    $(".back").attr("disabled", false);
    $(".back").css({ opacity: "2" });
  }
  $(".Btn").css({ opacity: "0.5" });
  $(`.Btn[value=${page}]`).css({ opacity: "5.0" });
}

var number = 1;
but(number);

function next(total) {
  number++;
  if (number <= total) {
    but(number, total);
  } else {
    but(current + 1, total);
  }
}

function back(total) {
  but(current - 1, total);
}

// const fileUpload = document.querySelector("#listImg");

// fileUpload.addEventListener("change", (e) => {
//   const files = e.target.files;
//   for (let i = 0; i < files.length; i++) {
//     const img = files[i].name;
//     const div = `
//     <img src="/public/upload/${img}" alt="">
//     `;
//     $(".luong").append(div);
//   }
// });

function importimg() {
  document.getElementById("clickimg").click();
}

var fileToRea = document.getElementById("clickimg");

fileToRea.addEventListener(
  "change",
  async function () {
    var files = fileToRea.files;
    if (files.length) {
      // console.log(78, files);
      // var fr = new FileReader();
      // for (var i = 0; i < files.length; i++) {
      //   fr.onload = function () {
      //     let img = `<img src='${fr.result}' >`;
      //     $(".chien").append(img);
      //   };
      //   fr.readAsDataURL(files[i]);
      // }
      const test = await readAsDataURL(files);
      console.log(88, test);
      for (var i = 0; i < test.length; i++) {
        let img = `<img src='${test[i]}' >`;
        $(".luong").append(img);
      }
    }
  },
  false
);

function readAsDataURL(files) {
  // target => <input type="file" id="file">
  var filesArray = Array.prototype.slice.call(files);
  return Promise.all(filesArray.map(fileToDataURL));
}

function fileToDataURL(file) {
  var reader = new FileReader();
  return new Promise(function (resolve, reject) {
    reader.onload = function (event) {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function importa() {
  document.getElementById("listimgid").click();
}

var fileToRead = document.getElementById("listimgid");

fileToRead.addEventListener(
  "change",
  function () {
    var files = fileToRead.files;
    if (files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementsByClassName("changeimg").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  },
  false
);

async function ADD() {
  const listImg = $("#listImg").val();
  const color = $("#color").val();
  const size = $("#size").val();
  const quantity = $("#quantity").val();
  console.log(95);
  if (listImg == "") {
    $(".note1").text("Vùi lòng nhập ảnh sản phẩm");
  }
  if (color == "") {
    $(".note2").text("Vùi lòng nhập màu sắc sản phẩm");
  }
  if (quantity == "") {
    $(".note3").text("Vùi lòng nhập giá sản phẩm");
  } else {
    try {
      const form = $("form")[0];
      const formData = new FormData(form);
      const res = await $.ajax({
        url: "/product/add",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}

var id = "";
async function xoaproduct(a) {
  id = a;
}

async function yes() {
  const res = await $.ajax({
    url: `/product/${id}?page=${current}&limit=5`,
    type: "DELETE",
  });
  $(".no").trigger("click");
  $(".button").html("");
  $(".button").html(res);
}

var idupdate = "";
async function up(idup) {
  const res = await $.ajax({
    url: "/product/get/" + idup,
    type: "GET",
  });
  $("#colorid").val(res.color);
  $("#sizeid").val(res.size);
  $("#quantityid").val(res.quantity);
  idupdate = idup;
}

async function update() {
  try {
    const form = $("#form")[0];
    const formData = new FormData(form);
    const res = await $.ajax({
      url: `/product/${idupdate}?page=${current}&limit=5`,
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
    });
    // console.log(161, res);
    $("#Close").trigger("click");
    $(".button").html("");
    $(".button").html(res);
  } catch (error) {
    console.log(error);
  }
}
