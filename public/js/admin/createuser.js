
async function but(page){
  const res = await $.ajax({
    url: `/user/admin/get?page=${page}&limit=5`,
    type: 'GET'
  })
  $('.user').html('')
  $('.user').html(res)
}

var idedit = "";

async function edit(id) {
  $(".modal-body").html("");
  const res = await $.ajax({
    url: "/user/" + id,
    type: "GET",
  });
  div = `
   <table>
    <tr>
      <td><img src="${res.avatar}" alt="" class="imgthumbnail"></td>
      <td>Name: ${res.fullName}</td>
      <td>Role: ${res.role}</td>
      <td>
      <select name="" id="editrole">
      <option value="user">user</option>
      <option value="admin">admin</option>
      </select>
      </td>
    </tr>
   </table>
  `;
  $(".modal-body").append(div);
  idedit = id;
}

async function save() {
  try {
    const role = $("#editrole").val();
    const res = await $.ajax({
      url: "/user/" + idedit,
      type: "PUT",
      data: {
        role: role,
      },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function back(){
  const page = $('#page').val()
  console.log(page);
}
