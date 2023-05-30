
let date;
let Recipes="";
function hidNavMenu(){
    $('.navMenu').toggle(1000,function(){
        if($('.navMenu').css("display")!="none"){
            $('.navCollaps').wrapInner('<i class="fa-solid fa-xmark navCollapsIcon"></i>');
            $('.navBarMainList').css("transform","none");
            $('.navMenu').css("display","flex")
                      
        }else{
            $('.navCollaps').wrapInner('<i class="fa-solid fa-bars navCollapsIcon" ></i>');
            $('.navBarMainList').css("transform","translateY(250px)");
        }
    });
}
$('.navCollaps').click(function () { 
    hidNavMenu()
});
/** احضار بيانات من api*/
async function getData(name=""){
       Data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((e)=>
          e.json()
      ).then((e)=>{
        
        if(e.meals!=null){
            $('.mainmeal').empty();
            for (const element of e.meals) {
                $('.mainmeal').css("display","flex").append(` <div  onclick="getMeal(${element.idMeal})"  class="card  items col-lg-2  m-2 col-sm-6 col-md-4 navBarList  position-relative p-0">
                <img src="${element.strMealThumb}" alt="photo" class="w-100">
                <div class=" bg-light bg-opacity-75   fw-lighter  ItemName  ">
                    <h2 class="fw-lighter mt-5" >${element.strMeal}</h2>
                </div>
            </div>`);
            } 

        }
                  
          })
} ;
getData();
async function getMeal(x){
    Data= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`).then((e)=>e.json()).then((e)=>{
    //  console.log(e);
   let tags =e.meals[0].strTags;
   let list =[];
   let tagsInHtml='';
   if(tags!=null){
    list = tags.split(",")
    for (let i = 0; i < list.length; i++) {
           tagsInHtml+=` <li class=" list-unstyled bg-info  rounded-2 text-center m-2 fw-lighter px-1">${list[i]}</li>`        
    }
   }  
     for (let i = 1; i < 20; i++) {
        if(e.meals[0][`strIngredient${i}`]){
            Recipes +=`    
            <li class=" list-unstyled bg-info  rounded-2 text-center m-2 fw-lighter mewlCotant ">  ${e.meals[0][`strMeasure${i}`]} ${e.meals[0][`strIngredient${i}`]}</li>`
       
        }
       
       
    }      
         $('.mainmeal').html(` <div class=" col-md-4 text-center text-white">
         <img src="${e.meals[0].strMealThumb}" alt="photo" class="w-100">
         <h2 class=" text-white fw-lighter">${e.meals[0].strMeal}</h2>
     </div>
     <div class="col-md-6 text-white">
         <h2>Instructions</h2>
         <p> ${e.meals[0].strInstructions}</p>
         <h4>Area: <span class="fs-6"> ${e.meals[0].strArea}</span></h4>
         <h4>Category : <span class="fs-6">${e.meals[0].strCategory}</span></h4>
         <h4>Recipes :</h4>
         <ul class="d-flex flex-wrap ">
         ${Recipes}
        </ul>
         <h4>Tags :</h4>
         <ul class="d-flex flex-wrap ">
            
            ${tagsInHtml} 
         </ul>
                  <button class="btn btn-success"> <a href="${e.meals[0].strSource}" class=" text-decoration-none text-white" target="_blank">source</a> </button>
         <button class="btn btn-danger"> <a href="${e.meals[0].strYoutube}" class=" text-decoration-none text-white" target="_blank">youTube</a> </button>

     </div>`);   
     
   })


};
/**تفعيل البحث  */
function displaySearch(){
    $(".searchDiv").css("display","flex")
    $('.mainmeal').css("display","none")
}
async function getDataByfirstCar(name){
    console.log(name);
    if(name!=''){
        Data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`).then((e)=>
        e.json()
    ).then((e)=>{
      
      if(e.meals!=null){
          $('.mainmeal').empty();
          for (const element of e.meals) {
              $('.mainmeal').css("display","flex").append(` <div  onclick="getMeal(${element.idMeal})"  class="card  items col-lg-2  m-2 col-sm-6 col-md-4 navBarList  position-relative p-0">
              <img src="${element.strMealThumb}" alt="photo" class="w-100">
              <div class=" bg-light bg-opacity-75   fw-lighter  ItemName  ">
                  <h2 class="fw-lighter mt-5" >${element.strMeal}</h2>
              </div>
          </div>`);
          } 
 
      }
                
        })

    }
   } ;
   /**GET catogery api */

async function getCategor(){
       Data= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`).then((e)=>
          e.json()
      ).then((e)=>{
        console.log(e.categories);
        
            $('.mainmeal').empty();
            for (const element of e.categories) {
                $('.mainmeal').css("display","flex").append(` <div  onclick=" getCatMeal('${element.strCategory}')"  class="card  items col-lg-3  m-2 col-sm-6 col-md-4 navBarList  position-relative p-0 ">
                <img src="${element.strCategoryThumb}" alt="photo" class="w-100">
                <div class=" bg-light bg-opacity-75   fw-lighter  ItemName text-center ">
                    <h2 class="fw-lighter mt-5" >${element.strCategory}</h2>
                    <p>${element.strCategoryDescription}</p>
                </div>
            </div>`);
            } 

        
                  
          })
} ;
async function getCatMeal(x){
    Data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`).then((e)=>e.json()).then((e)=>{
     console.log(e);
     if(e.meals!=null){
        $('.mainmeal').empty();
        for (const element of e.meals) {
            $('.mainmeal').css("display","flex").append(` <div  onclick="getMeal(${element.idMeal})"  class="card  items col-lg-2  m-2 col-sm-6 col-md-4 navBarList  position-relative p-0">
            <img src="${element.strMealThumb}" alt="photo" class="w-100">
            <div class=" bg-light bg-opacity-75   fw-lighter  ItemName  ">
                <h2 class="fw-lighter mt-5" >${element.strMeal}</h2>
            </div>
        </div>`);
        } 

    }  
     
   })


};
async function getArea(){
    Data= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list
    `).then((e)=>
       e.json()
   ).then((e)=>{
     console.log(e.meals);
     
         $('.mainmeal').empty();
         for (const element of e.meals) {
             $('.mainmeal').css("display","flex").append(` <div  onclick=" getAreaMeal('${element.strCategory}')"  class="card  items col-lg-3  m-2 col-sm-6 col-md-4 navBarList  position-relative p-0 ">
             <img src="${element.strCategoryThumb}" alt="photo" class="w-100">
             <div class=" bg-light bg-opacity-75   fw-lighter  ItemName text-center ">
                 <h2 class="fw-lighter mt-5" >${element.strArea}</h2>
                 <p>${element.strCategoryDescription}</p>
             </div>
         </div>`);
         } 

     
               
       })
} ;

async function getAreaMeal(x){
    Data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
    `).then((e)=>e.json()).then((e)=>{
     console.log(e.meals);
     if(e.meals!=null){
        $('.mainmeal').empty();
        for (const element of e.meals) {
            $('.mainmeal').css("display","flex").append(` <div  onclick="getMeal(${element.idMeal})"  class="card  items col-lg-2  m-2 col-sm-6 col-md-4 navBarList  position-relative p-0">
            <img src="${element.strMealThumb}" alt="photo" class="w-100">
            <div class=" bg-light bg-opacity-75   fw-lighter  ItemName  ">
                <h2 class="fw-lighter mt-5" >${element.strMeal}</h2>
            </div>
        </div>`);
        } 

    }  
     
   })


};
