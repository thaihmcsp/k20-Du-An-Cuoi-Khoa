var idupdate = "";

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

function importimg() {
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

async function addCategory() {
  try {
    const form = $("form")[0];
    const formData = new FormData(form);
    const res = await $.ajax({
      url: "/category/add",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
    });
    alert(`Đã thêm ${name}`);
    window.location.reload();
  } catch (error) {
    alert(`Thư mục đã có ${name}`);
  }
}

async function deletethumbanail(id) {
  // console.log(id);
  try {
    const res = await $.ajax({
      url: "/category/" + id,
      type: "DELETE",
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function update(id) {
  try {
    const res = await $.ajax({
      url: "/category/" + id,
      type: "GET",
    });
    console.log(res.name, res.thumbnail);
    $(`#nameid`).val(res.name);
    $("#changeimg").attr("src", "/" + res.thumbnail);
    idupdate = id;
  } catch (error) {
    console.log(error);
  }
}

async function Up() {
  try {
    const name = $("#nameid").val();
    const thumbnail = $("#clickimg").val();
      const form = $("#form")[0];
      const formData = new FormData(form);
      const res = await $.ajax({
        url: "/category/" + idupdate,
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
      });
      window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
