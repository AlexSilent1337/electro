

interface IOrder { orders : number[], id : number, price : number}


interface IOrders {
    [username : string] : IOrder[]
  }


  export {IOrders, IOrder}