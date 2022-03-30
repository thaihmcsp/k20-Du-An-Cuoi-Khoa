function importData() {
  document.getElementById("clickavatar").click();
}

var fileToRead = document.getElementById("clickavatar");

fileToRead.addEventListener(
  "change",
  function () {
    var files = fileToRead.files;
    if (files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById("change").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  },
  false
);

function impor() {
  document.getElementById("clickimg").click();
}

var fileToRea = document.getElementById("clickimg");

fileToRea.addEventListener(
  "change",
  function () {
    var files = fileToRea.files;
    if (files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        document.getElementById("changeimg").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  },
  false
);

async function add() {
  try {
    const form = $("form")[0];
    const formData = new FormData(form);
    const res = await $.ajax({
      url: "/codeProduct/add",
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

async function xoa(id) {
  try {
    const res = await $.ajax({
      url: "/codeProduct/" + id,
      type: "DELETE",
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

var idupdate = "";

async function update(id) {
  idupdate = id;
  const res = await $.ajax({
    url: "/codeProduct/" + id,
    type: 'GET'
  })
  console.log(res);
  $(".code").val(res.code)
  $(".name").val(res.name)
  $("#changeimg").attr('src', "/" + res.thumbnail)
  $(".price").val(res.price)
}

async function Save() {
  const code = $(".code").val();
  const name = $(".name").val();
  const thumbnail = $("#clickimg").val();
  const category = $(".category").val();
  const price = $(".price").val();
  const form = $('#form')[0]
const formData = new FormData(form);
  if (
    code == "" ||
    name == "" ||
    thumbnail == "" ||
    category == "" ||
    price == ""
  ) {
    alert("vui lòng điền đầy đủ thông tin");
  } else {
    const res = await $.ajax({
      url: "/codeProduct/" + idupdate,
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
    });
    console.log(res);
    window.location.reload();
  }
}
