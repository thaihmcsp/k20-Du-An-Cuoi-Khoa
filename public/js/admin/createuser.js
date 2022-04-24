var a = ''
var current 
async function but(page,total){
  current = page
  const res = await $.ajax({
    url: `/user/admin/get?page=${page}&limit=5`,
    type: 'GET'
  })
  $('.user').html('')
  $('.user').html(res)
  const doi = String(page)
  if(page === total){
    $('.next').attr('disabled', true)
  }
  if(doi === total){
    $('.next').attr('disabled', true)
  }
  else{
    $('.next').attr('disabled', false)
    
  }
  if(page === '1'){
    $('.back').attr('disabled', true)
  }
  if(page === 1){
    $('.back').attr('disabled', true)
  }else{
    $('.back').attr('disabled', false)
  }

  $('.Btn').css({opacity: '0.5'})
  $(`.Btn[value=${page}]`).css({opacity: '5.0'})
}

var number = 1;
but(number)

function next(total) {
  number++
  but(number,total)
}

function back(total){
  number--;
  but(number,total)
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
      url: `/user/${idedit}?page=${current}&limit=5`,
      type: "PUT",
      data: {
        role: role,
      },
    });
    $('.Close').trigger('click')
    $('.user').html('')
    $('.user').html(res)
  } catch (error) {
    console.log(error);
  }
}

