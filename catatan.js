//  #FLOW:
//  1. USER LOGIN     :     SUCCESS               =>  redirect to SHOW NEWS LIST
//                          FAIL                  =>  back to USER LOGIN
//                          onClick('#register')  =>  redirect USER REGISTER

//  2. USER REGISTER  :     SUCCESS               =>  redirect to USER LOGIN
//                          FAIL                  =>  back to USER REGISTER

//  3. SHOW NEWS LIST :     show news list from API
//                          onClick('#logout')    =>  redirect to USER LOGIN




//  #USER REGISTER method POST
//  http://localhost:3000/register


//  #USER LOGIN method GET
//  http://localhost:3000/login


//  #SHOW NEWS LIST method GET
//  http://localhost:3000/news