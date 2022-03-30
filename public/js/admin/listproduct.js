async function ADD() {
  const listImg = $("#listImg").val();
  const color = $("#color").val();
  const size = $("#size").val();
  const quantity = $("#quantity").val();
  if (listImg == "" || color == "" || size == "" || quantity == "") {
    alert("Vui lòng điền đầy đủ thông tin");
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
    url: "/product/" + id,
    type: "DELETE",
  });
  console.log(res);
  window.location.reload();
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
      url: "/product/" + idupdate,
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
