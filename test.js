// // let values = [3,"a","a","a","a","a","a",1,3,5,2,4,4,4];
// // let uniqueValues = [...new Set(values)];
// // console.log(333333333,uniqueValues);




// // <% if(dktimkiem.color){%>
// //     <% listproduct.map(function(value,index){ %>
// //         <% list.map(function(value11,index11){ %>
// //           <% if(value11._id === value.productCode){%>
// //           <div class="khoi0">
// //             <div class="khoi1">
// //               <div class="khoi11">
// //                 <a href="product/detail/<%= value11._id %>">
// //                   <div class="xephang123">
// //                     <div class="">
// //                       <img src="<%= value11.thumbnail %>" alt="" />
// //                     </div>
// //                     <div class="chubinhthuong">tên sản phẩm: <%= value11.name %></div>
// //                   </div>
// //                 </a>
// //               </div>
// //               <div class="khoi12">
// //                 <div class="">sản phẩm có giá là <%= value11.price %></div>
// //               </div>
// //             </div>
// //           </div>
// //           <% }%>
// //           <% }) %>
// //       <% })%>
// //     <% }%>

// // gán cho mỗi cái div 1 cái name bao gồm cả 1 đống tính năng đấy. nếu trong tên mà có tính năng thì để nguyên nếu ko thì html nó đi
// // tạo 1 array . onclick thì push vào trong array ấy. map qua arr ấy nếu có thì giữ lại ko thì html("")



// // <% let arrduochienthi = ['red','blue'] %>
// // lam thu cong qua arr duoc hien thi 
// // 111111111 <%= arrduochienthi1 %> 11111111111111
// // <% arrduochienthi1.map(function(value,index){ %>
// //   <% let arrduochienthitess = ['red','blue',2,3,4,5,6] %>
// //   <% for (let index = 0; index < arrduochienthitess .length; index++) { %>
// //     <% if(value == arrduochienthitess[index] ){%> <%= value %> YESSSSS 
// //       <% }%>
// //       <% }%> <% })%>  %>


// <div class="_9xWFp"><b>Mầu sắc</b></div>
//           <% let arrDieuKien = [] %>
          
//           <div class="chieudoc">
//             <div class="">
              
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   onchange="colorSS('red')"
//                   id="colorRed"
//                 /> 
//                 <% function colorSS(color) { %>
//                   arrDieuKien[arrDieuKien.length] = `${color}`
//                   console.log(82,arrDieuKien);
//                   <% } %>
//                 </span
//               ><span>red</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   onchange="colorSS('<%= url %>','blue')"
//                 /> </span
//               ><span>blue</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   onchange="colorSS('<%= url %>','white')"
//                 /> </span
//               ><span>white</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   onchange="colorSS('<%= url %>','mixcolor')"
//                 /> </span
//               ><span>mixcolor</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   onchange="colorSS('<%= url %>','black')"
//                 /> </span
//               ><span>black</span>
//             </div>
//           </div>
//           <div class="_9xWFp"><b>Size</b></div>
//           <div class="chieudoc">
//             <div class="">
//               <span class=""
//                 ><input type="checkbox" class="" onchange="sizeSS()" /></span
//               ><span>S</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   class=""
//                   onchange="sizeSS('<%= url %>','M')" /></span
//               ><span>M</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   class=""
//                   onchange="sizeSS('<%= url %>','L')" /></span
//               ><span>L</span>
//             </div>
//             <div class="">
//               <span class=""
//                 ><input
//                   type="checkbox"
//                   class=""
//                   onchange="sizeSS('<%= url %>','XL')" /></span
//               ><span>XL</span>
//             </div>
//             </div>


// <% let arrduochienthi = ['ass',1] %>
// <button onclick="themmau(red)"> red</button>
// 111111111 <%= arrduochienthi %> 11111111111111
// <% arrduochienthi.map(function(value,index){ %>
//   <% let arrduochienthitess = ['ass',1,2,3,4,5,6] %>
//   <% for (let index = 0; index < arrduochienthitess .length; index++) { %>
//     <% if(value == arrduochienthitess[index] ){%> <%= value %> YESSSSS 
//       <% }%>
//       <% }%> <% })%>  %>
    
 
   
   



// <% listproduct.map(function(value,index){ %> <% if(value._id ==
// '6263a9040c249fba6d0f1858'){%> <%= value %> có <% }%> <% })%>
