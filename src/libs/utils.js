export const currencyFormatterUS =(number)=>{
       const currencyFormatter= new Intl.NumberFormat("en-US").format(number);
       return currencyFormatter
   
}